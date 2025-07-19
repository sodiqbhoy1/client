import React from 'react';
import NathanDp from '../assets/nathan.jpg';
import Navbar from './Navbar';

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
          <div className=" font-bold leading-relaxed text-gray-100">
            <p className="text-[32px] ">
              Nathan L. Hecht was elected to the Texas Supreme Court in 1988 and was re-elected in 1994, 2000, 2006, and 2012. He is the senior Texas appellate judge in active service and was appointed Chief Justice in 2013.
            </p>

            <p className="text-[32px] ">
              Since 2010, Chief Justice Hecht has been responsible for the Court’s efforts to assure that the poor have basic legal services. He has diligently worked to secure congressional and legislative support for legal aid to veterans and their families, victims of domestic abuse, and families in jeopardy of losing their homes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Nathan;
