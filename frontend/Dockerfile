# Use Node.js as the base image
FROM node:18

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose necessary ports
EXPOSE 5000
EXPOSE 3306
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
