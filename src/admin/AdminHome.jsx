import React from 'react';
import { Link } from 'react-router';

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="relative">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pt-10 pb-24 sm:px-8 sm:pt-16 md:pt-20 lg:col-span-7 lg:px-0 lg:pt-24 lg:pb-28 xl:col-span-6">
            <div className="mx-auto max-w-lg lg:mx-0">
              <div className="flex items-center text-green-600 mb-4">
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h2 className="text-sm font-semibold tracking-wider uppercase">Chat Application Management</h2>
              </div>
              <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl xl:text-6xl tracking-tight">
                Admin Control Center
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Welcome to the heart of your application. From here, you can manage users, oversee chat rooms, and ensure everything is running smoothly.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
                >
                  Access Admin Panel
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition"
                >
                  ← Back to Main Site
                </Link>
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-5 xl:col-span-6 lg:h-full">
            <div className="absolute inset-0 w-full h-full">
              <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184&q=80')" }}>
                <div className="h-full w-full bg-gradient-to-r from-gray-50 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
