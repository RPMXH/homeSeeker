# ./frontend/Dockerfile
# --- Production Focused (Multi-Stage Build for React SPA) ---

# Stage 1: Build the React application using Node.js
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
# Use npm ci for cleaner, faster, reproducible installs
RUN npm install

COPY . .
# Execute the build script (e.g., "build": "react-scripts build" or "vite build")
RUN npm run build

# Stage 2: Serve static files using Nginx
FROM nginx:stable-alpine
# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx welcome page content
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React static files from the 'builder' stage's output directory
# *** COMMON FOR CRA: /app/build. ADJUST IF YOU USE VITE (/app/dist) OR OTHER ***
COPY --from=builder /app/build /usr/share/nginx/html

# Expose Nginx's default HTTP port
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]