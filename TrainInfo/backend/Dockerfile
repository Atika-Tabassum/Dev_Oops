# Use an official Node.js image
FROM node:14.14.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json (for better build caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port your app will run on (optional but useful for clarity)
EXPOSE 4004

# Command to run the app
CMD ["npm", "start"]
