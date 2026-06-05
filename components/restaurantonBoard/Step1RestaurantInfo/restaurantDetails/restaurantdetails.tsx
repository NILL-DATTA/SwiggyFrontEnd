"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";

import BasicDetails from "@/components/restaurantonBoard/Step1RestaurantInfo/basicDetails";
import ContactDetails from "@/components/restaurantonBoard/Step1RestaurantInfo/contactDetails";
import WorkingDays from "@/components/restaurantonBoard/Step1RestaurantInfo/workingDays";

import { RestaurantDetails } from "@/typeScript/restaurant.type";
import { restaurantDetails } from "@/redux/slice/restaurantSlice";
import { restaurantSchema } from "@/validators/restaurantValidator";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function RestaurantPage({ setStep }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RestaurantDetails>({
    resolver: yupResolver(restaurantSchema),
    defaultValues: {
      ownerName: "",
      restaurantName: "",
      location: "",
      email: "",
      phone: "",
      whatsappNumber: "",
      workingDays: [],
      openingClosing: {
        sameForAllDays: true,
        slots: [
          {
            open: "",
            close: "",
          },
        ],
      },
    },
  });

  const workingDays = watch("workingDays");

  const onSubmit = async (data: any) => {
    const payload = {
      ownerName: data.ownerName,
      restaurantName: data.restaurantName,
      location: data.location,
      email: data.email,
      phone: data.phone,
      whatsappNumber: data.whatsappNumber,

      workingDays: data.workingDays.map((d: string) => d.toLowerCase()),

      openingClosing: {
        sameForAllDays: true,
        slots: data.openingClosing.slots,
      },
    };

    try {
      const res = await dispatch(restaurantDetails(payload));

      if (res?.meta?.requestStatus === "fulfilled") {
        setStep(2);
      }
    } catch (error) {
      console.log("API Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-screen bg-[#f5f5f5] p-10">
        <div className="max-w-7xl mx-auto flex gap-10">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Restaurant Information
            </h1>

            {/* Basic Details */}
            <BasicDetails register={register} errors={errors} />

            {/* Contact Details */}
            <ContactDetails
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />

            {/* Working Days */}
            <WorkingDays
              control={control}
              errors={errors}
              setValue={setValue}
              workingDays={workingDays}
              days={days}
            />

            {/* Opening Time */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="font-semibold text-lg mb-5 text-black">
                Opening & Closing Time
              </h2>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <input
                    {...register("openingClosing.slots.0.open")}
                    type="time"
                    className="border rounded-xl px-4 py-3 w-full"
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors?.openingClosing?.slots?.[0]?.open?.message}
                  </p>
                </div>

                <div>
                  <input
                    {...register("openingClosing.slots.0.close")}
                    type="time"
                    className="border rounded-xl px-4 py-3 w-full"
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors?.openingClosing?.slots?.[0]?.close?.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold text-lg transition"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
