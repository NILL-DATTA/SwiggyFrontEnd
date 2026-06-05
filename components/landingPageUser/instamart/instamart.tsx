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
    <div className="p-8 bg-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">
          Shop groceries on Instamart
        </h2>

        <div className="flex gap-3">
          <button
            onClick={() => scroll(instaRef, "left")}
            className="p-2 bg-white shadow rounded-full"
          >
            <ChevronLeft />
          </button>
          
          <button
            onClick={() => scroll(instaRef, "right")}
            className="p-2 bg-white shadow rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div ref={instaRef} className="flex gap-6 overflow-x-auto">
        {instaMart.map((img, i) => (
          <div
            key={i}
            className="min-w-[160px] bg-white rounded-xl p-4 shadow text-center"
          >
            <img
              src={img}
              alt="insta"
              className="mx-auto w-40 h-40 object-cover rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
