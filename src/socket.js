import { io } from "socket.io-client";

const URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

const socket = io(URL, {
  autoConnect: false, // We will connect manually when needed
  transports: ['websocket', 'polling'], // Use websocket first, fallback to polling
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 5,
});

// Log connection events for debugging
socket.on('connect', () => {
  console.log('Socket.IO connected successfully:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Socket.IO disconnected:', reason);
  if (reason === 'io server disconnect') {
    // The server has forcefully disconnected the socket
    console.error('The server has forcefully disconnected the socket.');
  }
});

socket.on('connect_error', (error) => {
  console.error('Socket.IO connection error:', error);
});

export default socket;
