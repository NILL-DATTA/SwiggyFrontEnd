import Image from "next/image";
import { Clock3, Heart, MapPin, Star } from "lucide-react";

interface Food {
    _id: string;
    itemName: string;
    image: string;
    category: string;
    cuisine: string;
    description: string;
    foodType: string;
    isVeg: boolean;
    basePrice: number;
    discountPrice: number;
    discountPercentage: number;
    gst: number;
    preparationTime: number;
    rating: number;
    totalRatings: number;
    totalOrders: number;
    isAvailable: boolean;
    isDeleted: boolean;
    isRecommended: boolean;
    slug: string;

    restaurant: {
        _id: string;
        restaurantName: string;
        location: string;
        status: string;
    };
}

interface Props {
    restaurant: Food;
    onSelectRestaurant?: (restaurant: Food) => void;
}

export default function RestaurantCard({ restaurant, onSelectRestaurant }: Props) {
    // Backend URL
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    // Image URL
    const imageUrl = restaurant?.image?.startsWith("http")
        ? restaurant.image
        : `${BASE_URL}${restaurant.image}`;

    return (
        <div
            onClick={() => onSelectRestaurant?.(restaurant)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={restaurant.itemName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {restaurant.discountPercentage > 0 && (
                    <div className="absolute bottom-3 left-3 rounded-lg bg-orange-500 px-3 py-1 text-sm font-semibold text-white">
                        {restaurant.discountPercentage}% OFF
                    </div>
                )}

                <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-2 backdrop-blur"
                >
                    <Heart className="h-5 w-5 text-red-500" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Restaurant */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
                            {restaurant.restaurant?.restaurantName}
                        </h3>

                        <p className="mt-1 text-orange-500 font-medium">
                            {restaurant.itemName}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            {restaurant.category} • {restaurant.cuisine}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                            <MapPin className="h-3 w-3" />
                            {restaurant.restaurant?.location}
                        </div>
                    </div>

                    <div className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-white">
                        <Star className="h-3 w-3 fill-white" />
                        <span className="text-xs font-semibold">
                            {restaurant.rating > 0 ? restaurant.rating : "New"}
                        </span>
                    </div>
                </div>

                {/* Time & Price */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock3 className="h-4 w-4" />
                        {restaurant.preparationTime} mins
                    </div>

                    <div className="text-right">
                        <p className="font-semibold text-gray-900">
                            ₹{restaurant.discountPrice}
                        </p>

                        {restaurant.discountPrice < restaurant.basePrice && (
                            <p className="text-xs text-gray-400 line-through">
                                ₹{restaurant.basePrice}
                            </p>
                        )}
                    </div>
                </div>

                {/* Veg / Non Veg */}
                <div className="mt-3 flex items-center justify-between">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            restaurant.isVeg
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {restaurant.isVeg ? "Veg" : "Non Veg"}
                    </span>

                    {restaurant.isRecommended && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                            Recommended
                        </span>
                    )}
                </div>

                {/* Button */}
                <button className="mt-5 w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                    View Menu
                </button>
            </div>
        </div>
    );
}