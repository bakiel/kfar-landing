FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy ALL application files including images
COPY . .

# Verify critical directories exist (for debugging)
RUN echo "=== Checking file structure ===" && \
    ls -la && \
    echo "=== Checking images directory ===" && \
    ls -la images/ || echo "No images directory" && \
    echo "=== Checking logos directory ===" && \
    ls -la images/logos/ || echo "No logos directory"

# DigitalOcean uses port 8080 by default
EXPOSE 8080

# Set production environment
ENV NODE_ENV=production
ENV PORT=8080

# Use the main server directly (not npm start)
CMD ["node", "server.js"]
