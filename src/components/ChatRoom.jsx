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
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

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
        const res = await axios.get(`${import.meta.env.VITE_SOCKET_URL}/messages/${roomId}`);
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
      sender: user.name,
      type: 'text'
    };

    socket.emit('send_message', messageData);
    setText('');
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile || !user) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('roomId', roomId);
    formData.append('sender', user.name);

    console.log('Uploading file:', {
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type,
      roomId,
      sender: user.name,
      endpoint: `${import.meta.env.VITE_SOCKET_URL}/api/upload`
    });

    try {
      const response = await axios.post(`${import.meta.env.VITE_SOCKET_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);

      // Handle different response formats from backend
      const responseData = response.data.data || response.data;
      
      const fileMessage = {
        roomId,
        content: responseData.fileName || responseData.originalname || selectedFile.name,
        sender: user.name,
        type: responseData.messageType || (selectedFile.type.startsWith('image/') ? 'image' : 'file'),
        originalName: responseData.fileName || responseData.originalname || selectedFile.name,
        fileUrl: responseData.fileUrl || `/uploads/${responseData.filename || selectedFile.name}`,
        messageType: responseData.messageType || (selectedFile.type.startsWith('image/') ? 'image' : 'file'),
        fileName: responseData.fileName || responseData.originalname || selectedFile.name
      };

      // Emit the message via socket so other users see it in real-time
      socket.emit('send_message', fileMessage);
      
      // Add the message to local state immediately for the sender
      setMessages(prevMessages => [...prevMessages, fileMessage]);
      
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      alert(`Failed to upload file: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const renderMessage = (msg) => {
    // Handle both frontend 'type' and backend 'messageType'
    const messageType = msg.type || msg.messageType;
    
    if (messageType === 'image') {
      return (
        <div>
          <p className="text-sm font-semibold text-gray-600">{msg.sender}</p>
          <img 
            src={msg.fileUrl || `${import.meta.env.VITE_SOCKET_URL}${msg.fileUrl}` || `${import.meta.env.VITE_SOCKET_URL}/uploads/${msg.content}`} 
            alt={msg.originalName || msg.fileName || 'Shared image'} 
            className="max-w-xs rounded-lg mt-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.open(msg.fileUrl || `${import.meta.env.VITE_SOCKET_URL}${msg.fileUrl}` || `${import.meta.env.VITE_SOCKET_URL}/uploads/${msg.content}`, '_blank')}
          />
          <p className="text-xs text-gray-500 mt-1">{msg.originalName || msg.fileName}</p>
        </div>
      );
    } else if (messageType === 'file') {
      return (
        <div>
          <p className="text-sm font-semibold text-gray-600">{msg.sender}</p>
          <div className="bg-gray-50 p-3 rounded mt-2 flex items-center hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <a 
              href={msg.fileUrl || `${import.meta.env.VITE_SOCKET_URL}${msg.fileUrl}` || `${import.meta.env.VITE_SOCKET_URL}/uploads/${msg.content}`} 
              download={msg.originalName || msg.fileName}
              className="text-blue-600 hover:text-blue-800 hover:underline flex-1 truncate"
            >
              {msg.originalName || msg.fileName || msg.content}
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p className="text-sm font-semibold text-gray-600">{msg.sender}</p>
          <p className="text-gray-800">{msg.content}</p>
        </div>
      );
    }
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
                {renderMessage(msg)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-white p-4 border-t">
        {/* File Preview */}
        {selectedFile && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span className="text-sm text-gray-700 truncate max-w-xs">{selectedFile.name}</span>
              <span className="text-xs text-gray-500 ml-2">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={uploadFile}
                disabled={isUploading}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Send'}
              </button>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
          {/* File Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*,application/pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="ml-2 bg-gray-500 text-white rounded-full p-3 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            title="Upload file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          <button
            onClick={sendMessage}
            className="ml-2 bg-green-600 text-white rounded-full p-3 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            title="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatRoom;