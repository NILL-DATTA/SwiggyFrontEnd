"use client";

import { useState } from "react";
import AddDish from "@/components/addDish_form/addDish";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { foodSchema } from "@/validators/addDishValidator";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { addMenu } from "@/redux/slice/restaurantSlice";

export default function CreateFoodPage() {
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

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
            restaurantId: "",
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
        const formData = new FormData();

        formData.append("restaurantId", data.restaurantId);
        formData.append("itemName", data.itemName);
        formData.append("description", data.description);
        formData.append("foodType", data.foodType);
        formData.append("category", data.category);
        formData.append("cuisine", data.cuisine);
        formData.append("basePrice", data.basePrice);
        formData.append("discountPrice", data.discountPrice);
        formData.append("gst", data.gst);
        formData.append("preparationTime", data.preparationTime);
        formData.append("isAvailable", data.isAvailable);
        formData.append("isRecommended", data.isRecommended);
        formData.append("isVeg", data.isVeg);

        formData.append("image", data.image[0]);

        dispatch(addMenu(formData));
        reset();
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
                handleSubmit={handleSubmit(onSubmit)}
                errors={errors}
                success={success}
                watch={watch}
                setValue={setValue}
            />
        </div>
    );
}