#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

class DevServer {
    constructor() {
        this.processes = new Map();
        this.isShuttingDown = false;
    }

    log(message, source = 'DEV', type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
            info: '\x1b[36m',     // Cyan
            success: '\x1b[32m',  // Green
            warning: '\x1b[33m',  // Yellow
            error: '\x1b[31m',    // Red
            reset: '\x1b[0m'      // Reset
        };
        
        const sourceColors = {
            LARAVEL: '\x1b[34m',  // Blue
            VITE: '\x1b[32m',     // Green
            WATCH: '\x1b[33m',    // Yellow
            DEV: '\x1b[35m',      // Magenta
            reset: '\x1b[0m'
        };
        
        console.log(`${colors[type]}[${timestamp}] ${sourceColors[source]}[${source}]${sourceColors.reset} ${message}${colors.reset}`);
    }

    spawnProcess(name, command, args = [], options = {}) {
        if (this.processes.has(name)) {
            this.log(`Process ${name} already running`, name, 'warning');
            return;
        }

        this.log(`Starting ${name}...`, name, 'info');
        
        const process = spawn(command, args, {
            stdio: ['inherit', 'pipe', 'pipe'],
            shell: true,
            ...options
        });

        // Handle stdout
        process.stdout.on('data', (data) => {
            const output = data.toString().trim();
            if (output) {
                // Filter out some verbose logs
                if (!output.includes('webpack') && 
                    !output.includes('compiled') && 
                    !output.includes('[vite]') && 
                    output.length < 200) {
                    this.log(output, name, 'info');
                }
            }
        });

        // Handle stderr
        process.stderr.on('data', (data) => {
            const error = data.toString().trim();
            if (error && 
                !error.includes('Warning') && 
                !error.includes('Notice') &&
                !error.includes('Deprecation')) {
                this.log(error, name, 'warning');
            }
        });

        // Handle process events
        process.on('error', (error) => {
            this.log(`Failed to start: ${error.message}`, name, 'error');
        });

        process.on('exit', (code, signal) => {
            this.processes.delete(name);
            if (code !== 0 && code !== null && !this.isShuttingDown) {
                this.log(`Exited with code ${code}`, name, 'warning');
            }
        });

        this.processes.set(name, process);
        return process;
    }

    startLaravel() {
        return this.spawnProcess('LARAVEL', 'node', ['watch-laravel.js']);
    }

    startVite() {
        return this.spawnProcess('VITE', 'npm', ['run', 'dev']);
    }

    async start() {
        this.log('🚀 Starting Enhanced Development Environment', 'DEV', 'success');
        this.log('📁 Project: ' + path.basename(process.cwd()), 'DEV', 'info');
        
        // Start services
        this.startLaravel();
        
        // Wait a bit before starting Vite to avoid port conflicts
        setTimeout(() => {
            this.startVite();
        }, 2000);

        this.log('✨ Development environment is starting up...', 'DEV', 'success');
        this.log('🌐 Laravel will be available at: http://127.0.0.1:8000', 'DEV', 'info');
        this.log('⚡ Vite dev server will be available at: http://localhost:5173', 'DEV', 'info');
        this.log('💡 Press Ctrl+C to stop all services', 'DEV', 'info');

        // Graceful shutdown
        process.on('SIGINT', () => {
            this.shutdown();
        });

        process.on('SIGTERM', () => {
            this.shutdown();
        });
    }

    shutdown() {
        if (this.isShuttingDown) return;
        
        this.isShuttingDown = true;
        this.log('🛑 Shutting down development environment...', 'DEV', 'warning');

        // Kill all child processes
        for (const [name, process] of this.processes) {
            this.log(`Stopping ${name}...`, name, 'warning');
            process.kill('SIGTERM');
        }

        // Force exit after 5 seconds
        setTimeout(() => {
            this.log('🔴 Force shutdown', 'DEV', 'error');
            process.exit(1);
        }, 5000);

        // Normal exit when all processes are done
        const checkProcesses = setInterval(() => {
            if (this.processes.size === 0) {
                clearInterval(checkProcesses);
                this.log('👋 Development environment stopped', 'DEV', 'success');
                process.exit(0);
            }
        }, 100);
    }
}

// Start the development server
const devServer = new DevServer();
devServer.start();