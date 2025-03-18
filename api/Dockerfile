FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps flag
RUN npm install --legacy-peer-deps

# Copy the expressjs.js file
COPY expressjs.js ./

# Copy any other necessary files
COPY ./api ./api

# Set environment variables
ENV NODE_ENV=production
ENV API_PORT=3001

# Expose the port the app will run on
EXPOSE 3001

# Command to run the application
CMD ["node", "expressjs.js"] 