"use client";

import Restaurant_content from "@/components/restaurant_page/restaurant_content";
import Restaurant_tabs from "@/components/restaurant_page/restaurant_tabs";
import { useState } from "react";

export default function SwiggyPartnerUI() {
  const [activeTab, setActiveTab] = useState("delivery");

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
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 mx-auto grid min-h-[620px] max-w-7xl grid-cols-1 items-center gap-14 px-5 py-14 lg:grid-cols-2 lg:px-10">
          {/* LEFT CONTENT */}
          <div className="text-white">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-lg font-bold backdrop-blur-sm">
                S
              </div>

              <span className="text-sm uppercase tracking-[0.25em] text-white/80">
                Partner with Swiggy
              </span>
            </div>

            <div className="mb-6 h-1 w-16 rounded-full bg-orange-500" />

            <h1 className="max-w-xl text-4xl font-black leading-tight lg:text-6xl">
              Access to Swiggy tools and support
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/80">
              Grow your restaurant business with India’s leading food delivery
              and dineout platform.
            </p>
          </div>

          {/* RIGHT FORM */}

          <div className="w-[503px] rounded-[28px] bg-white p-8 shadow-2xl">
            <h2 className="text-4xl font-bold text-slate-800">Enter OTP</h2>

            <p className="mt-4 text-gray-500">
              Enter OTP sent on number XXXXX5658
            </p>

            <div className="mt-8 flex gap-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <input
                  key={item}
                  type="text"
                  maxLength={1}
                  className="h-16 w-16 rounded-2xl border border-gray-300 text-center text-2xl outline-none transition focus:border-orange-500"
                />
              ))}
            </div>

            <button className="mt-6 text-lg font-medium text-orange-500 underline underline-offset-4">
              Resend OTP
            </button>

            <button className="mt-8 w-full rounded-xl bg-gray-300 py-4 text-xl font-semibold text-white">
              Continue
            </button>

            <p className="mt-8 text-center text-sm text-gray-500">
              By logging in, I agree to Swiggy’s{" "}
              <span className="font-semibold text-slate-700 underline">
                terms & conditions
              </span>
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
