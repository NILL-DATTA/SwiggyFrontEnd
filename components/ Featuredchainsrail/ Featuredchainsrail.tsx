"use client";

import { Restaurant } from "../data/restaurant";
import RailHeading from "../railheading/railheading";
import Restaurantcard from "../restaurantcard/restaurantcard";
import { RestaurantCardSkeleton } from "../skeleton/skeleton";
// import { Restaurant } from "../types";
import { useHorizontalScroll } from "../Usehorizontalscroll/usehorizontalscroll";
// import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
// import RailHeading from "./RailHeading";
// import RestaurantCard from "./RestaurantCard";
// import { RestaurantCardSkeleton } from "./Skeletons";

interface FeaturedChainsRailProps {
    cityName: string;
    restaurants: Restaurant[];
    isLoading?: boolean;
    onSelectRestaurant?: (restaurant: Restaurant) => void;
}

export default function FeaturedChainsRail({
    cityName,
    restaurants,
    isLoading = false,
    onSelectRestaurant,
}: FeaturedChainsRailProps) {
    const { ref, scroll, canScrollLeft, canScrollRight } = useHorizontalScroll();

    if (!isLoading && restaurants?.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-4 pt-10" aria-label="Top restaurant chains">
            <RailHeading
                title={`Top restaurant chains in ${cityName}`}
                onLeft={() => scroll("left")}
                onRight={() => scroll("right")}
                canScrollLeft={canScrollLeft}
                canScrollRight={canScrollRight}
            />

            <div
                ref={ref}
                className="flex gap-5 overflow-x-auto scroll-smooth pb-1 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none" }}
                role="list"
            >
                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="w-64 shrink-0">
                              <RestaurantCardSkeleton />
                          </div>
                      ))
                    : restaurants?.map((restaurant) => (
                          <div key={restaurant._id} role="listitem" className="w-64 shrink-0">
                              <Restaurantcard restaurant={restaurant} onSelect={onSelectRestaurant} />
                          </div>
                      ))}
            </div>
        </section>
    );
}