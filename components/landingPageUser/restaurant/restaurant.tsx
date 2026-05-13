import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function Restaurant({ restaurant, restaurantRef, scroll }) {
  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            Discover best restaurants
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => scroll(restaurantRef, "left")}
              className="p-2 bg-white shadow rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll(restaurantRef, "right")}
              className="p-2 bg-white shadow rounded-full"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div ref={restaurantRef} className="flex gap-6 overflow-x-auto">
          {restaurant.map((img, i) => (
            <div
              key={i}
              className="min-w-[280px] bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={img}
                alt="restaurant"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  Fast Food • ₹300 for two
                </p>
                <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
