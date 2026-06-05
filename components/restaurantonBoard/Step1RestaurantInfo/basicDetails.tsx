import { basicDeatilsProps } from "@/typeScript/restaurant.type";

export default function BasicDetails({ register, errors }: basicDeatilsProps) {
  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="font-semibold text-lg mb-5 text-black">Basic Details</h2>

        <div className="space-y-4">
          <div>
            <input
              {...register("ownerName")}
              type="text"
              placeholder="Owner's Full Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none placeholder-black text-black"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.ownerName?.message}
            </p>
          </div>

          <div>
            <input
              {...register("restaurantName")}
              type="text"
              placeholder="Restaurant Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none placeholder-black text-black"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.restaurantName?.message}
            </p>
          </div>

          <div>
            <div className="w-full border border-gray-300 rounded-xl flex items-center justify-between pr-4">
              <input
                {...register("location")}
                type="text"
                placeholder="Restaurant Address"
                className="w-full px-4 py-3 outline-none placeholder-black text-black rounded-l-xl"
              />

              <button
                type="button"
                className="text-orange-500 font-medium whitespace-nowrap pl-2"
              >
                Edit
              </button>
            </div>

            <p className="text-red-500 text-sm mt-1">
              {errors.location?.message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
