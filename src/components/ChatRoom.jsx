import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import socket from '../socket';
import axios from 'axios';

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // This effect handles user session management.
    const storedUser = sessionStorage.getItem('chatUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user data is found in sessionStorage, redirect to the landing page.
      alert('Please enter your details to join the chat.');
      navigate(`/`); // Navigate to the join page for the specific room
    }
  }, [roomId, navigate]);

  useEffect(() => {
    // This effect handles fetching messages and socket communication.
    // It should only run when we have a valid user.
    if (!user || !roomId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SOCKET_URL}/api/rooms/${roomId}/messages`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();

    socket.emit('join_room', { roomId, username: user.name });

    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on('receive_message', handleReceiveMessage);

    // Cleanup on component unmount
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [roomId, user]);

  useEffect(() => {
    // Auto-scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (text.trim() === '' || !user) return;

    const messageData = {
      roomId,
      content: text,
      sender: user.name, // Assuming the user object has a 'name' property
    };

    socket.emit('send_message', messageData);
    setText('');
  };

  // Render a loading state or null while checking for user session
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Room: {roomId}</h1>
        <p>Welcome, {user.name}</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === user.name ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md p-3 rounded-lg shadow ${
                  msg.sender === user.name
                    ? 'bg-green-200 text-right'
                    : 'bg-white text-left'
                }`}
              >
                <p className="text-sm font-semibold text-gray-600">{msg.sender}</p>
                <p className="text-gray-800">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-white p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={sendMessage}
            className="ml-4 bg-green-600 text-white rounded-full p-3 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatRoom;
