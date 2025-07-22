import React, { useState } from 'react';

const Profile = () => {
  // Dummy user data - you can replace this later with real data from your database
  const [user, setUser] = useState({
    id: 1,
    name: 'Admin User',
    email: 'admin@chatapp.com',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/300?img=8',
    createdAt: '2025-01-15T10:30:00',
    lastActive: '2025-07-22T08:45:00',
    bio: 'Lead administrator for the chat application platform.',
    phoneNumber: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    socialLinks: {
      twitter: 'adminuser',
      github: 'adminuser',
      linkedin: 'admin-user'
    },
    preferences: {
      notifications: true,
      darkMode: false,
      twoFactorAuth: true
    }
  });

  // Form state
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    phoneNumber: user.phoneNumber,
    location: user.location,
    twitter: user.socialLinks.twitter,
    github: user.socialLinks.github,
    linkedin: user.socialLinks.linkedin,
    notifications: user.preferences.notifications,
    darkMode: user.preferences.darkMode,
    twoFactorAuth: user.preferences.twoFactorAuth
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle general form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the updated data to your backend
    // For now, we'll just update the local state
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      phoneNumber: formData.phoneNumber,
      location: formData.location,
      socialLinks: {
        twitter: formData.twitter,
        github: formData.github,
        linkedin: formData.linkedin
      },
      preferences: {
        notifications: formData.notifications,
        darkMode: formData.darkMode,
        twoFactorAuth: formData.twoFactorAuth
      }
    });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    
    // Here you would send the password update to your backend
    alert('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Your Profile</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-700 p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-blue-100">{user.email}</p>
                <div className="mt-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-800 text-white">
                    {user.role}
                  </span>
                </div>
              </div>
              {!isEditing && (
                <div className="mt-4 sm:mt-0 sm:ml-auto">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-white text-blue-700 rounded-md font-medium hover:bg-blue-50 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Profile Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'general'
                    ? 'border-b-2 border-blue-700 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('general')}
              >
                General Information
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'security'
                    ? 'border-b-2 border-blue-700 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('security')}
              >
                Security
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'preferences'
                    ? 'border-b-2 border-blue-700 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('preferences')}
              >
                Preferences
              </button>
            </nav>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            {/* General Information Tab */}
            {activeTab === 'general' && (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {!isEditing ? (
                    // View Mode
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Account Information</h3>
                          <dl className="space-y-3">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                              <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                              <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                              <dd className="mt-1 text-sm text-gray-900">{user.phoneNumber || 'Not provided'}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Location</dt>
                              <dd className="mt-1 text-sm text-gray-900">{user.location || 'Not provided'}</dd>
                            </div>
                          </dl>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Additional Details</h3>
                          <dl className="space-y-3">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Bio</dt>
                              <dd className="mt-1 text-sm text-gray-900">{user.bio || 'No bio provided'}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                              <dd className="mt-1 text-sm text-gray-900">{formatDate(user.createdAt)}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Last Active</dt>
                              <dd className="mt-1 text-sm text-gray-900">{formatDate(user.lastActive)}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Social Profiles</h3>
                        <dl className="space-y-3">
                          <div className="flex items-center">
                            <dt className="text-sm font-medium text-gray-500 w-24">Twitter</dt>
                            <dd className="mt-1 text-sm text-blue-600">
                              {user.socialLinks.twitter ? `@${user.socialLinks.twitter}` : 'Not linked'}
                            </dd>
                          </div>
                          <div className="flex items-center">
                            <dt className="text-sm font-medium text-gray-500 w-24">GitHub</dt>
                            <dd className="mt-1 text-sm text-blue-600">
                              {user.socialLinks.github ? `@${user.socialLinks.github}` : 'Not linked'}
                            </dd>
                          </div>
                          <div className="flex items-center">
                            <dt className="text-sm font-medium text-gray-500 w-24">LinkedIn</dt>
                            <dd className="mt-1 text-sm text-blue-600">
                              {user.socialLinks.linkedin ? `@${user.socialLinks.linkedin}` : 'Not linked'}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </>
                  ) : (
                    // Edit Mode
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Account Information</h3>
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                              <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                              <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Additional Details</h3>
                          <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                            <textarea
                              id="bio"
                              name="bio"
                              rows={5}
                              value={formData.bio}
                              onChange={handleChange}
                              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                              Brief description about yourself that will be visible to other users.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Social Profiles</h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter Username</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                @
                              </span>
                              <input
                                type="text"
                                id="twitter"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                className="flex-1 block w-full p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub Username</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                @
                              </span>
                              <input
                                type="text"
                                id="github"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                                className="flex-1 block w-full p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn Username</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                @
                              </span>
                              <input
                                type="text"
                                id="linkedin"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className="flex-1 block w-full p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                        >
                          Save Changes
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            )}
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Ensure your account is using a strong password to stay secure.
                  </p>
                  <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <div className="mt-4 flex items-center">
                    <input
                      id="twoFactorAuth"
                      name="twoFactorAuth"
                      type="checkbox"
                      checked={formData.twoFactorAuth}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-700 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-700">
                      Enable two-factor authentication
                    </label>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Account Activity</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Review your recent login activity
                  </p>
                  <div className="mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">July 22, 2025</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">192.168.1.1</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">San Francisco, CA</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Chrome / Windows</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">July 20, 2025</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">192.168.1.1</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">San Francisco, CA</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Safari / macOS</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">July 18, 2025</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">192.168.1.1</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">San Francisco, CA</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Firefox / Windows</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage how you receive notifications and updates
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center">
                        <input
                          id="notifications"
                          name="notifications"
                          type="checkbox"
                          checked={formData.notifications}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-700 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                          Enable email notifications
                        </label>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 ml-6">
                        Receive email notifications about new messages, room updates, and system announcements
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Customize your display preferences
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center">
                        <input
                          id="darkMode"
                          name="darkMode"
                          type="checkbox"
                          checked={formData.darkMode}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-700 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700">
                          Enable dark mode
                        </label>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 ml-6">
                        Switch the interface to a darker color scheme
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Language & Region</h3>
                    <div className="mt-4">
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700">
                        Time Zone
                      </label>
                      <select
                        id="timeZone"
                        name="timeZone"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option>(UTC-08:00) Pacific Time (US & Canada)</option>
                        <option>(UTC-07:00) Mountain Time (US & Canada)</option>
                        <option>(UTC-06:00) Central Time (US & Canada)</option>
                        <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                        <option>(UTC) Coordinated Universal Time</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
