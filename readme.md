## Prerequisites

- Docker installed on your machine.
- Access to the public repository.

## Installation and Setup

1. **Clone the repository:**

   git clone https://github.com/SerhatUzbas/library-management.git

2. **Navigate to the project directory:**

   cd library-management

3. **Run the application using the shell script:**
   I have provided a shell script to simplify the process of running the application in Docker.

   First, make the script executable:
   chmod +x setup-production.sh

   Then, run the script:
   ./setup-production.sh

   This script will build all Docker images, run migrations, seed the database, and start the application containers.

   Frontend: http://localhost:4000
   Backend: http://localhost:8001
   Postgres: http://localhost:5431

   If you want to change the ports, you can do that in the docker-compose.prod.yml file.

   And do not forget that if you want to connect postgres from outside the container, you need to enter the port number 54321.

   You can check the logs of the application with the following commands:
   docker ps => get the container id
   docker exec -it <container_id> sh
   cd logs

## Technologies Used

- **Backend:** Node.js, Prisma, Express , Postgres, Jest
- **Frontend:** React, Mantine, Tanstack Query, Zustand

## Database Setup

- The `schema.sql` file is included in the repository to set up the database schema. You can use it if you want to but I have provided a shell script to do that.

## Contact

For any questions or concerns, please contact serhatuzbas@gmail.com.
