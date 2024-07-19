# Setup node environment
FROM node:16.19.0-alpine
# Create app directory
WORKDIR /app
# Copy package.json to /app directory
COPY package.json /app
# Install dependencies
RUN npm install
# Workaround for Vite + Docker build error
RUN npm rebuild esbuild
# Copy source code to /app directory
COPY . ./
# Build app
RUN npm run build
# Symlink old header
RUN ln -s /app/dist/dgx-header.min.js /app/dist/header.min.js
# Expose port 4173 on container
EXPOSE 4173
# Build and run the app
CMD ["npm", "run", "prod"]
