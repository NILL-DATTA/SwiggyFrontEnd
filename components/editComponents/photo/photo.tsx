"use client";

import { useRef, useState, useEffect } from "react";

interface PhotoProps {
    setValue: any;
    watch: any;
}

export default function Photo({ setValue, watch }: PhotoProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>(null);

    const image = watch("image");

    console.log(image, "image");


    useEffect(() => {
        if (!image) {
            setPreview(null);
            return;
        }

        // New uploaded image
        if (image instanceof File) {
            const url = URL.createObjectURL(image);

            setPreview(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }


        // Existing database image
        if (typeof image === "string") {
            setPreview(`http://localhost:4000${image}`);
        }

    }, [image]);


    const handleImagePick = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;


        setValue("image", file, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        });
    };


    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5">

            <h2 className="text-[15px] font-semibold text-gray-900 mb-4">
                Item Photo
            </h2>


            <div className="flex items-center gap-4">


                {/* Image Upload Button */}
                <button
                    type="button"
                    onClick={() =>
                        fileInputRef.current?.click()
                    }
                    className="
                    flex h-24 w-24 flex-shrink-0 
                    items-center justify-center 
                    overflow-hidden rounded-lg 
                    border-2 border-dashed 
                    border-gray-300 bg-gray-50 
                    text-gray-400 transition 
                    hover:border-[#fc8019] 
                    hover:text-[#fc8019]
                    "
                >

                    {preview ? (
                        <img
                            src={preview}
                            alt="Food Preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="px-2 text-center text-xs">
                            Upload Photo
                        </span>
                    )}

                </button>



                {/* File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImagePick}
                />



                {/* Helper Text */}
                <div className="text-xs text-gray-500">

                    <p>
                        JPG or PNG, at least 500×500px.
                    </p>

                    <p>
                        Clear, well-lit photos increase orders.
                    </p>


                    {
                        image &&
                        typeof image === "string" &&
                        (
                            <p className="mt-2 text-[#fc8019] font-medium">
                                Current Database Image Loaded
                            </p>
                        )
                    }


                    {
                        image &&
                        image instanceof File &&
                        (
                            <p className="mt-2 text-green-600 font-medium">
                                New Image Selected: {image.name}
                            </p>
                        )
                    }

                </div>

            </div>

        </div>
    );
}