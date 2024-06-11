### README - PLAYGREEN SPORT

This README provides a basic guide to run and understand a Nest.js project, including the application endpoints and their capabilities.



## IMPORTAN THIS TEMPORAL

This credencial data base

```
HOST_DATABASE=35.234.250.244
PORT_DATABASE=3306
USER_DATABASE=playgreen-user
PASS_DATABASE="<u71{y#Fk=zGF<zT"
NAME_DATABASE=playgreen_db
```

after test review  would  remove it

---

### Running the Project

#### Prerequisites

- Node.js and npm installed on your system.
- Code editor (e.g., Visual Studio Code).

#### Steps to Run

1. **Clone the Repository**: Clone the repository from GitHub.

   ```bash
   git clone https://github.com/GermanAlexis/playgreen-sport
   ```

2. **Install Dependencies**: Navigate to the project directory and run the following command to install necessary dependencies.

   ```bash
   cd project-nest
   pnpm install
   ```

3. **Set Environment Variables**: Make sure to set up required environment variables, such as database connection, in a `.env` file or copy `.env.template`.

4. If you like run local way, you docker and run

   ```
   docker compose up -d
   ```

5. **Run the Application**: Use the following command to run the application.

   ```bash
   pnpm start
   ```

   Or, if you prefer to use development mode with automatic restart:

   ```bash
   pnpm start:dev
   ```

6. **Access the Application**: Once the application is up and running, you can access it from your browser

   ```bash
   http://localhost:3001/docs
   ```

### Swagger

Already in this point you can see, UI Swagger where is more specific with examples and like structure is compose

---

### Application Endpoints

Below are the main access points of the application and their capabilities:

1. **Auth**

   - `POST /auth/register`: Register new users.
   - `POST /auth/login`: Authenticate existing users.
   - `GET /auth/verify`: Verify authentication token.

2. **User**
   - `POST /user`: Create a new user with the provided details..
   - `GET /user`: Retrieve a list of all users with optional pagination parameters.
   - `PATCH /user/:id`: Update the details of an existing user identified by their ID.
   - `/user/withdraw/:id` Withdraw cash from the balance of the user identified by their ID.
   - `/user/deposit/:id` Deposit cash into the balance of the user identified by their ID..

---

This README provides a basic overview of how to run the Nest.js project and lists the main access points of the application with their capabilities.
