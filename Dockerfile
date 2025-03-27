# Use Node.js as the base image
FROM node:16

# Set the working directory in the container to the 'frontend' folder
WORKDIR /frontend

# Copy package.json and package-lock.json first to install dependencies
COPY frontend/package*.json /frontend/

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY frontend /frontend/

# Build the React app
RUN npm run build

# Expose port 3000 for the React app
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
