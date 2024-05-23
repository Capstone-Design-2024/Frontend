# Step 1: Build the React application
FROM node:14 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Step 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the built React application from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the app runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
