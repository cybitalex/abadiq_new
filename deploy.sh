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

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be accessible at https://abadiq.com"
echo "📝 Check logs with: docker-compose logs -f"

# Final status
echo "📊 Container status:"
docker-compose ps 