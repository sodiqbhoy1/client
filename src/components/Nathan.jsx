import React from 'react';
import NathanDp from '../assets/nathan.jpg';
import Navbar from './Navbar';
import Footer from './Footer';

const Nathan = () => {
  return (
    <div className="bg-[#20263E] min-h-screen text-white">
      <Navbar />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Image on the left */}
          <div className="w-full">
            <img
              src={NathanDp}
              alt="Chief Justice Nathan L. Hecht"
              className="w-full h-[90vh] object-cover rounded-xl shadow-2xl"
            />
          </div>

          {/* Text on the right */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 border-b-2 border-red-500 pb-2">
              Meet Chief Justice Nathan L. Hecht
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-gray-300">
              Nathan L. Hecht was elected to the Texas Supreme Court in 1988 and was re-elected in 1994, 2000, 2006, and 2012. He is the senior Texas appellate judge in active service and was appointed Chief Justice in 2013.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-gray-300">
              Since 2010, Chief Justice Hecht has been responsible for the Court’s efforts to assure that the poor have basic legal services. He has diligently worked to secure congressional and legislative support for legal aid to veterans and their families, victims of domestic abuse, and families in jeopardy of losing their homes.
            </p>
          </div>
        </div>
      </main>

      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-900">
            A Career of Distinction
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-x-8 gap-y-12">
            {/* Experienced Judge */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-red-800">EXPERIENCED JUDGE</h3>
              <ul className="mt-4 space-y-2 text-gray-600 list-none">
                <li>Supreme Court liaison for legal services to the poor</li>
                <li>Supreme Court liaison for rules for Texas judicial system</li>
                <li>Senior Justice, Texas Supreme Court (longest serving)</li>
                <li>Justice, 5th District Court of Appeals</li>
                <li>Judge, 95th District Court, Dallas Co.</li>
              </ul>
            </div>

            {/* Distinguished Legal Scholar */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-red-800">DISTINGUISHED LEGAL SCHOLAR</h3>
              <ul className="mt-4 space-y-2 text-gray-600 list-none">
                <li>American Law Institute member</li>
                <li>Yale University, BA (honors in Philosophy)</li>
                <li>SMU Law School, JD (cum laude)</li>
                <li>Law Clerk, US Court of Appeals, Washington, DC</li>
              </ul>
            </div>

            {/* Integrity & Leadership */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-red-800">INTEGRITY & LEADERSHIP</h3>
              <ul className="mt-4 space-y-2 text-gray-600 list-none">
                <li>SMU Law School Distinguished Alumni Award</li>
                <li>Hatton W. Sumners Foundation Distinguished Public Service Award</li>
                <li>Texas Philosophical Society</li>
                <li>Lieutenant, US Naval Reserve, JAG Corps</li>
                <li>President of the National Conference of Chief Justices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* footer section */}
      <Footer/>
    </div>
  );
};

export default Nathan;
