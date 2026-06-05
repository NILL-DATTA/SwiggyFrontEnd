import React from "react";

export default function Outlet({ register, errors }) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg text-black">
        What's your outlet type?
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        This determines whether you pay GST on the items sold.
      </p>

      <select
        className="w-full border rounded-xl p-3 outline-none text-black"
        {...register("outletType")}
      >
        <option value="">Choose your outlet type</option>
        <option value="Restaurant">Restaurant</option>
        <option value="Cloud Kitchen">Cloud Kitchen</option>
        <option value="Cafe">Cafe</option>
        <option value="Bakery">Bakery</option>
      </select>

      {errors?.outletType && (
        <p className="text-red-500 text-sm mt-2">
          {errors.outletType.message}
        </p>
      )}
    </div>
  );
}