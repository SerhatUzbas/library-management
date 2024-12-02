#!/bin/bash
# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Run migrations
echo "Running migrations..."
yarn prisma migrate dev

# Start the application
echo "Starting the application..."
yarn dev   