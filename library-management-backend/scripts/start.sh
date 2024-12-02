#!/bin/bash
# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Run migrations
echo "Running migrations..."
npx prisma migrate deploy

# Start the application
echo "Starting the application..."
npm start 