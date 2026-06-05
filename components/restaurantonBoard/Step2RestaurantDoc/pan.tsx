import React from "react";

export default function Pan({ register, errors }) {
  return (
    <>
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-lg mb-4 text-black">
          Enter PAN & GSTIN details
        </h3>

        <div className="space-y-4">
          <input
            {...register("pan")}
            type="text"
            placeholder="Business/Owner PAN"
            className="w-full border rounded-xl p-3 outline-none text-black placeholder-black"
          />

          {errors.pan && (
            <p className="text-red-500 text-sm mt-2">{errors.pan.message}</p>
          )}

          <input
            {...register("gstin")}
            type="text"
            placeholder="GSTIN"
            className="w-full border rounded-xl p-3 text-black outline-none placeholder-black"
          />
          {errors.gstin && (
            <p className="text-red-500 text-sm mt-2">{errors.gstin.message}</p>
          )}
        </div>
      </div>
    </>
  );
}
