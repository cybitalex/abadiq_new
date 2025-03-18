# ABADIQ Application Deployment Guide

This guide explains how to deploy the ABADIQ application using Docker, Nginx, and Let's Encrypt SSL.

## Prerequisites

- A server with Docker and Docker Compose installed
- A domain name (abadiq.com) pointing to your server
- Basic knowledge of Docker, Nginx, and SSL

## Deployment Steps

### 1. Clone the repository

```bash
git clone <repository-url>
cd abadiq_new
```

### 2. Create environment file

```bash
cp .env.example .env
```

Edit the `.env` file with your actual credentials and configuration.

### 3. Prepare directories and files

Make sure your project structure is correct:

```bash
# Create necessary directories
mkdir -p nginx certbot/conf certbot/www
mkdir -p api

# Ensure files have correct permissions
chmod +x init-letsencrypt.sh
```

### 4. Initialize SSL certificates

```bash
./init-letsencrypt.sh
```

This script will:

- Create necessary directories
- Generate dummy SSL certificates
- Start Nginx
- Obtain real certificates from Let's Encrypt
- Reload Nginx with the new certificates

### 5. Start the application

```bash
docker-compose up -d
```

This will start:

- React application container
- Backend API container
- Nginx SSL proxy container
- Certbot container for SSL renewal

### 6. Verify the deployment

Visit your domain (https://abadiq.com) to verify that the application is running correctly.

## Maintenance

### SSL Certificate Renewal

Certificates will be automatically renewed by the Certbot container.

### Updating the Application

To update the application:

1. Pull the latest code:

```bash
git pull
```

2. Rebuild and restart the containers:

```bash
docker-compose down
docker-compose build
docker-compose up -d
```

### Logs

To view logs:

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs app
docker-compose logs api
docker-compose logs nginx
docker-compose logs certbot

# Follow logs in real-time
docker-compose logs -f
```

## Troubleshooting

### Build Issues

If you encounter issues during the build process:

1. Check for errors in the build output:

```bash
docker-compose build --no-cache
```

2. Verify project structure:

```bash
# Check if expressjs.js exists
ls -la expressjs.js
ls -la api/expressjs.js

# Check package.json
ls -la package.json
```

3. Inspect container logs:

```bash
docker-compose logs app
docker-compose logs api
```

### SSL Issues

- Check Certbot logs: `docker-compose logs certbot`
- Verify certificate files exist:
  ```bash
  ls -la ./certbot/conf/live/abadiq.com/
  ```
- Check if Nginx is using the certificates correctly:
  ```bash
  docker-compose exec nginx nginx -t
  ```
- Ensure domain DNS is correctly pointing to server:
  ```bash
  dig abadiq.com
  ```

### Connection Issues

If services can't connect to each other:

1. Check if all containers are running:

```bash
docker-compose ps
```

2. Verify network configuration:

```bash
docker network ls
docker network inspect abadiq_new_app-network
```

3. Test inter-container connectivity:

```bash
docker-compose exec nginx ping app
docker-compose exec nginx ping api
```

### Application Issues

- Check application logs: `docker-compose logs app`
- Check API logs: `docker-compose logs api`
- Inspect application files inside containers:
  ```bash
  docker-compose exec app ls -la /usr/share/nginx/html
  docker-compose exec api ls -la /app
  ```

## Backup

To backup important data:

```bash
# Backup SSL certificates
tar -czf certbot-conf-backup.tar.gz ./certbot/conf

# Backup all configuration
tar -czf abadiq-config-backup.tar.gz ./nginx ./certbot .env docker-compose.yml
```

## Restore from Backup

To restore from backup:

```bash
# Extract the backup files
tar -xzf certbot-conf-backup.tar.gz -C /

# Restart the containers
docker-compose down
docker-compose up -d
```
