"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TopNav from "@/components/topnav/topnav";
import CategoryRail from "@/components/categoryrail/categoryrail";
import FeaturedChainsRail from "@/components/ Featuredchainsrail/ Featuredchainsrail";
import RestaurantGrid from "@/components/ Restaurantgrid/ Restaurantgrid";

import { AppDispatch, RootState } from "@/redux/store";
import { userRestaurantList } from "@/redux/slice/userSlice";
import { Restaurant } from "@/components/data/restaurant";
import { Category } from "@/components/data/category";

interface RestaurantHomeProps {
    brandName: string;
    userName: string;
    location: string;
    cityName: string;
    cartCount?: number;
    onLocationClick?: () => void;
    onCartClick?: () => void;
    onSelectRestaurant?: (restaurant: Restaurant) => void;
}

export default function RestaurantHome({
    brandName,
    userName,
    location,
    cityName,
    cartCount = 0,
    onLocationClick,
    onCartClick,
    onSelectRestaurant,
}: RestaurantHomeProps) {
    const dispatch = useDispatch<AppDispatch>();

    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        null
    );

    const { userlistData, loading } = useSelector(
        (state: RootState) => state.user
    );

    useEffect(() => {
        dispatch(userRestaurantList());
    }, [dispatch]);


    console.log(userlistData, "userlistData")
    return (
        <div className="min-h-screen bg-white">
            <TopNav
                brandName={brandName}
                location={location}
                userName={userName}
                cartCount={cartCount}
                onLocationClick={onLocationClick}
                onCartClick={onCartClick}
            />

            <CategoryRail
                userName={userName}
                categories={[]}
                isLoading={loading}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={(category: Category) =>
                    setSelectedCategoryId((current) =>
                        current === category._id ? null : category._id
                    )
                }
            />

            <FeaturedChainsRail
                cityName={cityName}
                restaurants={[]}
                isLoading={loading}
                onSelectRestaurant={onSelectRestaurant}
            />

            <hr className="max-w-7xl mx-auto border-neutral-100 mt-8" />

            <RestaurantGrid
                cityName={cityName}
                restaurants={userlistData}
                isLoading={loading}
                onSelectRestaurant={onSelectRestaurant}
            />
        </div>
    );
}