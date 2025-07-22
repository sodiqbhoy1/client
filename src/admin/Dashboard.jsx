import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

const API_URL = import.meta.env.VITE_SOCKET_URL

/**
 * Dashboard displays a greeting and the active rooms count.
 */
const Dashboard = () => {
  const [activeRoomsCount, setActiveRoomsCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${API_URL}/all`)
        setActiveRoomsCount(Array.isArray(res.data) ? res.data.length : 0)
      } catch (error) {
        console.error('Error fetching active rooms:', error)
        setActiveRoomsCount(0) // Set a default value on error
      }
    }
    fetchRooms()
  }, [])

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="text-blue-100">Here's what's happening with your chat application today.</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-blue-100 text-sm">Today</p>
            <p className="text-xl font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Active Rooms Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => navigate('/admin-dashboard/rooms')}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{activeRoomsCount}</p>
            </div>
          </div>
          <div className="mt-3 text-sm text-blue-700 flex items-center justify-end">
            <span>View all rooms</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard