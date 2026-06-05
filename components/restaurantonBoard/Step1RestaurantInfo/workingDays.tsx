import { workingDaysProp } from "@/typeScript/restaurant.type";
import React from "react";
import { Controller } from "react-hook-form";

export default function WorkingDays({
  control,
  errors,
  setValue,
  workingDays,
  days,
}: workingDaysProp) {
  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg text-black">Working Days</h2>

          <button
            type="button"
            className="text-orange-500 font-medium"
            onClick={() => setValue("workingDays", days)}
          >
            Select all
          </button>
        </div>

        <Controller
          control={control}
          name="workingDays"
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-y-4">
              {days.map((day) => (
                <label
                  key={day}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={workingDays.includes(day)}
                    onChange={() => {
                      const updated = field.value.includes(day)
                        ? field.value.filter((d: string) => d !== day)
                        : [...field.value, day];

                      field.onChange(updated);
                    }}
                  />

                  <span className="text-black">{day}</span>
                </label>
              ))}
            </div>
          )}
        />

        <p className="text-red-500 text-sm mt-2">
          {errors.workingDays?.message}
        </p>
      </div>
    </>
  );
}
