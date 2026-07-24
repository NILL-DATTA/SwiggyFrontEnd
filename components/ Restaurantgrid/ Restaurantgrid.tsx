"use client";

import { Restaurant } from "@/components/data/restaurant";
import RestaurantCard from "../restaurantcard/restaurantcard";

interface RestaurantGridProps {
    cityName: string;
    restaurants: Restaurant[];
    isLoading?: boolean;
    onSelectRestaurant?: (restaurant: Restaurant) => void;
}

export default function RestaurantGrid({
    cityName,
    restaurants,
    isLoading,
    onSelectRestaurant,
}: RestaurantGridProps) {
    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-80 animate-pulse rounded-2xl bg-gray-100"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (!restaurants || restaurants.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
                Ekhon {cityName}-e kono restaurant paoa jacche na.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
                {cityName}-r shera khabar
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {restaurants.map((item: any) => (
                    <RestaurantCard
                        key={item._id}
                        restaurant={item}
                        onSelectRestaurant={onSelectRestaurant}
                    />
                ))}
            </div>
        </div>
    );
}