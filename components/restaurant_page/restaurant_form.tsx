import { userApplyRestaurant } from "@/redux/slice/authSlice";
import { AppDispatch } from "@/redux/store/store";
import { applyRestaurantScehma } from "@/validators/authValidator";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function Restaurant_form() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(applyRestaurantScehma),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await dispatch(userApplyRestaurant(data)).unwrap();

      console.log(res, "resRegister");

      const payload = res?.data?.id;

      if (payload) {
      }

      toast.success(res?.message || "Register successful");

      console.log("Signup success:", res);
    } catch (err: any) {
      console.log("Login Error:", err);

      // axios error
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Server error occurred");
      }

      // redux thunk rejectWithValue error
      else if (err?.message) {
        toast.error(err.message);
      }

      // string error
      else if (typeof err === "string") {
        toast.error(err);
      }

      // fallback
      else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-md rounded-[32px] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
      >
        <h2 className="text-3xl font-bold text-gray-900">Get Started</h2>

        <p className="mt-2 text-sm text-gray-500">
          Fill in your restaurant details to continue.
        </p>

        <div className="mt-7 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="h-13 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
            />
            <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Mobile Number / Restaurant ID
            </label>

            <input
              {...register("phone")}
              type="text"
              placeholder="Enter mobile number"
              className="h-13 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
            />
            <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Restaurant Address
            </label>

            <input
              {...register("address")}
              type="text"
              placeholder="Enter address"
              className="h-13 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.address?.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              City
            </label>

            <input
              {...register("city")}
              type="text"
              placeholder="Enter city"
              className="h-13 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
            />
            <p className="text-red-500 text-sm mt-1">{errors.city?.message}</p>
          </div>

          <button className="mt-2 h-13 w-full rounded-2xl bg-orange-500 text-base font-semibold text-white transition hover:bg-orange-600">
            {loading ? "Continue......" : "Continue"}
          </button>
        </div>

        <p className="mt-5 text-center text-xs leading-6 text-gray-500">
          By continuing, you agree to Swiggy’s{" "}
          <span className="cursor-pointer font-semibold text-gray-900 underline">
            Terms & Conditions
          </span>
        </p>
      </form>
    </>
  );
}
