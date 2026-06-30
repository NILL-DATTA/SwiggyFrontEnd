"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import Restaurant_content from "@/components/restaurant_page/restaurant_content";
import Restaurant_tabs from "@/components/restaurant_page/restaurant_tabs";

import { AppDispatch, RootState } from "@/redux/store/store";
import { verifyRestaurantOtp } from "@/redux/slice/restaurantSlice";
import { RestaurantOtpSchema } from "@/validators/restaurantValidator";

type FormValues = {
  otp: [string, string, string, string, string, string];
};

export default function SwiggyPartnerUI() {
  const [activeTab, setActiveTab] = useState("delivery");

  const dispatch = useDispatch<AppDispatch>();

  const { phone } = useSelector(
    (state: RootState) => state.restaurant
  );

  const cleanedPhone = phone?.replaceAll('"', "") ?? "";

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(RestaurantOtpSchema),
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
    mode: "onChange",
  });

  const otp = watch("otp");

  const isOtpComplete =
    otp.join("").length === 6 &&
    otp.every((item) => item.trim() !== "");

  const onSubmit = async (data: FormValues) => {
    try {
      await dispatch(
        verifyRestaurantOtp({
          phone: cleanedPhone,
          otp: data.otp.join(""),
        })
      ).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto grid min-h-[620px] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
          <div className="text-white">
            <h1 className="text-5xl font-bold">
              Access Swiggy Tools
            </h1>

            <p className="mt-4 text-lg text-white/80">
              Grow your restaurant business.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-3xl font-bold">
              Enter OTP
            </h2>

            <p className="mt-2 text-gray-500">
              OTP sent to {cleanedPhone}
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8 flex gap-3">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="h-16 w-16 rounded-xl border text-center text-2xl focus:border-orange-500 focus:outline-none"
                    {...register(`otp.${index}`)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      setValue(`otp.${index}`, value, {
                        shouldValidate: true,
                      });

                      if (value && index < 5) {
                        inputRefs.current[index + 1]?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        !otp[index] &&
                        index > 0
                      ) {
                        inputRefs.current[index - 1]?.focus();
                      }
                    }}
                  />
                ))}
              </div>

              {errors.otp && (
                <p className="mt-3 text-red-500">
                  {String(errors.otp.message)}
                </p>
              )}

              <button
                type="button"
                className="mt-6 text-orange-500 underline"
              >
                Resend OTP
              </button>

              <button
                type="submit"
                disabled={!isOtpComplete || isSubmitting}
                className={`mt-8 w-full rounded-xl py-4 text-lg font-semibold text-white ${
                  isOtpComplete
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "cursor-not-allowed bg-gray-300"
                }`}
              >
                {isSubmitting ? "Verifying..." : "Continue"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Restaurant_tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <Restaurant_content activeTab={activeTab} />
    </div>
  );
}