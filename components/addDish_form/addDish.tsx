"use client";

import {
  Card,
  CardLabel,
  ToggleRow,
  inputClass,
} from "../../components/ui/addDish/addDish";

export default function AddDish({
  register,
  handleSubmit,
  watch,
  setValue,
  errors,
}) {
  const itemName = watch("itemName");
  const description = watch("description");
  const basePrice = watch("basePrice");
  const discountPrice = watch("discountPrice");
  const preparationTime = watch("preparationTime");
  const isVeg = watch("isVeg");
  const isAvailable = watch("isAvailable");
  const isRecommended = watch("isRecommended");

  const effectivePrice =
    discountPrice && Number(discountPrice) < Number(basePrice)
      ? discountPrice
      : basePrice;

  const image = watch("image");

  const imagePreview =
    image && image.length > 0
      ? URL.createObjectURL(image[0])
      : null;

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-3">

      <form
        id="add-food-form"
        onSubmit={(e) => {
          console.log("Form Submitted");
          handleSubmit(e);
        }}
        className="lg:col-span-2 space-y-6"
      >

        <Card>
          <CardLabel>Dish Details</CardLabel>

          <div className="space-y-4">
            <div>
              <input
                placeholder="Item Name"
                className={inputClass(!!errors?.itemName)}
                {...register("itemName")}
              />
              <p className="text-xs text-red-500">
                {errors?.itemName?.message}
              </p>
            </div>

            <textarea
              placeholder="Description"
              className={inputClass(false)}
              {...register("description")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Food Type
              </label>

              <select
                {...register("foodType")}
                className={inputClass(false)}
              >
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                {...register("category")}
                className={inputClass(false)}
              >
                <option value="Biryani">Biryani</option>
                <option value="Pizza">Pizza</option>
                <option value="Burger">Fast Food</option>
                <option value="Chinese">Chinese</option>
                <option value="Drinks">Drinks</option>
                <option value="panner">Veg</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Cuisine
              </label>

              <select
                {...register("cuisine")}
                className={inputClass(false)}
              >
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
              </select>
            </div>

          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Dish Image
              </label>

              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full rounded-lg border border-gray-300 p-2"
              />

              <p className="text-xs text-red-500">
                {errors?.image?.message}
              </p>
            </div>

            {/* Description */}

          </div>
        </Card>

        <Card>
          <CardLabel>Pricing</CardLabel>
          <div className="flex flex-col gap-4">
            <div>
              <input
                placeholder="Base Price"
                className={inputClass(!!errors?.basePrice)}
                {...register("basePrice")}
              />
              <p className="text-xs text-red-500">
                {errors?.basePrice?.message}
              </p>
            </div>

            <div>
              <input
                placeholder="Discount Price"
                className={inputClass(!!errors?.discountPrice)}
                {...register("discountPrice")}
              />
              <p className="text-xs text-red-500">
                {errors?.discountPrice?.message}
              </p>
            </div>

            <input
              placeholder="GST"
              className={inputClass(false)}
              {...register("gst")}
            />

            <div>
              <input
                placeholder="Prep Time"
                className={inputClass(!!errors?.preparationTime)}
                {...register("preparationTime")}
              />
              <p className="text-xs text-red-500">
                {errors?.preparationTime?.message}
              </p>
            </div>

          </div>
        </Card>

        <Card>
          <CardLabel>Flags</CardLabel>

          <div className="space-y-5">

            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="mb-3 text-xs font-semibold text-gray-500">
                Diet Type
              </p>

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => setValue("isVeg", true)}
                  className={`flex-1 rounded-lg border px-4 py-2 text-xs font-semibold transition ${isVeg
                    ? "border-green-500 bg-green-50 text-green-600"
                    : "border-gray-200 bg-white text-gray-500"
                    }`}
                >
                  🌱 Veg
                </button>

                <button
                  type="button"
                  onClick={() => setValue("isVeg", false)}
                  className={`flex-1 rounded-lg border px-4 py-2 text-xs font-semibold transition ${!isVeg
                    ? "border-red-400 bg-red-50 text-red-500"
                    : "border-gray-200 bg-white text-gray-500"
                    }`}
                >
                  🍗 Non-Veg
                </button>

              </div>
            </div>

            <div className="space-y-3">

              <div className="rounded-xl border bg-white p-3">
                <ToggleRow
                  label="Available"
                  checked={isAvailable}
                  onChange={(v) => setValue("isAvailable", v)}
                />
              </div>

              <div className="rounded-xl border bg-white p-3">
                <ToggleRow
                  label="Recommended"
                  checked={isRecommended}
                  onChange={(v) => setValue("isRecommended", v)}
                />
              </div>

            </div>

          </div>
        </Card>

      </form>

      {/* ---------------- PREVIEW ---------------- */}
      <div className="sticky top-6 h-fit rounded-2xl border bg-white p-5 shadow-sm">

        <div className="mb-4 flex justify-between">
          <h2 className="text-xs font-bold uppercase text-gray-500">
            Live Preview
          </h2>

          <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] text-orange-600">
            Menu
          </span>
        </div>

        <div className="mb-4 aspect-square overflow-hidden rounded-xl border bg-gray-50">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Dish Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="text-center">

          <p className="font-semibold text-lg">
            {itemName || "Item Name"}
          </p>

          <p className="mt-2 text-2xl font-bold text-orange-500">
            ₹{effectivePrice || 0}
          </p>

          <p className="mt-2 text-xs text-gray-400">
            {description || "Description"}
          </p>

        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-gray-500">

          <span className="rounded-full bg-gray-100 px-3 py-1">
            {isVeg ? "🌱 Veg" : "🍗 Non-Veg"}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1">
            {preparationTime || "0"} min
          </span>

          <span
            className={`rounded-full px-3 py-1 ${isAvailable
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
              }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>

        </div>

      </div>

    </div>
  );
}