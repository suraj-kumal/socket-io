# Socket.io

This repository contains a simple chat application built using React for the frontend and Node.js with Express and Socket.io for the backend. The communication between the client and server is facilitated through WebSocket connections, allowing real-time messaging and room-based interactions.

# Features:

1. Real-Time Messaging:
   - Users can send and receive messages in real-time through WebSocket connections.

2. Room Functionality:
   - Users can join different chat rooms to communicate with others in specific groups.

3. Authentication:
   - JWT (JSON Web Tokens) are used for basic authentication during the login process.

# Backend (Node.js, Express, Socket.io):

- Express Server:
  - The server is created using Express, providing the endpoints for login and basic routing.

- WebSocket Communication:
  - Socket.io is used for handling WebSocket connections, allowing real-time bidirectional communication between the server and clients.

- Authentication Middleware:
  - Middleware is implemented to handle user authentication using JWT when connecting via WebSocket.

# Frontend (React, Socket.io-client, Material-UI):

- React Application:
  - The frontend is developed using React, providing a user interface for interacting with the chat application.

- Socket.io-client:
  - The Socket.io-client library is utilized to establish a WebSocket connection with the server.

- Material-UI Components:
  - Material-UI components are used to create a clean and responsive user interface.

How to Run:

1. Backend:
   - Ensure Node.js is installed.
   - Run `npm install` to install dependencies.
   - Start the server with `npm run dev` or another suitable script.

2. Frontend:
   - Navigate to the `frontend` directory.
   - Run `npm install` to install dependencies.
   - Start the React app with `npm run dev`.

3. Access the Application:
   - Open your browser and go to `http://localhost:5173` to use the chat application.

