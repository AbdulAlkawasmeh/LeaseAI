# Use the official Node.js image as the base image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json separately to optimize caching of dependencies
COPY frontend/package*.json ./frontend/

# Install dependencies in the frontend directory
WORKDIR /app/frontend
RUN npm install

# Copy the rest of the project to /app/frontend (including all other files)
COPY . /app/

# Build the React app
RUN npm run build

# Install `serve` to serve the static files in production
RUN npm install -g serve

# Expose port 3000 for the React app
EXPOSE 3000

# Command to serve the build folder with `serve` (production)
CMD ["serve", "-s", "build", "-l", "3000"]
