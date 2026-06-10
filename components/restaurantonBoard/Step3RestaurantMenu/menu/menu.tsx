"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { menuSchema } from "@/validators/restaurantValidator";
import { MenuFormData } from "@/typeScript/restaurant.type";

import BasicDetailsMenu from "../menuComponents/basicDetails/basicDetails";
import ImageUpload from "../menuComponents/imageUpload/imageUpload";
import Price from "../menuComponents/price/price";
import Addons from "../menuComponents/addOns/addOns";
import Tags from "../menuComponents/tags/tags";
import Settings from "../menuComponents/settings/settings";

import { restaurantMenu } from "@/redux/slice/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";

export default function MenuSetupForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.restaurant);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<MenuFormData>({
    resolver: yupResolver(menuSchema),
    defaultValues: {
      itemName: "",
      description: "",
      foodType: "veg",
      category: "Starters",
      image: null,
      basePrice: 0,
      discountPrice: 0,
      gst: 5,

      variants: [
        {
          name: "Full",
          price: 299,
        },
      ],

      addons: [],

      tags: [],

      isAvailable: true,
      enablePreOrder: false,
      allowSpecialInstructions: true,
      eligibleForOffers: true,

      preparationTime: {
        min: 20,
        max: 30,
      },
    }
  });

  const onSubmit = async (data: any) => {
    console.log("ADDONS DATA:", data.addons);

    try {
      const formData = new FormData();

      formData.append("itemName", data.itemName);
      formData.append("description", data.description);
      formData.append("foodType", data.foodType);
      formData.append("category", data.category);

      formData.append("basePrice", String(data.basePrice));
      formData.append("discountPrice", String(data.discountPrice));
      formData.append("gst", String(data.gst));

      formData.append("isAvailable", String(data.isAvailable));
      formData.append("enablePreOrder", String(data.enablePreOrder));
      formData.append("allowSpecialInstructions", String(data.allowSpecialInstructions));
      formData.append("eligibleForOffers", String(data.eligibleForOffers));

      formData.append("variants", JSON.stringify(data.variants));
      formData.append("addons", JSON.stringify(data.addons));
      formData.append("tags", JSON.stringify(data.tags));
      formData.append("preparationTime", JSON.stringify(data.preparationTime));

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const result = await dispatch(restaurantMenu(formData)).unwrap();
      console.log("SUCCESS:", result);

    } catch (err) {
      console.error("FAILED:", err);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <form onSubmit={handleSubmit(
        onSubmit,
        (errors) => {
          console.log("FULL ERRORS:", errors);
          console.log("CURRENT ADDONS:", watch("addons"));
        }
      )}
      >
        <BasicDetailsMenu
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />

        <ImageUpload setValue={setValue} watch={watch} errors={errors} />

        <Price register={register} control={control} errors={errors} />

        <Addons watch={watch} setValue={setValue} />
        <Tags watch={watch} setValue={setValue} />
        <Settings watch={watch} setValue={setValue} register={register} />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 20,
            padding: 12,
            background: "#FC8019",
            color: "#fff",
            border: "none",
            width: "100%",
          }}
        >
          {loading ? "Saving..." : "Save & Publish"}
        </button>
      </form>
    </div>
  );
}
