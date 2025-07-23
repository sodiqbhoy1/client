import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: '', 
    lastName: '',
    email: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Not authenticated. Please login.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/admin/details`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Set user data from API response
        const adminData = response.data;
        
        setUser({
          firstName: adminData.firstName || '',
          lastName: adminData.lastName || '',
          email: adminData.email || ''
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin details:', err);
        setError(err.response?.data?.message || 'Failed to fetch profile data');
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#004030] mb-4"></div>
          <p className="text-gray-600">Loading profile information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="text-lg text-red-600">{error}</div>
        <div className="mt-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-[#004030] text-white rounded-lg hover:bg-[#005c45] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Admin Profile</h1>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-[#004030] p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-[#005c45] rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-blue-200 text-sm mt-1">{user.email}</p>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-5">
            <div className="pb-4 border-b border-gray-100">
              <label className="block text-xs font-semibold text-gray-500 mb-1">First Name</label>
              <p className="text-base text-gray-800">{user.firstName}</p>
            </div>

            <div className="pb-4 border-b border-gray-100">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Last Name</label>
              <p className="text-base text-gray-800">{user.lastName}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
              <p className="text-base text-gray-800">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Profile;
