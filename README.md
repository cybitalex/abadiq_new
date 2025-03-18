# ABADIQ Medical Billing Services

Modern Medical Billing Application using React, Express, and Docker.

## Quick Start

### Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`

### Production Deployment with Docker

1. Clone the repository
2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```
3. Run SSL setup script:
   ```bash
   chmod +x init-letsencrypt.sh
   ./init-letsencrypt.sh
   ```
4. Start the application:
   ```bash
   docker-compose up -d
   ```

## Docker Container Architecture

- **React App**: Single-page application with Material UI
- **API Server**: Express.js backend
- **Nginx SSL Proxy**: SSL termination and request routing
- **Certbot**: Automatic SSL certificate renewal

## Important Links

- **Live Site**: [https://abadiq.com](https://abadiq.com)
- **Detailed Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

## Troubleshooting

If you encounter build issues:

1. Check Docker logs: `docker-compose logs app`
2. Try rebuilding without cache: `docker-compose build --no-cache`
3. Ensure Node.js compatibility: We use Node.js 16 in the containers

## License

All rights reserved.
