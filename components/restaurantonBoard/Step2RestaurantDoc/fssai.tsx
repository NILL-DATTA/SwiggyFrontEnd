import React from "react";

export default function Fssai({ register, errors }) {
  return (
    <>
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-lg mb-3 text-black">
          FSSAI Certificate
        </h3>

        <div className="text-sm text-gray-600 mb-4">
          <p className="font-medium text-indigo-600 mb-2">Requirements:</p>

          <ul className="list-disc pl-5 space-y-1">
            <li>
              The FSSAI certificate should match the restaurant or owner name.
            </li>
            <li>The address should match the restaurant address.</li>
            <li>The certificate should not expire within 30 days.</li>
          </ul>
        </div>

        <input
          {...register("fssaiNumber")}
          type="text"
          placeholder="FSSAI Certificate Number"
          className="w-full border rounded-xl p-3 text-black outline-none placeholder-black"
        />

        {errors.fssaiNumber && (
          <p className="text-red-500 text-sm mt-2">
            {errors.fssaiNumber.message}
          </p>
        )}
        <p className="text-sm text-gray-500 mt-3">
          FSSAI certificate unavailable/expired?{" "}
          <span className="font-medium cursor-pointer">Click here</span>
        </p>
      </div>
    </>
  );
}
