import React from "react";

export default function Restaurant_tabs({ setActiveTab, activeTab }) {
  return (
    <>
      <div className="relative z-20 -mt-8 flex justify-center px-4">
        <div className="flex w-full max-w-xl rounded-full bg-white p-1.5 shadow-xl">
          <button
            onClick={() => setActiveTab("delivery")}
            className={`flex-1 rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
              activeTab === "delivery"
                ? "bg-black text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Food Delivery
          </button>

          <button
            onClick={() => setActiveTab("dineout")}
            className={`flex-1 rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
              activeTab === "dineout"
                ? "bg-black text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Dineout
          </button>
        </div>
      </div>
    </>
  );
}
