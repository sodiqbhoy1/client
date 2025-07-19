import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router';
import socket from '../socket';
import axios from 'axios';

const ChatRoom = () => {
  const { roomId } = useParams();
  const { state } = useLocation(); // { name: "UserName" }
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!state || !roomId) return;

    // Fetch previous messages when the component mounts
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/messages/${roomId}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();

    // Join room with correct event name and payload
    socket.emit('join_room', { roomId, username: state.name });

    // Listen for incoming messages with correct event name
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      // Cleanup listener on unmount
      socket.off('receive_message');
    };
  }, [roomId, state]);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (text.trim() === '') return;

    const msg = {
      content: text, // Use 'content' to match backend schema
      sender: state.name,
      roomId,
    };

    // Emit message to server with correct event name
    socket.emit('send_message', msg);

    // Clear the input field after sending
    setText('');
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <h2 className="text-xl mb-2">Room: {roomId}</h2>
      <div className="flex-1 overflow-y-auto border p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-1 p-2 rounded ${
              msg.sender === state.name
                ? 'bg-blue-100 text-right'
                : 'bg-gray-100 text-left'
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
