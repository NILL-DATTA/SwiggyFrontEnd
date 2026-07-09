"use client";

import { useState } from "react";
import AddDish from "@/components/addDish_form/addDish";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { foodSchema } from "@/validators/addDishValidator";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addMenu } from "@/redux/slice/restaurantSlice";
import { getCookie } from "cookies-next";
import Link from "next/link";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
`;

export default function CreateFoodPage() {
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const restaurantId = getCookie("restaurant_id");

    console.log(restaurantId, "restaurantId");

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(foodSchema),
        defaultValues: {
            itemName: "",
            description: "",
            foodType: "Starter",
            category: "Biryani",
            cuisine: "Indian",
            basePrice: 0,
            discountPrice: null,
            gst: 5,
            preparationTime: 10,
            isAvailable: true,
            isRecommended: false,
            isVeg: true,
        },
    });

    const onSubmit = async (data: any) => {
        console.log("Click Submitted");

        const formData = new FormData();
        formData.append("itemName", data.itemName);
        formData.append("description", data.description);
        formData.append("foodType", data.foodType);
        formData.append("category", data.category);
        formData.append("cuisine", data.cuisine);
        formData.append("basePrice", data.basePrice.toString());

        if (data.discountPrice) {
            formData.append("discountPrice", data.discountPrice.toString());
        }

        formData.append("gst", data.gst.toString());
        formData.append("preparationTime", data.preparationTime.toString());
        formData.append("isAvailable", String(data.isAvailable));
        formData.append("isRecommended", String(data.isRecommended));
        formData.append("isVeg", String(data.isVeg));

        if (data.image?.[0]) {
            formData.append("image", data.image[0]);
        }

        try {
            await dispatch(addMenu(formData)).unwrap();
            setSuccess(true);
            reset();
            console.log("Food added successfully");

            setTimeout(() => setSuccess(false), 4000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF9F2] text-[#1F2421] pb-16" style={{ fontFamily: "'Inter', sans-serif" }}>
            <style>{FONTS}</style>

            <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Back Link & Header Strip */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Link
                            href="/dashboard/menu"
                            className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-[#FF5C39] transition-colors mb-2"
                        >
                            ← Back to Menu Items
                        </Link>
                        <h1
                            className="text-2xl sm:text-3xl font-bold text-[#1F2421]"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Create New Dish
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">Add a fresh culinary delight to your restaurant's digital menu.</p>
                    </div>

                    {/* Form Action Button Header */}
                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            form="add-food-form"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto rounded-full bg-[#FF5C39] hover:bg-[#FF6E4E] text-white px-6 py-2.5 text-sm font-semibold shadow-sm transition-all disabled:bg-gray-300 disabled:cursor-not-allowed text-center"
                        >
                            {isSubmitting ? "Publishing..." : "Publish Dish"}
                        </button>
                    </div>
                </div>

                {/* Toast Success Alert */}
                {success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium flex items-center justify-between shadow-sm animate-fadeIn">
                        <div className="flex items-center gap-2">
                            <span>🟢</span>
                            <span>Awesome! Your new dish has been added successfully to the live menu catalog.</span>
                        </div>
                        <button
                            onClick={() => setSuccess(false)}
                            className="text-green-600 hover:text-green-800 font-bold ml-4 text-xs"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Form Card Container */}
                <div className="bg-white rounded-2xl border border-[#1F2421]/8 p-6 sm:p-8 shadow-sm">
                    <AddDish
                        register={register}
                        handleSubmit={handleSubmit(onSubmit, (errors) => {
                            console.log("Validation Errors:", errors);
                        })}
                        errors={errors}
                        success={success}
                        watch={watch}
                        setValue={setValue}
                    />
                </div>

            </main>
        </div>
    );
}