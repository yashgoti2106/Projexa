FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Install all dependencies (we need devDependencies for vite build)
RUN npm install
RUN cd server && npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Expose port
EXPOSE 8080

# Start server
ENV NODE_ENV=production
ENV PORT=8080
CMD ["npm", "run", "server"]
