import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import handleSocket from "./socket.js";
dotenv.config();

// Import ENV variables
const { PORT, CLIENT_URL } = process.env;

// initialize server
const app = express();
const server = http.createServer(app);

// configure socket IO
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    method: ["GET", "POST"],
  },
});

// configure CORS origin
var corsOptions = {
  origin: [CLIENT_URL],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Start server
server.listen(PORT, () => {
  console.log(`start server on port http://localhost:${PORT}`);
});

// handle socket events
handleSocket(io);
