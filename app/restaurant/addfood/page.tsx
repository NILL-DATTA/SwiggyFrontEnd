"use client";

import { useState } from "react";
import AddDish from "@/components/addDish_form/addDish";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { foodSchema } from "@/validators/addDishValidator";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { addMenu } from "@/redux/slice/restaurantSlice";
import { getCookie } from "cookies-next";

export default function CreateFoodPage() {
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const restaurantId = getCookie("restaurant_id");

    console.log(restaurantId, "restaurantId")
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
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>


            <div className="flex items-center justify-between bg-orange-500 px-6 py-3 text-white">
                <h1 className="font-bold">Swiggy Partner</h1>

                <button
                    type="submit"
                    form="add-food-form"
                    disabled={isSubmitting}
                    className="rounded bg-white px-4 py-2 text-xs font-bold text-orange-500"
                >
                    {isSubmitting ? "Publishing..." : "Publish Dish"}
                </button>
            </div>

            <AddDish
                register={register}
                handleSubmit={handleSubmit(onSubmit,
                    (errors) => {
                        console.log("Validation Errors:", errors);
                    })}
                errors={errors}
                success={success}
                watch={watch}
                setValue={setValue}
            />
        </div>
    );
}








