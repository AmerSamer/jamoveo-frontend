/**
 * socket.js
 *
 * Initializes a Socket.IO client instance for real-time communication.
 *
 * Configuration:
 * - Connects to the backend server using VITE_BASE_URL
 * - Uses WebSocket transport only for performance and stability
 * - `autoConnect: false` ensures the socket is only connected manually when needed
 *
 * Usage:
 * - Import and call `socket.connect()` when the user enters a session
 * - Use `socket.emit(...)` and `socket.on(...)` to send/receive events
 */

import { io } from "socket.io-client";

// 🔌 Initialize the socket client with your backend base URL
const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
  transports: ["websocket"], // Avoid long polling
  autoConnect: false // Prevent connection until explicitly started
});

export { socket };
