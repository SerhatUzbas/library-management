#!/bin/bash

# Copy production env file
#cp .env.prod .env

# Build and start the containers in detached mode
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for the database to be ready (increased wait time to be safe)
echo "Waiting for database to be ready..."
sleep 15

# Drop the _prisma_migrations table if it exists
echo "Dropping _prisma_migrations table..."
docker-compose -f docker-compose.prod.yml exec -T postgres psql -U postgres -d library_management_prod -c "DROP TABLE IF EXISTS _prisma_migrations;"

# Check if backend container is running
echo "Checking backend container status..."
docker-compose -f docker-compose.prod.yml logs backend

# Run migrations with error checking
echo "Running database migrations..."
if docker-compose -f docker-compose.prod.yml exec -T backend yarn prisma migrate deploy; then
    echo "Migrations completed successfully"
else
    echo "Migration failed"
    exit 1
fi

# Check if tables have any data
echo "Checking if tables are empty..."
TABLE_DATA_EXISTS=$(docker-compose -f docker-compose.prod.yml exec -T postgres psql -U postgres -p 5431 -d library_management_prod -t -c "\
    SELECT EXISTS ( \
        SELECT 1 FROM information_schema.tables t \
        JOIN pg_stat_user_tables st ON t.table_name = st.relname \
        WHERE t.table_schema = 'public' \
        AND t.table_name != '_prisma_migrations' \
        AND st.n_live_tup > 0 \
    );")

if [ "$TABLE_DATA_EXISTS" = " f" ]; then
    echo "Tables are empty. Proceeding with seeding..."
    if docker-compose -f docker-compose.prod.yml exec -T backend yarn prisma db seed; then
        echo "Database seeded successfully"
    else
        echo "Seeding failed"
        exit 1
    fi
else
    echo "Tables contain data. Skipping seeding."
fi

# Show logs
echo "Setup completed. Showing logs..."
docker-compose -f docker-compose.prod.yml logs -f