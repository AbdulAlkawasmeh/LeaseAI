# Use the official node image as a base
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Step 1: Install backend dependencies (if any)
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend ./

# Step 2: Build the frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Expose the frontend port (3000 for React)
EXPOSE 3000

# Start the application (You may want to adjust this based on how your backend works)
CMD ["npm", "run", "start"]
