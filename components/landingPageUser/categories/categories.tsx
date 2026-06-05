import React from "react";

export default function Categories({ foods }: { foods: string[] }) {
  return (
    <>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-black">
          Order our best food options
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {foods.map((img, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
              <img
                src={img}
                alt="food"
                className="mx-auto w-40 h-40 object-cover rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
