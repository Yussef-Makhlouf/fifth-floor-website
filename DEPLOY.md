# 🚀 Deployment Guide — Fifth Floor Agency Website

**Domain:** https://fifthflooragency.com  
**Server:** Hostinger VPS — `187.124.118.211`  
**Stack:** Next.js 16 · Node.js · PM2 · Nginx · SSL (Let's Encrypt)

---

## 📋 Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Initial Server Setup](#2-initial-server-setup)
3. [Install Node.js & pnpm](#3-install-nodejs--pnpm)
4. [Install & Configure Nginx](#4-install--configure-nginx)
5. [Configure DNS](#5-configure-dns)
6. [Clone & Build the Project](#6-clone--build-the-project)
7. [Environment Variables](#7-environment-variables)
8. [Run with PM2](#8-run-with-pm2)
9. [SSL Certificate (Let's Encrypt)](#9-ssl-certificate-lets-encrypt)
10. [Configure Nginx as Reverse Proxy](#10-configure-nginx-as-reverse-proxy)
11. [Firewall Rules](#11-firewall-rules)
12. [Re-deploy / Update Workflow](#12-re-deploy--update-workflow)
13. [Useful Commands](#13-useful-commands)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. Prerequisites

| Requirement | Version |
|---|---|
| Node.js | ≥ 20 LTS |
| pnpm | ≥ 9 |
| PM2 | latest |
| Nginx | latest stable |
| Certbot | latest |
| Git | latest |

> **Local:** Make sure your code is pushed to a Git repository (GitHub / GitLab) before starting.

---

## 2. Initial Server Setup

### Connect via SSH

```bash
ssh root@187.124.118.211
```

### Update the system

```bash
apt update && apt upgrade -y
apt install -y git curl wget unzip build-essential
```

### Create a non-root deploy user (recommended)

```bash
adduser deploy
usermod -aG sudo deploy

# Copy SSH keys to new user
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

# Switch to deploy user
su - deploy
```

> **Security tip:** From this point on, use the `deploy` user instead of `root`.

---

## 3. Install Node.js & pnpm

### Install Node.js 20 LTS via NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node 20 LTS
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node -v   # v20.x.x
npm -v    # 10.x.x
```

### Install pnpm

```bash
npm install -g pnpm

# Verify
pnpm -v   # 9.x.x
```

### Install PM2

```bash
npm install -g pm2

# Enable PM2 startup on reboot
pm2 startup
# Run the command that PM2 outputs (sudo env PATH=...)
```

---

## 4. Install & Configure Nginx

```bash
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

---

## 5. Configure DNS

In your **Hostinger DNS panel** (or wherever your domain is registered), add:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `187.124.118.211` | 3600 |
| A | `www` | `187.124.118.211` | 3600 |

> DNS propagation can take up to **24–48 hours**, but usually resolves within minutes.

---

## 6. Clone & Build the Project

```bash
# Go to a suitable directory
mkdir -p /var/www
cd /var/www

# Clone your repository (replace with your actual repo URL)
git clone https://github.com/YOUR_USERNAME/creative-agency-website.git fifthfloor
cd fifthfloor

# Install dependencies
pnpm install --frozen-lockfile

# Build the Next.js app
pnpm build
```

---

## 7. Environment Variables

Create the production `.env.local` file on the server:

```bash
nano /var/www/fifthfloor/.env.local
```

Paste your environment variables. Example:

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://fifthflooragency.com

# Resend (Email API)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Add any other env vars your app requires
```

> ⚠️ **Never commit `.env.local` to Git.** It is already listed in `.gitignore`.

After editing, rebuild so Next.js picks up the new values:

```bash
pnpm build
```

---

## 8. Run with PM2

### Create a PM2 ecosystem file

```bash
nano /var/www/fifthfloor/ecosystem.config.js
```

```js
module.exports = {
  apps: [
    {
      name: 'fifthfloor',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/fifthfloor',
      instances: 'max',       // use all CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/fifthfloor-error.log',
      out_file: '/var/log/pm2/fifthfloor-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      watch: false,
      max_memory_restart: '500M',
    },
  ],
};
```

```bash
# Create log directory
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# Start the app
pm2 start /var/www/fifthfloor/ecosystem.config.js

# Save PM2 process list (survives reboots)
pm2 save

# Verify it is running
pm2 status
pm2 logs fifthfloor --lines 50
```

Your app is now running on **port 3000** internally.

---

## 9. SSL Certificate (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate for both www and non-www
sudo certbot --nginx -d fifthflooragency.com -d www.fifthflooragency.com

# Follow the prompts:
#   - Enter your email address
#   - Agree to terms
#   - Choose redirect option (recommended: 2 — redirect HTTP to HTTPS)
```

Certbot will **automatically configure Nginx** with SSL. Renewal is handled via a systemd timer.

```bash
# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 10. Configure Nginx as Reverse Proxy

Create the Nginx site config:

```bash
sudo nano /etc/nginx/sites-available/fifthflooragency.com
```

Paste the following:

```nginx
# Redirect HTTP → HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name fifthflooragency.com www.fifthflooragency.com;
    return 301 https://$host$request_uri;
}

# Redirect www → non-www (canonical)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.fifthflooragency.com;

    ssl_certificate     /etc/letsencrypt/live/fifthflooragency.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fifthflooragency.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://fifthflooragency.com$request_uri;
}

# Main server block
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name fifthflooragency.com;

    ssl_certificate     /etc/letsencrypt/live/fifthflooragency.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fifthflooragency.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    # Proxy to Next.js
    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache Next.js static assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000/_next/static/;
        expires    365d;
        add_header Cache-Control "public, immutable";
    }

    # Logging
    access_log /var/log/nginx/fifthfloor-access.log;
    error_log  /var/log/nginx/fifthfloor-error.log;
}
```

Enable the site and reload Nginx:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/fifthflooragency.com /etc/nginx/sites-enabled/

# Remove default site (optional but recommended)
sudo rm -f /etc/nginx/sites-enabled/default

# Test config syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 11. Firewall Rules

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Verify
sudo ufw status
```

---

## 12. Re-deploy / Update Workflow

Every time you push new code, run the following on the server:

```bash
cd /var/www/fifthfloor

# Pull latest changes
git pull origin main

# Install any new dependencies
pnpm install --frozen-lockfile

# Build production bundle
pnpm build

# Reload app with zero-downtime restart
pm2 reload fifthfloor
```

### One-liner deploy script

```bash
nano /var/www/fifthfloor/deploy.sh
```

```bash
#!/bin/bash
set -e

echo "🔄 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🏗️  Building..."
pnpm build

echo "🔁 Reloading PM2..."
pm2 reload fifthfloor

echo "✅ Deployment complete!"
```

```bash
chmod +x /var/www/fifthfloor/deploy.sh

# Run future deployments with:
bash /var/www/fifthfloor/deploy.sh
```

---

## 13. Useful Commands

| Task | Command |
|------|---------|
| Check app status | `pm2 status` |
| View app logs | `pm2 logs fifthfloor` |
| Restart app | `pm2 restart fifthfloor` |
| Zero-downtime reload | `pm2 reload fifthfloor` |
| Stop app | `pm2 stop fifthfloor` |
| Monitor resources | `pm2 monit` |
| Check Nginx status | `sudo systemctl status nginx` |
| Reload Nginx | `sudo systemctl reload nginx` |
| Test Nginx config | `sudo nginx -t` |
| View Nginx error log | `sudo tail -f /var/log/nginx/fifthfloor-error.log` |
| Renew SSL manually | `sudo certbot renew` |
| Check SSL expiry | `sudo certbot certificates` |
| View disk usage | `df -h` |
| View memory usage | `free -h` |

---

## 14. Troubleshooting

### App not starting

```bash
pm2 logs fifthfloor --lines 100
```

Check if port 3000 is already in use:

```bash
sudo lsof -i :3000
```

### Nginx 502 Bad Gateway

The Next.js app is probably not running. Start it:

```bash
pm2 start /var/www/fifthfloor/ecosystem.config.js
```

### SSL certificate issues

```bash
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

### Build fails on server (out of memory)

Add a 2 GB swap file:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Persist swap on reboot
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Then retry `pnpm build`.

### Environment variables not loading

Make sure `.env.local` exists at `/var/www/fifthfloor/.env.local` and that you ran `pnpm build` **after** creating it.

---

## ✅ Deployment Checklist

- [ ] SSH access verified (`ssh root@187.124.118.211`)
- [ ] System updated (`apt update && apt upgrade`)
- [ ] Node.js 20 LTS installed via NVM
- [ ] pnpm installed globally
- [ ] PM2 installed and startup configured
- [ ] Nginx installed and running
- [ ] DNS A records pointing to `187.124.118.211`
- [ ] Repository cloned to `/var/www/fifthfloor`
- [ ] `.env.local` created with all production variables
- [ ] `pnpm build` completed successfully
- [ ] PM2 app started and saved (`pm2 save`)
- [ ] SSL certificate obtained via Certbot
- [ ] Nginx reverse proxy configured and tested (`nginx -t`)
- [ ] Firewall rules set (UFW)
- [ ] Site live at https://fifthflooragency.com

---

*Generated for Fifth Floor Agency — July 2026*
