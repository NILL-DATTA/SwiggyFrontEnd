import { contactDetailsProp } from "@/typeScript/restaurant.type";

export default function ContactDetails({
  register,
  errors,
  watch,
  setValue,
}: contactDetailsProp) {
  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="font-semibold text-lg text-black">
          Owner Contact Details
        </h2>

        <p className="text-sm text-gray-400 mb-5">
          To get updates on payments, customer complaints, order acceptance, etc
        </p>

        <div className="space-y-4">
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-xl px-4 py-3 outline-none placeholder-black text-black"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <input
              {...register("phone")}
              type="text"
              placeholder="Mobile Number"
              className="w-full border rounded-xl px-4 py-3 outline-none placeholder-black text-black"
            />
            <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <input
              {...register("whatsappNumber")}
              type="text"
              placeholder="WhatsApp Number"
              className="w-full border rounded-xl px-4 py-3 outline-none placeholder-black text-black"
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.whatsappNumber?.message}
            </p>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setValue("whatsappNumber", watch("phone"));
                }
              }}
            />

            <span className="text-black">
              My WhatsApp number is same as above
            </span>
          </label>
        </div>
      </div>
    </>
  );
}
