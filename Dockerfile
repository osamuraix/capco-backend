# Stage 1: Builder
# This stage builds the TypeScript code into JavaScript
FROM node:20-alpine AS builder

WORKDIR /app

# Copy configuration and dependency files
COPY package*.json tsconfig.json ./

# Install all dependencies (including devDependencies) and build the project
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
# This stage creates the final, lean production image
FROM node:20-alpine

WORKDIR /app

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only necessary files for production
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the built application from the 'builder' stage
COPY --from=builder /app/dist ./dist

# Change ownership of the app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the application port
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]