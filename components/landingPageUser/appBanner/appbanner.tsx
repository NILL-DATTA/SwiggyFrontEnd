import React from "react";

export default function Appbanner() {
  return (
    <>
      <div className="w-full flex justify-center py-6">
        <div className="w-full max-w-7xl bg-[#0f172a] text-white px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-10 rounded-xl">
          {/* Left Content */}
          <div className="max-w-xl text-center md:text-left">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <div className="bg-orange-500 p-2 rounded-md"></div>
              <span className="text-orange-500 font-bold text-lg">Swiggy</span>
            </div>

            <h2 className="text-xl md:text-3xl font-bold mb-2">
              Get the Swiggy App now!
            </h2>

            <p className="text-gray-300 text-sm md:text-base">
              Best offers and discounts curated for you.
            </p>
          </div>

          {/* Right Side */}
          <div className="relative flex items-center gap-8">
            {/* Phone Mock (shorter height feel) */}
            <div className="bg-gray-200 rounded-[2rem] p-3 w-40 h-72 flex flex-col items-center justify-center shadow-lg">
              <div className="bg-white p-2 rounded-lg">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://swiggy.com"
                  alt="QR Code"
                  className="w-20 h-20"
                />
              </div>

              <p className="text-orange-500 mt-2 font-semibold text-xs">
                Scan to download
              </p>
            </div>

            {/* Floating icons */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
              className="w-10 absolute -left-6 top-4 hidden md:block"
            />

            <img
              src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
              className="w-10 absolute -right-6 bottom-4 hidden md:block"
            />
          </div>
        </div>
      </div>
    </>
  );
}
