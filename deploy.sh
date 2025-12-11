#!/bin/bash

# Youth Initiative Deployment Script for Linux with MySQL
# Usage: ./deploy.sh

set -e

echo "================================"
echo "Youth Initiative Deployment"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run this script with sudo${NC}"
    exit 1
fi

# Step 1: Update system packages
echo -e "${GREEN}[1/12] Updating system packages...${NC}"
apt update && apt upgrade -y

# Step 2: Install required packages
echo -e "${GREEN}[2/12] Installing required packages...${NC}"
apt install -y software-properties-common curl git unzip

# Step 3: Install PHP 8.3 and required extensions
echo -e "${GREEN}[3/12] Installing PHP 8.3 and extensions...${NC}"
add-apt-repository ppa:ondrej/php -y
apt update
apt install -y php8.3 php8.3-cli php8.3-fpm php8.3-mysql php8.3-xml php8.3-mbstring \
    php8.3-curl php8.3-zip php8.3-gd php8.3-intl php8.3-bcmath php8.3-redis php8.3-tokenizer

# Step 4: Install Composer
echo -e "${GREEN}[4/12] Installing Composer...${NC}"
if ! command -v composer &> /dev/null; then
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
fi

# Step 5: Install Node.js and npm
echo -e "${GREEN}[5/12] Installing Node.js 20.x...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

# Step 6: Install MySQL Server
echo -e "${GREEN}[6/12] Installing MySQL Server...${NC}"
if ! command -v mysql &> /dev/null; then
    apt install -y mysql-server
    systemctl start mysql
    systemctl enable mysql
fi

# Step 7: Install Nginx
echo -e "${GREEN}[7/12] Installing Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
    systemctl start nginx
    systemctl enable nginx
fi

# Step 8: Configure MySQL Database
echo -e "${GREEN}[8/12] Configuring MySQL Database...${NC}"
read -p "Enter MySQL root password (press enter if not set): " MYSQL_ROOT_PASSWORD
read -p "Enter new database name [youth_initiative]: " DB_NAME
DB_NAME=${DB_NAME:-youth_initiative}
read -p "Enter new database username [youth_user]: " DB_USER
DB_USER=${DB_USER:-youth_user}
read -sp "Enter new database password: " DB_PASSWORD
echo ""

if [ -z "$MYSQL_ROOT_PASSWORD" ]; then
    mysql -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';"
    mysql -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';"
    mysql -e "FLUSH PRIVILEGES;"
else
    mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';"
    mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';"
    mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "FLUSH PRIVILEGES;"
fi

echo -e "${GREEN}MySQL database configured successfully!${NC}"

# Step 9: Set up application directory
echo -e "${GREEN}[9/12] Setting up application directory...${NC}"
APP_DIR="/var/www/youth-initiative"
mkdir -p $APP_DIR

# Copy application files (assuming script is run from project root)
echo "Copying application files..."
rsync -av --exclude='node_modules' --exclude='vendor' --exclude='.git' --exclude='storage' --exclude='.env' ./ $APP_DIR/

# Create necessary directories
mkdir -p $APP_DIR/storage/app/public
mkdir -p $APP_DIR/storage/framework/{cache,sessions,testing,views}
mkdir -p $APP_DIR/storage/logs
mkdir -p $APP_DIR/bootstrap/cache

# Step 10: Configure environment
echo -e "${GREEN}[10/12] Configuring environment...${NC}"
if [ -f "$APP_DIR/.env.production" ]; then
    cp $APP_DIR/.env.production $APP_DIR/.env
else
    cp $APP_DIR/.env.example $APP_DIR/.env
fi

# Update .env with database credentials
sed -i "s/DB_DATABASE=.*/DB_DATABASE=${DB_NAME}/" $APP_DIR/.env
sed -i "s/DB_USERNAME=.*/DB_USERNAME=${DB_USER}/" $APP_DIR/.env
sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=${DB_PASSWORD}/" $APP_DIR/.env
sed -i "s/DB_CONNECTION=sqlite/DB_CONNECTION=mysql/" $APP_DIR/.env
sed -i "s/APP_ENV=local/APP_ENV=production/" $APP_DIR/.env
sed -i "s/APP_DEBUG=true/APP_DEBUG=false/" $APP_DIR/.env

# Generate application key
cd $APP_DIR
php artisan key:generate --force

# Step 11: Install dependencies and build assets
echo -e "${GREEN}[11/12] Installing dependencies...${NC}"
composer install --no-dev --optimize-autoloader --no-interaction
npm ci
npm run build

# Run migrations
echo "Running database migrations..."
php artisan migrate --force

# Seed default admin user
php artisan db:seed --class=DatabaseSeeder --force

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create storage link
php artisan storage:link

# Set proper permissions
chown -R www-data:www-data $APP_DIR
chmod -R 755 $APP_DIR
chmod -R 775 $APP_DIR/storage
chmod -R 775 $APP_DIR/bootstrap/cache

# Step 12: Configure Nginx
echo -e "${GREEN}[12/12] Configuring Nginx...${NC}"
read -p "Enter your domain name (e.g., example.com): " DOMAIN_NAME

cat > /etc/nginx/sites-available/youth-initiative << EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN_NAME} www.${DOMAIN_NAME};
    root ${APP_DIR}/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Increase upload size limits
    client_max_body_size 20M;
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/youth-initiative /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# Restart services
systemctl restart php8.3-fpm
systemctl restart nginx

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo -e "Database Name: ${YELLOW}${DB_NAME}${NC}"
echo -e "Database User: ${YELLOW}${DB_USER}${NC}"
echo -e "Application URL: ${YELLOW}http://${DOMAIN_NAME}${NC}"
echo ""
echo -e "${YELLOW}Important:${NC}"
echo -e "1. Update DNS records to point to this server"
echo -e "2. Install SSL certificate with: ${GREEN}certbot --nginx -d ${DOMAIN_NAME} -d www.${DOMAIN_NAME}${NC}"
echo -e "3. Default admin credentials are in DatabaseSeeder.php"
echo -e "4. Review and update .env file at: ${APP_DIR}/.env"
echo ""
