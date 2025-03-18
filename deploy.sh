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

# Check if custom-build.js exists and is executable
if [ ! -f custom-build.js ]; then
  echo "⚠️ Creating custom build script to fix webpack issues..."
  cat > custom-build.js << 'EOF'
#!/usr/bin/env node

/**
 * Custom build script that patches the react-dev-utils/formatWebpackMessages module
 * to fix the TypeError: message.split is not a function error
 */

// Path to the formatWebpackMessages.js file
const formatFilePath = require.resolve('react-dev-utils/formatWebpackMessages');

// Get the original formatWebpackMessages module
const originalFormatWebpackMessages = require(formatFilePath);

// Monkey patch the formatMessage function
const fs = require('fs');
const path = require('path');
const fileContent = fs.readFileSync(formatFilePath, 'utf8');

// Apply patch only if it hasn't been applied yet
if (fileContent.includes('let lines = message.split')) {
  console.log('📝 Patching formatWebpackMessages.js to fix TypeError...');
  
  const patchedContent = fileContent.replace(
    'let lines = message.split(\'\\n\');',
    'let lines = [];\nif (typeof message === \'string\') {\n  lines = message.split(\'\\n\');\n}'
  );
  
  fs.writeFileSync(formatFilePath, patchedContent, 'utf8');
  console.log('✅ Patch applied successfully!');
}

// Run the original build script
console.log('🏗️ Starting build process...');
require('../scripts/build');
EOF
  chmod +x custom-build.js
  echo "✅ Custom build script created!"
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

# Check if Dockerfile.custom exists
if [ ! -f Dockerfile.custom ]; then
  echo "⚠️ Creating custom Dockerfile to fix build issues..."
  cat > Dockerfile.custom << 'EOF'
# Build stage
FROM node:16-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the custom build script and make it executable
COPY custom-build.js ./
RUN chmod +x custom-build.js

# Copy the rest of the application code
COPY . .

# Set environment variables for build
ENV GENERATE_SOURCEMAP=false
ENV NODE_ENV=production
ENV CI=false

# Use the custom build script instead of npm run build
RUN node custom-build.js

# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF
  echo "✅ Custom Dockerfile created!"
fi

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