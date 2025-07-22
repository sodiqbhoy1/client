import React from 'react'

const Footer = () => {
  return (
    <>
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
            href="/" 
            className="text-white text-lg font-medium hover:text-red-300 transition-colors duration-300"
          >
            Home
          </a>
        </p>
        <p>
          <a 
            href="/meet-nathan" 
            className="text-white text-lg font-medium hover:text-red-300 transition-colors duration-300"
          >
            Meet Nathan
          </a>
        </p>
        <p>
          <a 
            href="/volunteer" 
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
    </>
  )
}

export default Footer
