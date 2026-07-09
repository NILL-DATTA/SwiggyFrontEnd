import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React from "react";

type RestaurantProps = {
  restaurant: string[];
  restaurantRef: React.RefObject<HTMLDivElement | null>;
  scroll: (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => void;
};

export default function Restaurant({ restaurant, restaurantRef, scroll }: RestaurantProps) {
  return (
    <div className="w-full px-4 py-8 md:px-8 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
          Top restaurant chains in your area
        </h2>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll(restaurantRef, "left")}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-all active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll(restaurantRef, "right")}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-all active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div
          ref={restaurantRef}
          className="flex flex-nowrap gap-6 overflow-x-auto scroll-smooth no-scrollbar py-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {restaurant.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[260px] md:w-[300px] bg-white rounded-2xl overflow-hidden cursor-pointer group"
            >
              {/* Image Container with Hover Zoom effect */}
              <div className="relative w-full h-44 md:h-48 overflow-hidden rounded-2xl shadow-sm">
                <img
                  src={img}
                  alt={`Restaurant ${i + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                {/* Gradient Overlay for a premium look */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Dynamic Price/Offer Tag on Image */}
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 px-2 py-1 rounded">
                  ₹100 OFF
                </span>
              </div>

              {/* Restaurant Details */}
              <div className="pt-3 px-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-orange-500 transition-colors">
                    Spice Symphony {i + 1}
                  </h3>
                  <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                    <span>4.2</span>
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>

                <p className="text-sm text-gray-500 font-medium line-clamp-1">
                  Fast Food • North Indian • Desserts
                </p>
                
                <div className="flex justify-between items-center mt-2 text-xs font-semibold text-gray-600">
                  <p>₹300 for two</p>
                  <p className="text-gray-400">•</p>
                  <p className="text-orange-600">25-30 mins</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}