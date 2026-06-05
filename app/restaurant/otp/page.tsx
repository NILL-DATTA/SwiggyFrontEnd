"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import Restaurant_content from "@/components/restaurant_page/restaurant_content";
import Restaurant_tabs from "@/components/restaurant_page/restaurant_tabs";

import { AppDispatch, RootState } from "@/redux/store/store";

import { verifyRestaurantOtp } from "@/redux/slice/restaurantSlice";
import { RestaurantOtpSchema } from "@/validators/restaurantValidator";

type FormValues = {
  otp: string[];
};

export default function SwiggyPartnerUI() {
  const [activeTab, setActiveTab] = useState("delivery");

  const dispatch = useDispatch<AppDispatch>();
  const { phone } = useSelector((state: RootState) => state.restaurant);

  const cleanedPhone = phone?.replaceAll('"', "") ?? "";

  /* ---------------- FORM ---------------- */

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(RestaurantOtpSchema),
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  const otpValues = watch("otp");

  const isOtpComplete =
    otpValues?.length === 6 &&
    otpValues.every(
      (digit) => typeof digit === "string" && digit.trim() !== "",
    );

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (data: FormValues) => {
    const otp = data.otp.join("");

    try {
      await dispatch(
        verifyRestaurantOtp({
          otp,
          phone: cleanedPhone,
        }),
      ).unwrap();
    } catch (err) {
      console.log("OTP ERROR:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-gray-900">
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 mx-auto grid min-h-[620px] max-w-7xl grid-cols-1 items-center gap-14 px-5 py-14 lg:grid-cols-2 lg:px-10">
          {/* LEFT SIDE */}
          <div className="text-white">
            <h1 className="text-5xl font-black">Access Swiggy Tools</h1>
            <p className="mt-4 text-white/80">Grow your restaurant business.</p>
          </div>

          {/* RIGHT OTP BOX */}
          <div className="w-full max-w-[503px] rounded-[28px] bg-white p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-800">Enter OTP</h2>

            <p className="mt-3 text-gray-500">
              OTP sent to {cleanedPhone || "your number"}
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* OTP INPUTS */}
              <div className="mt-8 flex gap-3">
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  const key = index as 0 | 1 | 2 | 3 | 4 | 5;

                  return (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      {...register(`otp.${key}`)}
                      className="h-16 w-16 rounded-2xl border border-gray-300 text-center text-2xl outline-none focus:border-orange-500"
                    />
                  );
                })}
              </div>

              {/* ERROR */}
              {errors.otp && (
                <p className="mt-3 text-sm text-red-500">
                  {errors.otp.message as string}
                </p>
              )}

              {/* RESEND */}
              <button
                type="button"
                className="mt-6 text-lg font-medium text-orange-500 underline"
              >
                Resend OTP
              </button>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={!isOtpComplete || isSubmitting}
                className={`mt-8 w-full rounded-xl py-4 text-xl font-semibold text-white transition ${
                  isOtpComplete
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "cursor-not-allowed bg-gray-300"
                }`}
              >
                {isSubmitting ? "Verifying..." : "Continue"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              By continuing, you agree to Terms & Conditions
            </p>
          </div>
        </div>
      </section>

      {/* TABS */}
      <Restaurant_tabs setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* CONTENT */}
      <Restaurant_content activeTab={activeTab} />
    </div>
  );
}
