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

### 3. Make the initialization script executable

```bash
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
```

### Troubleshooting

#### SSL Issues

- Check Certbot logs: `docker-compose logs certbot`
- Verify certificate files exist in `./certbot/conf/live/abadiq.com/`
- Ensure domain DNS is correctly pointing to server

#### Application Issues

- Check application logs: `docker-compose logs app`
- Check API logs: `docker-compose logs api`
- Verify network connectivity between containers

## Backup

To backup important data:

```bash
# Backup SSL certificates
tar -czf certbot-conf-backup.tar.gz ./certbot/conf
```
