# Setup node environment
FROM node:18-alpine
# Create app directory
WORKDIR /app
# Copy package.json to /app directory
COPY package.json /app
# Install dependencies
RUN npm install
RUN npm rebuild esbuild
# Copy source code to /app directory
COPY . ./
# Expose port 4173 on container
EXPOSE 4173
# Build and run the app
CMD ["npm", "run", "prod"]