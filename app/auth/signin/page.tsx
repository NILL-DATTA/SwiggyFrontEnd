"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { LoginFormData, SuccessFunlogin } from "@/typeScript/auth.type";
import { loginScehma } from "@/validators/authValidator";
import { userSignin } from "@/redux/slice/authSlice";

export default function Login({ onSuccess }: SuccessFunlogin) {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginScehma),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await dispatch(userSignin(data)).unwrap();
      console.log("Login Success:", res);
      onSuccess(data);
    } catch (err: any) {
      console.log("Login Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
