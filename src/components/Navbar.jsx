import React, { useState } from 'react'
import Logo from '../assets/logo.png';



const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

      const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/meet-nathan', text: 'Meet Nathan' },
    { href: '#', text: 'Volunteer' },
  ];

  return (
    <>
      
        {/* Navbar */}
            <nav className="bg-white text- shadow-lg ">
              <div className="max-w-7xl px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-32">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <a href="#">
                      <img className="h-22 w-auto" src={Logo} alt="Justice Nathan Hecht Logo" />
                    </a>
                  </div>
      
                  {/* Desktop Menu */}
                  <div className="hidden md:flex items-center space-x-4">
                    {navLinks.map((link) => (
                      <a key={link.text} href={link.href} className=" text-[#7C2129]  hover:text-red-500 transition-colors duration-200 text-sm font-bold text-[18px] tracking-wider">
                        {link.text}
                      </a>
                    ))}
                    <a href="#" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md text-sm font-bold uppercase transition-colors duration-200">
                      Donate
                    </a>
                  </div>
      
                  {/* Mobile Menu Button */}
                  <div className="flex md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                      <span className="sr-only">Open main menu</span>
                      <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                      <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
      
              {/* Mobile Menu */}
              <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navLinks.map((link) => (
                    <a key={link.text} href={link.href} className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                      {link.text}
                    </a>
                  ))}
                  <a href="#" className="bg-red-600 hover:bg-red-700 text-white block px-3 py-2 rounded-md text-base font-bold">
                    Donate
                  </a>
                </div>
              </div>
            </nav>
    </>
  )
}

export default Navbar
