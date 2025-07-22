
import ChiefJudge from '../assets/chiefjustice.jpg'
import Chief from '../assets/chief.jpg'
import Justice from '../assets/justice.jpg'
import Navbar from './Navbar';
import Footer from './Footer';

const HomePage = () => {
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
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight uppercase text-shadow-lg">
        HONOR, SERVICE, INTEGRITY
        <br />
        <span className="text-xl sm:text-2xl md:text-4xl">CHIEF JUSTICE NATHAN HECHT</span>
      </h2>

      
    </div>
  </div>
</section>


{/* another section */}
<div>
  {/* Justice Section with normal background */}
  <section className="relative bg-[#9C2A34] py-8 sm:py-12">
    <h2 className="text-center text-white text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 px-4">
      Most Elected Justice in Texas History
    </h2>

    <div className="bg-[#20263E] py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content - Left */}
        <div className="relative pl-6 sm:pl-10">
          {/* Wine colored vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#9C2A34]"></div>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed">
            "I am privileged to lead a Court that is respected for its commitment to the rule of law and access to justice for all."
            <br />
            <span className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-semibold mt-4 block">
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
    <div className="relative bg-transparent text-xl sm:text-2xl md:text-3xl font-semibold flex flex-wrap justify-center gap-6 sm:gap-12 items-center py-8 px-4">
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
          href="/volunteer"
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
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          HECHT YES,
        </h1>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-200 mb-6 sm:mb-8">
          I WILL STAND WITH YOU!
        </h3>
        <a
          href="#join"
          className="inline-block text-lg sm:text-xl md:text-2xl bg-[#191E31] rounded-xl py-3 px-8 sm:py-4 sm:px-10 text-white font-bold hover:bg-[#9C2A34] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          JOIN ME
        </a>
      </div>
    </div>
  </section>

{/* footer section */}
<Footer/>
 
</div>

    </>
  )
}

export default HomePage
