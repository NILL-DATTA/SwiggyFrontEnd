"use client";

import Restaurant_content from "@/components/restaurant_page/restaurant_content";
import Restaurant_form from "@/components/restaurant_page/restaurant_form";
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
          <Restaurant_form />
        </div>
      </section>

      {/* TABS */}
      <Restaurant_tabs setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* CONTENT */}
      <Restaurant_content activeTab={activeTab} />
    </div>
  );
}
