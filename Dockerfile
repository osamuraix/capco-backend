# Stage 1: Build the Go application
FROM golang:1.19-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum to download dependencies
COPY go.* ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the application as a static binary
# CGO_ENABLED=0 is important for creating a static binary that can run in a scratch image
# -ldflags="-w -s" strips debugging information to reduce binary size
RUN CGO_ENABLED=0 GOOS=linux go build -a -ldflags="-w -s" -o /main .

# Stage 2: Create the final, minimal image
FROM scratch

# Copy the compiled binary from the builder stage
COPY --from=builder /main /main

# Expose the port the application runs on (update if necessary)
EXPOSE 8080

# Set the entrypoint for the container
ENTRYPOINT ["/main"]
