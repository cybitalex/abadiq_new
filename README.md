# ABADIQ Medical Billing Services

Modern Medical Billing Application using React, Express, and Docker.

## Quick Start

### Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`

### Production Deployment with Docker

#### Option 1: Using the Automated Script (Recommended)

The deployment script will automatically set up everything including the necessary patches for webpack build issues:

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

#### Option 2: Manual Deployment

1. Clone the repository
2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```
3. Create necessary directories and files:

   ```bash
   mkdir -p nginx certbot/conf certbot/www api

   # Create a patch for webpack build issues
   chmod +x custom-build.js
   ```

4. Run SSL setup script:
   ```bash
   chmod +x init-letsencrypt.sh
   ./init-letsencrypt.sh
   ```
5. Start the application:
   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

## Docker Container Architecture

- **React App**: Single-page application with Material UI
- **API Server**: Express.js backend
- **Nginx SSL Proxy**: SSL termination and request routing
- **Certbot**: Automatic SSL certificate renewal

## Webpack Build Fix

This project includes a custom solution for the common webpack error: `TypeError: message.split is not a function`. We've implemented:

1. A custom build script (`custom-build.js`) that patches the react-dev-utils module at runtime
2. A custom Dockerfile that uses this script instead of the standard npm build command
3. Updated docker-compose.yml to use this custom Dockerfile

## Important Links

- **Live Site**: [https://abadiq.com](https://abadiq.com)
- **Detailed Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

## Troubleshooting

If you encounter build issues:

1. Check Docker logs: `docker-compose logs app`
2. Try rebuilding without cache: `docker-compose build --no-cache`
3. Ensure Node.js version compatibility: We use Node.js 16 in the containers
4. Check Nginx configuration: `docker-compose exec nginx nginx -t`
5. Verify Docker network connectivity: `docker network inspect abadiq_new_app-network`

## License

All rights reserved.
