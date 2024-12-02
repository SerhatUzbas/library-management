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

## Database Setup

- The `schema.sql` file is included in the repository to set up the database schema. You can use it if you want to but I have provided a shell script to do that.

## Contact

For any questions or concerns, please contact serhatuzbas@gmail.com.
