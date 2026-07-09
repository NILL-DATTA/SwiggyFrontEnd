import React from "react";

export default function Categories({ foods }: { foods: string[] }) {
  return (
    <>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-black">
          Order our best food options
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {foods.map((img, i) => {
            // filename theke ekta readable label বের করা (fallback alt/text hishebe)
            const label = img
              .split("/")
              .pop()
              ?.replace(/\.[^/.]+$/, "")
              .replace(/[_-]/g, " ") || "food";

            return (
              <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
                <img
                  src={img}
                  alt={label}
                  className="mx-auto w-40 h-40 object-cover rounded-full bg-gray-100"
                  onError={(e) => {
                    // image na paile placeholder e switch kore dibe, broken icon dekhabe na
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = "/images/placeholder-food.avif"; // ekta generic fallback image public/images e rakhun
                  }}
                />
                <p className="mt-2 text-sm text-gray-700 capitalize">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}