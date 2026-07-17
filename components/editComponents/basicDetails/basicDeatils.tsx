"use client";

import { BasicDetailsProps } from "@/typeScript/restaurant.type";

const CATEGORIES = [
    "Biryani",
    "Fast Food",
    "Chinese",
    "Drinks",
    "Veg",
    "Non-Veg"
];

const FOOD_TYPES = [
    "Starter",
    "Main Course",
    "Dessert",
    "Beverage",
];

export default function EditBasicDetails({
    register,
    errors,
}: BasicDetailsProps) {
    const inputClass =
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20";

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-[16px] font-semibold text-gray-900 mb-5">
                Item Details
            </h2>

            <div className="space-y-5">
                {/* Item Name */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Item Name
                    </label>

                    <input
                        {...register("itemName")}
                        className={inputClass}
                        placeholder="Chicken Biryani"
                    />

                    <p className="mt-1 text-xs text-red-500">
                        {errors.itemName?.message}
                    </p>
                </div>

                {/* Description */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Description
                    </label>

                    <textarea
                        rows={4}
                        {...register("description")}
                        className={`${inputClass} resize-none`}
                        placeholder="Write about your food..."
                    />

                    <p className="mt-1 text-xs text-red-500">
                        {errors.description?.message}
                    </p>
                </div>

                {/* Food Type + Category */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Food Type
                        </label>

                        <select
                            {...register("foodType")}
                            className={inputClass}
                        >
                            <option value="">Select</option>

                            {FOOD_TYPES.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <p className="mt-1 text-xs text-red-500">
                            {errors.foodType?.message}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Category
                        </label>

                        <select
                            {...register("category")}
                            className={inputClass}
                        >
                            <option value="">Select</option>

                            {CATEGORIES.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <p className="mt-1 text-xs text-red-500">
                            {errors.category?.message}
                        </p>
                    </div>
                </div>

                {/* Cuisine */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Cuisine
                    </label>

                    <input
                        {...register("cuisine")}
                        className={inputClass}
                        placeholder="Indian"
                    />

                    <p className="mt-1 text-xs text-red-500">
                        {errors.cuisine?.message}
                    </p>
                </div>

                {/* Prices */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Base Price
                        </label>

                        <input
                            type="number"
                            {...register("basePrice")}
                            className={inputClass}
                        />

                        <p className="mt-1 text-xs text-red-500">
                            {errors.basePrice?.message}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Discount Price
                        </label>

                        <input
                            type="number"
                            {...register("discountPrice")}
                            className={inputClass}
                        />

                        <p className="mt-1 text-xs text-red-500">
                            {errors.discountPrice?.message}
                        </p>
                    </div>
                </div>

                {/* Discount + GST + Time */}
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Discount %
                        </label>

                        <input
                            type="number"
                            {...register("discountPercentage")}
                            className={inputClass}
                        />

                        <p className="mt-1 text-xs text-red-500">
                            {errors.discountPercentage?.message}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            GST %
                        </label>

                        <input
                            type="number"
                            {...register("gst")}
                            className={inputClass}
                        />

                        <p className="mt-1 text-xs text-red-500">
                            {errors.gst?.message}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Preparation Time
                        </label>

                        <input
                            type="number"
                            {...register("preparationTime")}
                            className={inputClass}
                        />

                        <p className="mt-1 text-xs text-red-500">
                            {errors.preparationTime?.message}
                        </p>
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="flex flex-wrap gap-6 pt-2">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            {...register("isVeg")}
                        />
                        Veg
                    </label>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            {...register("isAvailable")}
                        />
                        Available
                    </label>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            {...register("isRecommended")}
                        />
                        Recommended
                    </label>
                </div>
            </div>
        </div>
    );
}