import { ChevronDown } from "lucide-react";
import { useState } from "react";

/* ---------------- City Section Component ---------------- */
export function CitySection({ title, type }) {
  const [showAll, setShowAll] = useState(false);

  const cities = [
    "Bangalore",
    "Gurgaon",
    "Hyderabad",
    "Delhi",
    "Mumbai",
    "Pune",
    "Kolkata",
    "Chennai",
    "Ahmedabad",
    "Chandigarh",
    "Jaipur",
    "Lucknow",
    "Indore",
    "Surat",
  ];

  const visible = showAll ? cities : cities.slice(0, 11);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {visible.map((city, i) => (
          <div
            key={i}
            className="border border-gray-200 bg-white rounded-2xl px-5 py-3 text-sm font-medium text-gray-800 hover:shadow-md cursor-pointer text-center"
          >
            Order {type} {city}
          </div>
        ))}

        {/* Show More */}
        <div
          onClick={() => setShowAll(!showAll)}
          className="border border-gray-200 bg-white rounded-2xl px-5 py-3 text-sm font-semibold text-orange-500 flex items-center justify-center gap-2 cursor-pointer"
        >
          {showAll ? "Show Less" : "Show More"}
          <ChevronDown
            className={`transition ${showAll ? "rotate-180" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}
