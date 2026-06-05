"use client";

import { useState } from "react";
import SideBar from "@/components/restaurantonBoard/sideBar";
import RestaurantPage from "@/components/restaurantonBoard/Step1RestaurantInfo/restaurantDetails/restaurantdetails";
import Step2RestaurantDocuments from "@/components/restaurantonBoard/Step2RestaurantDoc/restaurantDoc/Step2RestaurantDocuments";
import MenuSetupForm from "@/components/restaurantonBoard/Step3RestaurantMenu/menu/menu";

export default function Restaurant() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-10">
      <div className="max-w-7xl mx-auto flex gap-10">
        {/* Sidebar (fixed for all steps) */}
        <SideBar step={step} />

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {step === 1 && <RestaurantPage setStep={nextStep} />}

          {step === 2 && (
            <Step2RestaurantDocuments nextStep={nextStep} prevStep={prevStep} />
          )}

          {step === 3 && (
            <MenuSetupForm nextStep={nextStep} prevStep={prevStep} />
          )}
        </div>
      </div>
    </div>
  );
}
