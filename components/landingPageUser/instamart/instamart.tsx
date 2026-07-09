import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type Props = {
  instaMart: string[];
  instaRef: React.RefObject<HTMLDivElement | null>;
  scroll: (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => void;
};

export default function Instamart({ instaMart, instaRef, scroll }: Props) {
  return (
    <div className="w-full px-4 py-8 md:px-8 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
          Shop groceries on Instamart
        </h2>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll(instaRef, "left")}
            className="p-2 bg-white hover:bg-gray-100 text-gray-700 shadow-sm border border-gray-200 rounded-full transition-all active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scroll(instaRef, "right")}
            className="p-2 bg-white hover:bg-gray-100 text-gray-700 shadow-sm border border-gray-200 rounded-full transition-all active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="max-w-7xl mx-auto overflow-hidden relative">
        <div
          ref={instaRef}
          className="flex flex-nowrap gap-4 md:gap-6 overflow-x-auto scroll-smooth no-scrollbar py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {instaMart.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-36 h-36 md:w-44 md:h-44 bg-white rounded-full p-2 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex items-center justify-center cursor-pointer"
            >
              <img
                src={img}
                alt={`Instamart item ${i + 1}`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}