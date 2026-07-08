"use client";
import Otpverify from "@/app/auth/otpVerify/page";
import Login from "@/app/auth/signin/page";
import RegisterPage from "@/app/auth/signup/page";
import { RootState } from "@/redux/store/store";
import { OtpFormData, RegisterFormData } from "@/typeScript/auth.type";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// SSR HTML
// VS
// Client Initial HTML

//compare if its not same Hydration failed
export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const { token, role, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  console.log(token, "token");
  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-orange-500 text-white">
        <h1 className="text-2xl font-bold">Swiggy</h1>

        <div className="flex gap-6 items-center">
          <p>Swiggy Corporate</p>
          <Link href='/restaurant'><p>Partner with us</p></Link>

          <button className="border px-4 py-2 rounded-lg">Get the App</button>

          <div>
            {token ? (
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold uppercase">
                  {user?.name?.charAt(0)}
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-white-400">Welcome back</span>

                  <h1 className="text-sm font-semibold text-white capitalize">
                    {user?.name}
                  </h1>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setOpen(true);
                  setIsLogin(true);
                  setShowOtp(false);
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition-all duration-300 px-5 py-2.5 rounded-xl text-white font-medium shadow-lg hover:shadow-orange-500/30"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            onClick={() => {
              setOpen(false);
              setShowOtp(false);
              setPhone("");
            }}
            className="absolute inset-0 bg-black/50"
          />

          {/* Drawer */}
          <div className="ml-auto w-full max-w-md h-full bg-white relative z-50 p-8 pt-16 flex flex-col">
            {/* Close */}
            <button
              onClick={() => {
                setOpen(false);
                setShowOtp(false);
                setPhone("");
              }}
              className="absolute top-6 left-6 text-2xl text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold text-black">
                  {showOtp ? "Verify OTP" : isLogin ? "Login" : "Sign up"}
                </h2>

                {!showOtp && (
                  <p className="mt-2 text-gray-600">
                    or{" "}
                    <span
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-orange-500 font-semibold cursor-pointer"
                    >
                      {isLogin ? "create an account" : "login to your account"}
                    </span>
                  </p>
                )}

                <div className="w-10 h-[3px] bg-black mt-4"></div>
              </div>

              <img
                src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                alt="food"
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* OTP SCREEN */}
            {showOtp ? (
              <Otpverify
                onSuccess={(data: OtpFormData) => {
                  setPhone(data.mobile_Number);
                  setShowOtp(false);
                  setIsLogin(true);
                }}
                phone={phone}
              />
            ) : (
              <>
                {/* Register Form */}
                {!isLogin && (
                  <RegisterPage
                    onSuccess={(data: RegisterFormData) => {
                      setPhone(data.mobile_Number);
                      setShowOtp(true);
                    }}
                  />
                )}

                {isLogin && (
                  <Login
                    onSuccess={() => {
                      // setShowOtp(true);
                    }}
                  />
                )}

                {/* Terms */}
                <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                  By clicking on {isLogin ? "Login" : "Sign up"}, I accept the{" "}
                  <span className="font-semibold text-black">
                    Terms & Conditions
                  </span>{" "}
                  &{" "}
                  <span className="font-semibold text-black">
                    Privacy Policy
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
