import { io } from "socket.io-client";

const socket = io(import.meta.env.REACT_APP_API_URL, {
  transports: ['websocket', 'polling'],
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 5,
  timeout: 20000,
}); // connect to our backend URL

// Debug connection events
socket.on('connect', () => {
  console.log('Connected to server with socket ID:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from server:', reason);
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

export default socket;
