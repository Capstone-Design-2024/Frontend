# Step 1: Build the React application
FROM node:18 AS build

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

RUN apk add curl

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
