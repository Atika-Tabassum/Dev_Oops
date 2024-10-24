# Use Node.js as the base image
FROM node:14 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Use Node.js to serve the built app
FROM node:14

# Set the working directory for the final image
WORKDIR /app

# Copy built assets from the previous stage
COPY --from=build /app/build ./build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3001

# Start the server
CMD ["serve", "-s", "build"]
