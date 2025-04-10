// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:8082", {
  transports: ["websocket"],
  autoConnect: false // prevent auto connect until needed
});

export { socket };
