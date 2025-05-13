# My POS App

This project is a simple Point of Sale (POS) web application built with React for the frontend and Node.js (Express) for the backend.

## Project Structure

```
/my-pos-app
├── /client     <-- React frontend
├── /server     <-- Node.js + Express backend
└── package.json  <-- Root package.json for concurrent execution
```

## Prerequisites

- Node.js and npm (or yarn) installed on your system.

## Getting Started

1.  **Clone or Download the Project:**
    If you received this as a zip file, extract it to your desired location.

2.  **Install Dependencies:**
    Navigate to the root directory of the project (`my-pos-app`) in your terminal and run:
    ```bash
    npm install
    ```
    This command will install the `concurrently` package specified in the root `package.json`.

    Next, install dependencies for the client and server separately:
    - Navigate to the client directory: `cd client` and run `npm install`
    - Navigate to the server directory: `cd ../server` and run `npm install`
    - Return to the root directory: `cd ..`

3.  **Run the Application (Development Mode):**
    From the root directory (`my-pos-app`), run:
    ```bash
    npm run dev
    ```
    This command uses `concurrently` to start both the React frontend server (usually on `http://localhost:3000`) and the Node.js backend server (usually on `http://localhost:3001`).

4.  **Access the Application:**
    Open your web browser and navigate to `http://localhost:3000` to see the POS application in action.

## Available Scripts

In the root `package.json`:

-   `npm run server`: Starts the backend server only (navigates to `/server` and runs `npm start`).
-   `npm run client`: Starts the frontend development server only (navigates to `/client` and runs `npm start`).
-   `npm run dev`: Starts both the client and server concurrently.

In `/client/package.json`:

-   `npm start`: Starts the React development server.
-   `npm run build`: Bundles the app into static files for production.
-   `npm test`: Starts the test runner.

In `/server/package.json`:

-   `npm start`: Starts the Node.js/Express server using `node index.js`.

## Features

-   **Product List:** Displays a list of mocked products fetched from the backend.
-   **Add to Cart:** Allows users to add products to their shopping cart.
-   **Cart Summary:** Shows the current items in the cart, quantities, subtotal, and total.
-   **Checkout:** A button that simulates a checkout process by sending the cart data to the backend `/checkout` endpoint.

## Backend API Endpoints

-   `GET /products`: Returns a JSON array of mocked products.
-   `POST /checkout`: Receives cart data in the request body and returns a success message.

