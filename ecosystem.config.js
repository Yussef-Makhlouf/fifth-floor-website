module.exports = {
  apps: [
    {
      name: 'fifthfloor',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/fifthfloor',
      exec_mode: 'fork',
      interpreter: '/root/.nvm/versions/node/v20.20.2/bin/node',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/fifthfloor-error.log',
      out_file: '/var/log/pm2/fifthfloor-out.log',
      watch: false,
      max_memory_restart: '500M',
    },
  ],
};
