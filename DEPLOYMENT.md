# Deployment Guide - Youth Initiative Application

## Prerequisites

- Linux server (Ubuntu 22.04 LTS or later recommended)
- Root or sudo access
- Domain name pointed to your server's IP address

## Quick Deployment

### Option 1: Automated Deployment Script

1. Upload your application to the server
2. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```
3. Run the deployment script:
   ```bash
   sudo ./deploy.sh
   ```
4. Follow the prompts to configure database and domain

### Option 2: Manual Deployment

#### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

#### 2. Install PHP 8.3
```bash
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php8.3 php8.3-cli php8.3-fpm php8.3-mysql php8.3-xml \
    php8.3-mbstring php8.3-curl php8.3-zip php8.3-gd php8.3-intl \
    php8.3-bcmath php8.3-redis php8.3-tokenizer
```

#### 3. Install Composer
```bash
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
```

#### 4. Install Node.js 20.x
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### 5. Install MySQL
```bash
sudo apt install -y mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

#### 6. Install Nginx
```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 7. Create MySQL Database
```bash
sudo mysql
```

```sql
CREATE DATABASE youth_initiative CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'youth_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON youth_initiative.* TO 'youth_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 8. Set Up Application
```bash
# Create application directory
sudo mkdir -p /var/www/youth-initiative
cd /var/www/youth-initiative

# Clone or copy your application files here

# Copy and configure environment
cp .env.production .env

# Edit .env file with your database credentials
sudo nano .env
```

Update these values in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=youth_initiative
DB_USERNAME=youth_user
DB_PASSWORD=your_secure_password

APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
```

#### 9. Install Dependencies
```bash
# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Install Node dependencies and build assets
npm ci
npm run build

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Seed database with default admin
php artisan db:seed --force

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create storage link
php artisan storage:link
```

#### 10. Set Permissions
```bash
sudo chown -R www-data:www-data /var/www/youth-initiative
sudo chmod -R 755 /var/www/youth-initiative
sudo chmod -R 775 /var/www/youth-initiative/storage
sudo chmod -R 775 /var/www/youth-initiative/bootstrap/cache
```

#### 11. Configure Nginx
Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/youth-initiative
```

Paste this configuration (replace `yourdomain.com` with your actual domain):
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/youth-initiative/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    client_max_body_size 20M;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/youth-initiative /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl restart php8.3-fpm
```

#### 12. Install SSL Certificate
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Post-Deployment

### Set Up Cron Jobs (Optional)
Add Laravel scheduler:
```bash
sudo crontab -e -u www-data
```

Add this line:
```
* * * * * cd /var/www/youth-initiative && php artisan schedule:run >> /dev/null 2>&1
```

### Set Up Queue Worker (Optional)
Create a systemd service:
```bash
sudo nano /etc/systemd/system/youth-queue.service
```

```ini
[Unit]
Description=Youth Initiative Queue Worker
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/youth-initiative
ExecStart=/usr/bin/php /var/www/youth-initiative/artisan queue:work --sleep=3 --tries=3
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable youth-queue
sudo systemctl start youth-queue
```

## Default Admin Credentials

Check `database/seeders/DatabaseSeeder.php` for default admin credentials.

**Important:** Change the default password immediately after first login!

## Maintenance

### Update Application
```bash
cd /var/www/youth-initiative
sudo -u www-data git pull
sudo -u www-data composer install --no-dev --optimize-autoloader
sudo -u www-data npm ci
sudo -u www-data npm run build
sudo -u www-data php artisan migrate --force
sudo -u www-data php artisan config:cache
sudo -u www-data php artisan route:cache
sudo -u www-data php artisan view:cache
sudo systemctl restart php8.3-fpm
```

### View Logs
```bash
# Application logs
tail -f /var/www/youth-initiative/storage/logs/laravel.log

# Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### Database Backup
```bash
mysqldump -u youth_user -p youth_initiative > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Database Restore
```bash
mysql -u youth_user -p youth_initiative < backup_file.sql
```

## Troubleshooting

### Permission Issues
```bash
sudo chown -R www-data:www-data /var/www/youth-initiative
sudo chmod -R 755 /var/www/youth-initiative
sudo chmod -R 775 /var/www/youth-initiative/storage
sudo chmod -R 775 /var/www/youth-initiative/bootstrap/cache
```

### Clear All Caches
```bash
cd /var/www/youth-initiative
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### 500 Internal Server Error
1. Check application logs: `storage/logs/laravel.log`
2. Check Nginx error log: `/var/log/nginx/error.log`
3. Ensure `.env` file exists and is properly configured
4. Verify database connection
5. Check file permissions

### Database Connection Issues
1. Verify MySQL is running: `sudo systemctl status mysql`
2. Test database credentials: `mysql -u youth_user -p`
3. Check `.env` database configuration
4. Verify user has proper privileges

## Security Checklist

- [ ] Change default admin password
- [ ] Set `APP_DEBUG=false` in production
- [ ] Install SSL certificate (HTTPS)
- [ ] Keep system packages updated
- [ ] Use strong database passwords
- [ ] Configure firewall (UFW)
- [ ] Regular database backups
- [ ] Monitor application logs
- [ ] Keep Laravel and dependencies updated

## Support

For issues or questions, refer to the application documentation or contact the development team.
