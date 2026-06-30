"use client";

import React from "react";
import { CheckCircle2, Clock } from "lucide-react";

interface Props {
  step: number;
  completedSteps: number[];
}

export default function StepSidebar({ step, completedSteps }: Props) {
  const steps = [
    "Restaurant Information",
    "Restaurant Documents",
    "Partner Contract",
  ];

  return (
    <aside className="w-72 border-r border-black/5 bg-white p-5">
      <h2 className="mb-6 text-lg font-semibold text-gray-800">
        Registration Steps
      </h2>

      <div className="space-y-4">
        {steps.map((label, index) => {
          const currentStep = index + 1;

          const isCompleted =
            completedSteps.includes(currentStep) || currentStep < step;

          const isActive = step === currentStep && !isCompleted;

          return (
            <div key={index} className="flex items-start gap-3">
              {/* icon */}
              <div
                className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full
                ${
                  isCompleted
                    ? "bg-green-100 text-green-600"
                    : isActive
                    ? "bg-orange-100 text-[#FC8019]"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : isActive ? (
                  <Clock className="h-4 w-4" />
                ) : (
                  <span className="text-xs">{currentStep}</span>
                )}
              </div>

              {/* text */}
              <div>
                <p className="text-sm font-medium text-gray-800">
                  STEP {currentStep}
                </p>

                <p className="text-sm text-gray-500">{label}</p>

                <p
                  className={`mt-1 text-xs font-medium ${
                    isCompleted
                      ? "text-green-600"
                      : isActive
                      ? "text-[#FC8019]"
                      : "text-gray-400"
                  }`}
                >
                  {isCompleted
                    ? "Completed"
                    : isActive
                    ? "In Progress"
                    : "Pending"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}