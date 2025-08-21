// src/pages/Rooms.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_APP_API_URL;

const Rooms = () => {
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [copiedRoomId, setCopiedRoomId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // Prompt for name before join
  const [showNameModal, setShowNameModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [pendingRoomId, setPendingRoomId] = useState(null);
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
    
    // Convert room name to URL-safe format
    const urlSafeRoomName = roomName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-z0-9-_]/g, '') // Remove special characters except hyphens and underscores
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
    
    if (!urlSafeRoomName) {
      alert('Please enter a valid room name');
      return;
    }
    
    try {
      await axios.post(`${API_URL}/create`, { roomId: urlSafeRoomName });
      setRoomName('');
      fetchRooms();
    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  const openDeleteModal = (id) => {
    setRoomToDelete(id);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setRoomToDelete(null);
  };

  const deleteRoom = async () => {
    if (!roomToDelete) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/${roomToDelete}`);
      setShowDeleteModal(false);
      setRoomToDelete(null);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    } finally {
      setIsDeleting(false);
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
    // Set admin user info in sessionStorage to bypass landing page
    const adminUser = { name: 'Admin', email: 'admin@chatapp.com' };
    sessionStorage.setItem('chatUser', JSON.stringify(adminUser));
    // Prompt for name instead of immediate join
    setPendingRoomId(roomId);
    setShowNameModal(true);
  };

  const confirmNameJoin = () => {
    const displayName = nameInput.trim();
    if (!displayName) {
      alert("Please enter a name to join the room.");
      return; // Stop the function if the name is empty
    }
    const adminUser = { name: displayName, role: 'admin' };
    sessionStorage.setItem('chatUser', JSON.stringify(adminUser));
    const target = pendingRoomId;
    setShowNameModal(false);
    setNameInput('');
    setPendingRoomId(null);
    if (target) navigate(`/chat/${target}`);
  };

  const cancelNameModal = () => {
    setShowNameModal(false);
    setNameInput('');
    setPendingRoomId(null);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Room Manager</h1>
        
        {/* Create Room Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Create a New Room</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter a name for your new room"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005c45]"
            />
            <button
              onClick={createRoom}
              className="bg-[#004030] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold hover:bg-[#005c45] transition-colors"
            >
              Create Room
            </button>
          </div>
        </div>

        {/* Rooms List */}
        <div className="space-y-3 sm:space-y-4">
          {rooms.length > 0 ? rooms.map((room) => (
            <div key={room._id} className="bg-white p-3 sm:p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-0 break-all">
                  {room.roomId}
                </h2>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => copyLink(room.roomId)}
                    className="bg-[#004030] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-[#005c45] transition-colors flex-1 sm:flex-none"
                  >
                    {copiedRoomId === room.roomId ? 'Copied!' : 'Copy Link'}
                  </button>
                  <button
                    onClick={() => joinRoom(room.roomId)}
                    className="bg-gray-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors flex-1 sm:flex-none"
                  >
                    Join Room
                  </button>
                  <button
                    onClick={() => openDeleteModal(room.roomId)}
                    className="bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-red-600 transition-colors flex-1 sm:flex-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center text-gray-500 py-6 sm:py-10 bg-white rounded-lg shadow-md">
              <p>No rooms found. Create one to get started!</p>
            </div>
          )}
        </div>
      </div>

      {/* Name Prompt Modal */}
      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white w-full max-w-sm mx-4 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900">Enter your name</h3>
            <p className="text-sm text-gray-600 mt-1">This name will be shown in the chat.</p>
            <div className="mt-4">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && confirmNameJoin()}
                placeholder="e.g., Jane Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005c45]"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={cancelNameModal}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmNameJoin}
                disabled={!nameInput.trim()}
                className="px-4 py-2 rounded-md bg-[#004030] text-white hover:bg-[#005c45] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30 transition-opacity">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md m-4 transform transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Delete Room</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this room? This action cannot be undone.
              </p>
              
              <div className="flex justify-center w-full space-x-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteRoom}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </div>
                  ) : (
                    'Delete Room'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
