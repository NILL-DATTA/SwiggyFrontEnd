"use client";

import { useEffect } from "react";
import {
    useForm,
    useFieldArray,
    UseFormRegister,
    Control,
    UseFormWatch,
    UseFormSetValue,
    FieldErrors
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

import Photo from "@/components/editComponents/photo/photo";
import EditBasicDetails from "@/components/editComponents/basicDetails/basicDeatils";

import { foodSchema } from "@/validators/restaurantValidator";

import { AppDispatch, RootState } from "@/redux/store";
import { editFoodItem, foodDetails } from "@/redux/slice/restaurantSlice";

// --- Types & Interfaces ---

export interface CustomizationOption {
    name: string;
    price: number;
}

export interface CustomizationGroup {
    title: string;
    type: "single" | "multiple";
    required: boolean;
    options: CustomizationOption[];
}

export interface EditFoodForm {
    itemName: string;
    description: string;
    foodType: string;
    isVeg: boolean;
    category: string;
    cuisine: string;
    basePrice: number;
    discountPrice: number;
    discountPercentage: number;
    gst: number;
    preparationTime: number;
    isAvailable: boolean;
    isRecommended: boolean;
    image: File | string | null;
    customizations: CustomizationGroup[];
}

const inputClass = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#fc8019] focus:outline-none focus:ring-1 focus:ring-[#fc8019]";

interface SectionCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

function SectionCard({ title, subtitle, children }: SectionCardProps) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
            {children}
        </div>
    );
}

interface CustomizationGroupItemProps {
    groupIndex: number;
    control: Control<EditFoodForm>;
    register: UseFormRegister<EditFoodForm>;
    removeGroup: (index: number) => void;
    watch: UseFormWatch<EditFoodForm>;
    setValue: UseFormSetValue<EditFoodForm>;
}

function CustomizationGroupItem({
    groupIndex,
    control,
    register,
    removeGroup,
    watch,
    setValue,
}: CustomizationGroupItemProps) {
    const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
        control,
        name: `customizations.${groupIndex}.options` as any,
    });

    const groupType = watch(`customizations.${groupIndex}.type`);
    const groupRequired = watch(`customizations.${groupIndex}.required`);

    return (
        <div className="rounded-lg border border-gray-200 p-4 bg-white space-y-4">
            <div className="flex items-start gap-3">
                <input
                    {...register(`customizations.${groupIndex}.title` as const)}
                    className={`${inputClass} flex-1 font-medium`}
                    placeholder="Group name, e.g. Choose size"
                />
                <button
                    type="button"
                    onClick={() => removeGroup(groupIndex)}
                    className="flex-shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 transition hover:border-red-200 hover:text-red-600"
                >
                    Remove Group
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                        type="radio"
                        value="single"
                        checked={groupType === "single"}
                        onChange={() => setValue(`customizations.${groupIndex}.type`, "single", { shouldDirty: true })}
                        className="text-[#fc8019] focus:ring-[#fc8019]"
                    />
                    Single choice
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                        type="radio"
                        value="multiple"
                        checked={groupType === "multiple"}
                        onChange={() => setValue(`customizations.${groupIndex}.type`, "multiple", { shouldDirty: true })}
                        className="text-[#fc8019] focus:ring-[#fc8019]"
                    />
                    Multiple choice
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={!!groupRequired}
                        onChange={(e) => setValue(`customizations.${groupIndex}.required`, e.target.checked, { shouldDirty: true })}
                        className="rounded text-[#fc8019] focus:ring-[#fc8019]"
                    />
                    Required
                </label>
            </div>

            <div className="space-y-2">
                {optionFields.map((opt, optIndex) => (
                    <div key={opt.id} className="flex items-center gap-2">
                        <input
                            {...register(`customizations.${groupIndex}.options.${optIndex}.name` as const)}
                            placeholder="Option name"
                            className={`${inputClass} flex-1`}
                        />
                        <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-400">₹</span>
                            <input
                                type="number"
                                {...register(`customizations.${groupIndex}.options.${optIndex}.price` as const, {
                                    valueAsNumber: true,
                                })}
                                placeholder="0"
                                className={`${inputClass} w-24`}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeOption(optIndex)}
                            aria-label="Remove option"
                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => appendOption({ name: "", price: 0 })}
                className="text-xs font-semibold text-[#fc8019] hover:underline"
            >
                + Add option
            </button>
        </div>
    );
}

// --- Main Page Component ---
export default function EditFoodItemPage() {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const foodId = params.slug as string;

    const { singleFood, isLoading } = useSelector((state: RootState) => state.restaurant);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<EditFoodForm>({
        resolver: yupResolver(foodSchema),
        defaultValues: {
            itemName: "",
            description: "",
            foodType: "",
            isVeg: false,
            category: "",
            cuisine: "",
            basePrice: 0,
            discountPrice: 0,
            discountPercentage: 0,
            gst: 5,
            preparationTime: 20,
            isAvailable: true,
            isRecommended: true,
            image: null,
            customizations: [],
        },
    });


    useEffect(() => {
        if (foodId) {
            dispatch(foodDetails(foodId));
        }
    }, [dispatch, foodId]);

    useEffect(() => {
        if (singleFood) {
            reset({
                itemName: singleFood.itemName || "",
                description: singleFood.description || "",
                foodType: singleFood.foodType || "",
                isVeg: !!singleFood.isVeg,
                category: singleFood.category || "",
                cuisine: singleFood.cuisine || "",
                basePrice: singleFood.basePrice || 0,
                discountPrice: singleFood.discountPrice || 0,
                discountPercentage: singleFood.discountPercentage || 0,
                gst: singleFood.gst ?? 5,
                preparationTime: singleFood.preparationTime ?? 20,
                isAvailable: singleFood.isAvailable ?? true,
                isRecommended: singleFood.isRecommended ?? true,
                image: singleFood.image,
                customizations: singleFood.customizations || [],
            });
        }
    }, [singleFood, reset]);

    const { fields: groupFields, append: appendGroup, remove: removeGroup } = useFieldArray({
        control,
        name: "customizations",
    });

    const onSubmit = (data: EditFoodForm) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (key === "customizations") {
                    formData.append(key, JSON.stringify(value));
                } else if (key === "image") {

                    if (value instanceof File) {
                        formData.append(key, value);
                    }
                } else {

                    formData.append(key, String(value));
                }
            }
        });

        dispatch(editFoodItem({ foodId, formData }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f7f7f8]">
                <div className="text-gray-500 font-medium animate-pulse">Loading food details...</div>
            </div>
        );
    }


    console.log(singleFood, "singleFood")

    return (
        <div className="min-h-screen bg-[#f7f7f8] py-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto max-w-4xl space-y-6 p-6"
            >
                <Photo
                    setValue={setValue}
                    watch={watch}
                />
                <EditBasicDetails
                    register={register}
                    errors={errors as FieldErrors<any>}
                />
                <SectionCard
                    title="Customizations"
                    subtitle="Options customers can pick from when ordering this item"
                >
                    <div className="space-y-4">
                        {groupFields.map((group, index) => (
                            <CustomizationGroupItem
                                key={group.id}
                                groupIndex={index}
                                control={control}
                                register={register}
                                removeGroup={removeGroup}
                                watch={watch}
                                setValue={setValue}
                            />
                        ))}

                        <button
                            type="button"
                            onClick={() =>
                                appendGroup({
                                    title: "",
                                    type: "single",
                                    required: false,
                                    options: [{ name: "", price: 0 }],
                                })
                            }
                            className="w-full rounded-lg border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-500 transition hover:border-[#fc8019] hover:text-[#fc8019]"
                        >
                            + Add customization group
                        </button>
                    </div>
                </SectionCard>

                {/* Submit Panel */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-[#fc8019] px-6 py-3 font-semibold text-white hover:bg-[#e6730f] transition disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}