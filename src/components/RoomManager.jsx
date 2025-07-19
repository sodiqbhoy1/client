// src/pages/RoomManager.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const API_URL = 'http://localhost:5000';

const RoomManager = () => {
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [copiedRoomId, setCopiedRoomId] = useState(null);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      setRooms(res.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const createRoom = async () => {
    if (!roomName.trim()) return;
    try {
      await axios.post(`${API_URL}/create`, { roomId: roomName });
      setRoomName('');
      fetchRooms();
    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  const deleteRoom = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchRooms();
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  const copyLink = (roomId) => {
    const link = `${window.location.origin}/join/${roomId}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedRoomId(roomId);
      setTimeout(() => setCopiedRoomId(null), 2000); // Reset after 2 seconds
    });
  };

  const joinRoom = (roomId) => {
    // For the admin, we can bypass the landing page by passing state directly
    navigate(`/chat/${roomId}`, { state: { name: 'Admin', email: 'admin@chatapp.com' } });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Room Manager</h1>
        
        {/* Create Room Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Create a New Room</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter a name for your new room"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={createRoom}
              className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors"
            >
              Create Room
            </button>
          </div>
        </div>

        {/* Rooms List */}
        <div className="space-y-4">
          {rooms.length > 0 ? rooms.map((room) => (
            <div key={room._id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-0">
                  {room.roomId}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyLink(room.roomId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    {copiedRoomId === room.roomId ? 'Copied!' : 'Copy Link'}
                  </button>
                  <button
                    onClick={() => joinRoom(room.roomId)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Join Room
                  </button>
                  <button
                    onClick={() => deleteRoom(room.roomId)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center text-gray-500 py-10 bg-white rounded-lg shadow-md">
              <p>No rooms found. Create one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomManager;
