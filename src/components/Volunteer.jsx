import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Justice from '../assets/justice.jpg';

const Volunteer = () => {
  return (
    <>
      <Navbar />
      <section
        className="relative bg-cover bg-center bg-fixed h-screen flex items-end justify-start text-white p-8 sm:p-12"
        style={{ backgroundImage: `url(${Justice})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-bold">
          Volunteer
        </h1>
      </section>

      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#C8102E]">
            Join Me!
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-[
#002855]">
            For Integrity, For Justice, For Texas
          </p>
          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="sr-only">First name</label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  placeholder="First Name"
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-200 focus:border-blue-900 focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="sr-only">Last name</label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  placeholder="Last Name"
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-200 focus:border-blue-900 focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-200 focus:border-blue-900 focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="zip" className="sr-only">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  autoComplete="postal-code"
                  placeholder="ZIP Code"
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-200 focus:border-blue-900 focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full sm:w-auto flex justify-center py-3 px-8 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#002855] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Volunteer;

