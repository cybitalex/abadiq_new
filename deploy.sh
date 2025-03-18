#!/bin/bash

# ABADIQ Medical Billing Services Deployment Script
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 Starting ABADIQ Medical Billing Services deployment..."

# Check for docker and docker-compose
if ! [ -x "$(command -v docker)" ]; then
  echo "❌ Error: docker is not installed." >&2
  exit 1
fi

if ! [ -x "$(command -v docker-compose)" ]; then
  echo "❌ Error: docker-compose is not installed." >&2
  exit 1
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p nginx certbot/conf certbot/www api

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "📄 Creating .env file from template..."
  cp .env.example .env
  echo "⚠️  Please edit the .env file with your actual values"
  read -p "Press Enter to continue after editing .env..."
fi

# Check if nginx directory has required configuration files
if [ ! -f nginx/default.conf ] || [ ! -f nginx/ssl-proxy.conf ]; then
  echo "⚠️ Nginx configuration files missing. Creating them..."
  
  # Create default.conf if it doesn't exist
  if [ ! -f nginx/default.conf ]; then
    cat > nginx/default.conf << 'EOF'
server {
    listen 80;
    server_name localhost;

    # Handle React routing (SPA)
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests
    location /api {
        proxy_pass http://api:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF
  fi

  # Create ssl-proxy.conf if it doesn't exist
  if [ ! -f nginx/ssl-proxy.conf ]; then
    cat > nginx/ssl-proxy.conf << 'EOF'
server {
    listen 80;
    server_name abadiq.com www.abadiq.com;
    
    # For certbot challenges
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    # Redirect to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name abadiq.com www.abadiq.com;
    
    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/abadiq.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/abadiq.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    # Proxy to React app
    location / {
        proxy_pass http://app:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Proxy API requests to backend service
    location /api {
        proxy_pass http://api:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
EOF
  fi
fi

# Make initialization script executable
echo "🔒 Setting up SSL certificates..."
chmod +x init-letsencrypt.sh

# Initialize SSL certificates
./init-letsencrypt.sh

# Build and start containers
echo "🐳 Building and starting Docker containers..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Verify all containers are running
echo "✅ Verifying container status..."
RUNNING_CONTAINERS=$(docker-compose ps --services --filter "status=running" | wc -l)
EXPECTED_CONTAINERS=4  # app, api, nginx, certbot

if [ "$RUNNING_CONTAINERS" -eq "$EXPECTED_CONTAINERS" ]; then
  echo "✅ All containers are running!"
else
  echo "⚠️ Warning: Not all containers are running. Check the logs."
  docker-compose ps
  docker-compose logs
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be accessible at https://abadiq.com"
echo "📝 Check logs with: docker-compose logs -f"

# Final status
echo "📊 Container status:"
docker-compose ps 