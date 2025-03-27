# Use the official Node.js image as the base image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the entire project to the /app folder in the container
COPY . /app/

# Ensure that frontend folder is correctly accessed
WORKDIR /app/frontend

# Install dependencies and build the frontend
RUN npm install && npm run build

# Expose port 3000 for the React app
EXPOSE 3000

# Set the command to run the React app
CMD ["npm", "start"]
