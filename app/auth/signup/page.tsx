"use client";
import { userSignup } from "@/redux/slice/authSlice";
import { Registerschema } from "@/validators/authValidator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store/store";
import { RegisterFormData, SuccessFun } from "@/typeScript/auth.type";

export default function RegisterPage({ onSuccess }: SuccessFun) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(Registerschema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await dispatch(userSignup(data)).unwrap();

      console.log("Login Success:", res);
      onSuccess(data);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="border p-4 rounded">
        <input
          {...register("full_name")}
          type="text"
          placeholder="Name"
          className="w-full outline-none text-lg placeholder-black text-black"
        />

        <p className="text-red-500 text-sm mt-1">{errors.full_name?.message}</p>
      </div>

      {/* Email */}
      <div className="border p-4 rounded">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full outline-none text-lg placeholder-black text-black"
        />

        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
      </div>

      {/* Address */}
      <div className="border p-4 rounded">
        <input
          {...register("address")}
          type="text"
          placeholder="Address"
          className="w-full outline-none text-lg placeholder-black text-black"
        />

        <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
      </div>

      {/* Mobile */}
      <div className="border p-4 rounded">
        <input
          {...register("mobile_Number")}
          type="text"
          placeholder="Mobile"
          className="w-full outline-none text-lg placeholder-black text-black"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.mobile_Number?.message}
        </p>
      </div>

      {/* Password */}
      <div className="border p-4 rounded">
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full outline-none text-lg placeholder-black text-black"
        />

        <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
      </div>

      {/* Confirm Password */}
      <div className="border p-4 rounded">
        <input
          {...register("confirm_password")}
          type="password"
          placeholder="Confirm Password"
          className="w-full outline-none text-lg placeholder-black text-black"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.confirm_password?.message}
        </p>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 font-bold text-lg transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Continue"}
      </button>
    </form>
  );
}
