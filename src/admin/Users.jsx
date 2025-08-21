import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user/details`);
        const usersWithAvatars = response.data.map(user => ({
          ...user,
          avatar: `https://i.pravatar.cc/150?u=${user.email}`
        }));
        setUsers(usersWithAvatars);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user deletion
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        // Make the DELETE request to the server
        await axios.delete(`${import.meta.env.VITE_APP_API_URL}/users/${userId}`);
        
        // Update the UI by filtering out the deleted user
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      } catch (err) {
        console.error("Failed to delete user:", err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center"><p className="text-gray-600">Loading users...</p></div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center"><p className="text-red-600">{error}</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">User Management</h1>
        </div>
        
        {users.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map(user => (
              <div key={user._id} className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center text-center transition-transform transform hover:-translate-y-1">
                <img
                  className="h-20 w-20 rounded-full object-cover mb-4 border-2 border-gray-200"
                  src={user.avatar}
                  alt={user.fullName}
                />
                <h2 className="text-lg font-semibold text-gray-900 truncate w-full" title={user.fullName}>{user.fullName}</h2>
                <p className="text-sm text-gray-500 truncate w-full" title={user.email}>{user.email}</p>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="mt-4 px-4 py-2 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
