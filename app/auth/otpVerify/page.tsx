import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OtpSchema } from "@/validators/authValidator";

import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { AppDispatch, RootState } from "@/redux/store/store";
import { toast } from "sonner";
import {
  OtpFormData,
  OtpInputData,
  SuccessFunotp,
} from "@/typeScript/auth.type";
import { verifyOtp } from "@/redux/slice/authSlice";

export default function Otpverify({ onSuccess, phone }: SuccessFunotp) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpInputData>({
    resolver: yupResolver(OtpSchema),
  });

  const onSubmit = async (data: OtpInputData) => {
    try {
     

      const userId = String(getCookie("id"));

      const payload: OtpFormData = {
        ...data,
        userId,
        mobile_Number: phone,
      };

      const res = await dispatch(verifyOtp(payload)).unwrap();

   

      onSuccess(payload);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="border border-gray-300 p-4">
          <p className="text-gray-400 text-sm">Phone number</p>
          <p className="text-xl font-semibold text-black">{phone}</p>
        </div>

        <div className="border border-gray-300 p-4">
          <input
            {...register("otp")}
            type="text"
            placeholder={errors.otp?.message || "One time password"}
            className={`w-full outline-none text-lg text-black ${
              errors.otp ? "placeholder-red-400" : "placeholder-black"
            }`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-4 font-bold text-lg"
        >
          {loading ? "VERIFYING..." : "OTP VERIFY"}
        </button>
      </div>
    </form>
  );
}
