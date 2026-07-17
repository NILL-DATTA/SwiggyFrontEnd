"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import Restaurant_content from "@/components/restaurant_page/restaurant_content";
import Restaurant_tabs from "@/components/restaurant_page/restaurant_tabs";

import { AppDispatch, RootState } from "@/redux/store/store";
import { verifyRestaurantOtp } from "@/redux/slice/restaurantSlice";
import { RestaurantOtpSchema } from "@/validators/restaurantValidator";
import { getCookie } from "cookies-next";

type FormValues = {
  otp: [string, string, string, string, string, string];
};

export default function SwiggyPartnerUI() {
  const [activeTab, setActiveTab] = useState("delivery");

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const email = getCookie("email")
  const { loading } = useSelector(
    (state: RootState) => state.restaurant
  );



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
          email,
          otp: data.otp.join(""),
        })
      ).unwrap();

      router.push("/restaurant/restaurantOnboarding");
    } catch (error) {
      console.error(error);
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
          {/* Left */}
          <div className="text-white">
            <h1 className="text-5xl font-bold">
              Access Swiggy Partner Dashboard
            </h1>

            <p className="mt-4 text-lg text-white/80">
              Enter the verification code sent to your email.
            </p>
          </div>

          {/* Right */}
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-3xl font-bold">
              Verify Email
            </h2>

            <p className="mt-2 text-gray-500">
              OTP sent to{" "}
              <span className="font-semibold text-black">
                {email}
              </span>
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8 flex justify-between gap-3">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    autoComplete="off"
                    className="h-16 w-16 rounded-xl border text-center text-2xl outline-none transition-all focus:border-orange-500"
                    {...register(`otp.${index}`)}
                    ref={(el) => {
                      register(`otp.${index}`).ref(el);
                      inputRefs.current[index] = el;
                    }}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      setValue(`otp.${index}`, value, {
                        shouldValidate: true,
                        shouldDirty: true,
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
                <p className="mt-3 text-sm text-red-500">
                  {String(errors.otp.message)}
                </p>
              )}

              <button
                type="button"
                className="mt-6 text-sm font-medium text-orange-500 hover:underline"
              >
                Resend OTP
              </button>

              <button
                type="submit"
                disabled={
                  !isOtpComplete || isSubmitting || loading
                }
                className={`mt-8 w-full rounded-xl py-4 text-lg font-semibold text-white transition-all ${isOtpComplete
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "cursor-not-allowed bg-gray-300"
                  }`}
              >
                {isSubmitting || loading
                  ? "Verifying..."
                  : "Continue"}
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