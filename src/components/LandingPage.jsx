// src/pages/LandingPage.jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ChiefJudge from '../assets/chiefjustice.jpg'
import Chief from '../assets/chief.jpg'
import Justice from '../assets/justice.jpg'
import Navbar from './Navbar';

const LandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { roomId } = useParams(); // Correctly get roomId from URL path

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !roomId) return alert("Missing fields or room ID.");
    // Save user info to sessionStorage to persist across refreshes
    sessionStorage.setItem('chatUser', JSON.stringify({ name, email }));
    navigate(`/chat/${roomId}`);
  };


  return (
    <>
      {/* navbar */}
      <Navbar />

      {/* Main Content */}
      <section
  className="relative bg-cover bg-center h-screen flex items-center justify-end text-white px-4"
  style={{ backgroundImage: `url(${ChiefJudge})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  {/* Content Container */}
  <div className="relative z-10 w-full max-w-4xl text-right">
    <div className="space-y-8">
      {/* Text Content */}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-shadow-lg">
        HONOR, SERVICE, INTEGRITY
        <br />
        <span className="text-2xl md:text-4xl">CHIEF JUSTICE NATHAN HECHT</span>
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row items-center justify-end gap-4"
      >
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-transparent border border-white placeholder-white text-white px-3 py-2 rounded-md w-full lg:w-auto focus:outline-none focus:border-red-500"
        />
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-transparent border border-white placeholder-white text-white px-3 py-2 rounded-md w-full lg:w-auto focus:outline-none focus:border-red-500"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md w-full lg:w-auto font-medium"
        >
          Join Chat
        </button>
      </form>
    </div>
  </div>
</section>


{/* another section */}
<div>
  {/* Justice Section with normal background */}
  <section className="relative bg-[#9C2A34] py-12">
    <h2 className="text-center text-white text-[42px] font-bold mb-12">
      Most Elected Justice in Texas History
    </h2>

    <div className="bg-[#20263E] py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content - Left */}
        <div className="relative pl-10">
          {/* Wine colored vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9C2A34]"></div>
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-relaxed">
            "I am privileged to lead a Court that is respected for its commitment to the rule of law and access to justice for all."
            <br />
            <span className="text-2xl md:text-3xl text-gray-300 font-semibold mt-4 block">
              – Chief Justice Nathan Hecht
            </span>
          </h2>
        </div>

        {/* Image - Right */}
        <div className="flex justify-center md:justify-end">
          <img 
            src={Chief}
            alt="Chief Justice Nathan Hecht"
            className="w-full max-w-md h-[500px] object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </div>

    {/* Navigation Links */}
    <div className="relative bg-transparent text-2xl md:text-3xl font-semibold flex justify-center gap-12 items-center py-8">
      <h2>
        <a
          href="#about"
          className="text-white hover:text-red-300 transition-colors duration-300"
        >
          ABOUT
        </a>
      </h2>
      <h2>
        <a
          href="#contribute"
          className="text-white hover:text-red-300 transition-colors duration-300"
        >
          CONTRIBUTE
        </a>
      </h2>
      <h2>
        <a
          href="#volunteer"
          className="text-white hover:text-red-300 transition-colors duration-300"
        >
          VOLUNTEER
        </a>
      </h2>
    </div>
  </section>

  {/* Parallax Call to Action Section - Fixed background */}
  <section 
    className="relative bg-cover bg-center bg-fixed min-h-screen flex items-center"
    style={{ backgroundImage: `url(${Justice})` }}
  >
    {/* Dark overlay for better text readability */}
    <div className="absolute inset-0 bg-black opacity-50"></div>
    
    {/* Left-aligned content */}
    <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          HECHT YES,
        </h1>
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-200 mb-8">
          I WILL STAND WITH YOU!
        </h3>
        <a
          href="#join"
          className="inline-block text-xl md:text-2xl bg-[#191E31] rounded-xl py-4 px-10 text-white font-bold hover:bg-[#9C2A34] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          JOIN ME
        </a>
      </div>
    </div>
  </section>

  {/* Footer Section */}
  <footer className="bg-[#002855] py-12 px-6">
    <div className="max-w-6xl mx-auto">
      {/* Contact Info */}
      <div className="text-center mb-8">
        <p className="text-white text-lg md:text-xl font-medium">
          (512) 637-8776 | P.O. Box 2012 | Austin, Texas 78768
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center gap-8 md:gap-16 mb-8">
        <p>
          <a 
            href="#home" 
            className="text-white text-lg font-medium hover:text-red-300 transition-colors duration-300"
          >
            Home
          </a>
        </p>
        <p>
          <a 
            href="#meet" 
            className="text-white text-lg font-medium hover:text-red-300 transition-colors duration-300"
          >
            Meet Nathan
          </a>
        </p>
        <p>
          <a 
            href="#volunteer" 
            className="text-white text-lg font-medium hover:text-red-300 transition-colors duration-300"
          >
            Volunteer
          </a>
        </p>
      </div>

      {/* Legal Disclaimer */}
      <div className="border-t border-white/20 pt-6">
        <p className="text-white/80 text-sm md:text-base leading-relaxed text-center max-w-4xl mx-auto">
          Political advertising paid for by Chief Justice Nathan L. Hecht Campaign, in compliance with the voluntary limits of the Judicial Campaign Fairness Act.
        </p>
      </div>
    </div>
  </footer>
</div>

    </>
  );
};

export default LandingPage;
