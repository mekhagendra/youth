const { exec, spawn } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');

class LaravelWatcher {
    constructor() {
        this.serverProcess = null;
        this.isRestarting = false;
        this.restartTimeout = null;
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
            info: '\x1b[36m',  // Cyan
            success: '\x1b[32m', // Green
            warning: '\x1b[33m', // Yellow
            error: '\x1b[31m',   // Red
            reset: '\x1b[0m'     // Reset
        };
        
        console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
    }

    startServer() {
        return new Promise((resolve, reject) => {
            if (this.serverProcess) {
                this.serverProcess.kill();
                this.serverProcess = null;
            }

            this.log('🚀 Starting Laravel development server...', 'info');
            
            this.serverProcess = spawn('php', ['artisan', 'serve', '--host=127.0.0.1', '--port=8000'], {
                stdio: ['inherit', 'pipe', 'pipe'],
                shell: true
            });

            this.serverProcess.stdout.on('data', (data) => {
                const output = data.toString().trim();
                if (output.includes('Server running')) {
                    this.log('✅ Laravel server started successfully', 'success');
                    resolve();
                }
                if (output && !output.includes('[')) {
                    console.log(`📋 ${output}`);
                }
            });

            this.serverProcess.stderr.on('data', (data) => {
                const error = data.toString().trim();
                if (error && !error.includes('Warning') && !error.includes('Notice')) {
                    this.log(`❌ Server error: ${error}`, 'error');
                }
            });

            this.serverProcess.on('error', (error) => {
                this.log(`❌ Failed to start server: ${error.message}`, 'error');
                reject(error);
            });

            this.serverProcess.on('exit', (code) => {
                if (code !== 0 && code !== null) {
                    this.log(`⚠️ Server exited with code ${code}`, 'warning');
                }
            });

            // Resolve after a short delay if no immediate success message
            setTimeout(() => {
                if (this.serverProcess && !this.serverProcess.killed) {
                    resolve();
                }
            }, 2000);
        });
    }

    async restartServer() {
        if (this.isRestarting) return;
        
        this.isRestarting = true;
        this.log('🔄 Restarting Laravel server...', 'warning');
        
        try {
            await this.startServer();
            this.log('✨ Server restarted successfully', 'success');
        } catch (error) {
            this.log(`❌ Failed to restart server: ${error.message}`, 'error');
        } finally {
            this.isRestarting = false;
        }
    }

    debounceRestart(delay = 1000) {
        if (this.restartTimeout) {
            clearTimeout(this.restartTimeout);
        }
        
        this.restartTimeout = setTimeout(() => {
            this.restartServer();
        }, delay);
    }

    watchFiles() {
        // Watch PHP files that should trigger server restart
        const phpWatcher = chokidar.watch([
            'app/**/*.php',
            'routes/**/*.php',
            'config/**/*.php',
            'bootstrap/**/*.php',
            '.env'
        ], {
            ignored: [
                /node_modules/,
                /vendor/,
                /storage/,
                /\.git/
            ],
            persistent: true,
            ignoreInitial: true
        });

        // Watch frontend files (for logging only, Vite handles HMR)
        const frontendWatcher = chokidar.watch([
            'resources/js/**/*.{ts,tsx,js,jsx}',
            'resources/css/**/*.css',
            'resources/views/**/*.blade.php'
        ], {
            ignored: /node_modules/,
            persistent: true,
            ignoreInitial: true
        });

        phpWatcher.on('ready', () => {
            this.log('👀 Watching PHP files for changes...', 'info');
        });

        phpWatcher.on('change', (filePath) => {
            const relativePath = path.relative(process.cwd(), filePath);
            this.log(`📝 PHP file changed: ${relativePath}`, 'warning');
            this.debounceRestart();
        });

        phpWatcher.on('add', (filePath) => {
            const relativePath = path.relative(process.cwd(), filePath);
            this.log(`➕ New PHP file added: ${relativePath}`, 'info');
            this.debounceRestart();
        });

        phpWatcher.on('unlink', (filePath) => {
            const relativePath = path.relative(process.cwd(), filePath);
            this.log(`🗑️ PHP file deleted: ${relativePath}`, 'info');
            this.debounceRestart();
        });

        frontendWatcher.on('ready', () => {
            this.log('👁️ Watching frontend files for changes...', 'info');
        });

        frontendWatcher.on('change', (filePath) => {
            const relativePath = path.relative(process.cwd(), filePath);
            this.log(`🎨 Frontend file changed: ${relativePath} (handled by Vite)`, 'info');
        });

        return { phpWatcher, frontendWatcher };
    }

    async start() {
        this.log('🌟 Enhanced Laravel Auto-Reload Watcher Starting...', 'success');
        this.log('📁 Project Directory: ' + process.cwd(), 'info');
        
        try {
            await this.startServer();
            const watchers = this.watchFiles();
            
            this.log('🎯 Auto-reload system is ready!', 'success');
            this.log('💡 Tip: Use Ctrl+C to stop the watcher', 'info');
            
            // Graceful shutdown
            process.on('SIGINT', () => {
                this.log('🛑 Shutting down auto-reload watcher...', 'warning');
                
                if (this.serverProcess) {
                    this.serverProcess.kill();
                }
                
                watchers.phpWatcher.close();
                watchers.frontendWatcher.close();
                
                this.log('👋 Auto-reload watcher stopped', 'info');
                process.exit(0);
            });
            
        } catch (error) {
            this.log(`❌ Failed to start auto-reload system: ${error.message}`, 'error');
            process.exit(1);
        }
    }
}

// Start the watcher
const watcher = new LaravelWatcher();
watcher.start();