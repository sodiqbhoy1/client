import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ['websocket', 'polling'],
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 5,
  timeout: 20000,
}); // replace with your backend URL in production

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
