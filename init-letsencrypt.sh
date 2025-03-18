#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

domains=(abadiq.com www.abadiq.com)
rsa_key_size=4096
data_path="./certbot"
email="admin@abadiq.com" # Change to your email

# Create required directories
mkdir -p "$data_path/conf/live/abadiq.com"
mkdir -p "$data_path/www"

# Create dummy certificate to bootstrap
if [ ! -e "$data_path/conf/live/abadiq.com/cert.pem" ]; then
  echo "Creating dummy certificate for abadiq.com..."
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 \
    -keyout "$data_path/conf/live/abadiq.com/privkey.pem" \
    -out "$data_path/conf/live/abadiq.com/fullchain.pem" \
    -subj "/CN=localhost"

  echo "Creating options-ssl-nginx.conf..."
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  
  echo "Creating ssl-dhparams.pem..."
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
fi

# Start nginx
echo "Starting nginx to validate domains..."
docker-compose up --force-recreate -d nginx

# Wait for nginx to start
echo "Waiting for nginx to start..."
sleep 5

# Request certificates
echo "Requesting Let's Encrypt certificates..."
docker-compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    --email $email \
    --agree-tos \
    --no-eff-email \
    -d ${domains[0]} -d ${domains[1]}" certbot

# Check if nginx is running before trying to reload
echo "Checking nginx and reloading configuration..."
if docker-compose ps | grep -q "nginx.*Up"; then
  docker-compose exec nginx nginx -s reload
  echo "Nginx reloaded successfully."
else
  echo "Warning: Nginx service is not running. Certificates were obtained but not loaded."
  echo "You'll need to start the services with 'docker-compose up -d' to use the certificates."
fi

echo "SSL setup completed!" 