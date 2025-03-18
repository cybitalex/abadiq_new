FROM node:18-alpine

WORKDIR /app

# Copy the entire application
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps

# Expose the port the app will run on
EXPOSE 3001

# Command to run the application
CMD ["node", "expressjs.js"] 