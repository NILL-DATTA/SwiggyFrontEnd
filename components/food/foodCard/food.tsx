import type { Restaurant } from "../../data/restaurant"

type Food = {
  _id: string;
  itemName: string;
  description: string;
  image: string;
  basePrice: number;
  discountPrice: number;
  discountPercentage: number;
  cuisine: string;
  category: string;
  preparationTime: number;
  rating: number;
  isVeg: boolean;
  isAvailable: boolean;
};

export default function FoodCard({ restaurant }: { restaurant: Food }) {
  const {
    itemName,
    description,
    image,
    basePrice,
    discountPrice,
    discountPercentage,
    cuisine,
    category,
    preparationTime,
    rating,
    isVeg,
    isAvailable,
  } = restaurant;


  console.log(restaurant,"restaurant")
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}

      <div className="relative h-56">

        <img
          src={`http://localhost:4000${image}`}
          alt={itemName}
          className="h-full w-full object-cover"
        />

        {discountPercentage > 0 && (

          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">

            {discountPercentage}% OFF

          </div>

        )}

        <div className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 text-sm font-bold">

          ⭐ {rating}

        </div>

      </div>

      <div className="p-5">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-bold">

            {itemName}

          </h2>

          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${isVeg
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {isVeg ? "Veg" : "Non Veg"}
          </span>

        </div>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">

          {description}

        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">

          <span>{category}</span>

          •

          <span>{cuisine}</span>

        </div>

        <div className="mt-4 flex items-center justify-between">

          <div>

            <p className="text-xl font-bold text-orange-500">

              ₹{discountPrice}

            </p>

            <p className="text-sm text-gray-400 line-through">

              ₹{basePrice}

            </p>

          </div>

          <div className="text-right">

            <p className="text-sm font-medium">

              ⏱ {preparationTime} mins

            </p>

            <p
              className={`text-xs ${isAvailable
                  ? "text-green-600"
                  : "text-red-600"
                }`}
            >
              {isAvailable ? "Available" : "Out of Stock"}
            </p>

          </div>

        </div>

        <button className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">

          Add to Cart

        </button>

      </div>

    </article>
  );
}