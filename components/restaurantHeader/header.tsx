'use client'

import { restaurantDashboard } from '@/redux/slice/restaurantSlice';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCookie } from 'cookies-next';

const icons = {
    star: (className) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.5l2.9 6.1 6.6.6-5 4.5 1.5 6.5L12 16.9 6 20.2l1.5-6.5-5-4.5 6.6-.6L12 2.5Z" />
        </svg>
    ),
};

function LiveStatusCard() {
    const [live, setLive] = useState(true);

    return (
        <div className="relative overflow-hidden rounded-2xl bg-white border border-[#1F2421]/10 text-[#1F2421] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-sm transition-all">
            <div className="flex items-center gap-4">
                <span className="relative flex h-3.5 w-3.5">
                    {live && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E7D5B] opacity-75" />
                    )}
                    <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${live ? "bg-[#2E7D5B]" : "bg-[#6B7280]"}`} />
                </span>

                <div>
                    <p className="text-xl font-semibold text-[#1F2421] tracking-tight font-space">
                        {live ? "You're live" : "You're offline"}
                    </p>
                    <p className="text-sm text-[#6B7280] mt-0.5">
                        {live ? "Customers can find and order from you right now." : "Your restaurant is hidden from customers."}
                    </p>
                </div>
            </div>

            <button
                onClick={() => setLive((v) => !v)}
                className={`self-start sm:self-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all font-inter active:scale-95 ${live ? "bg-[#1F2421]/5 text-[#1F2421] hover:bg-[#1F2421]/10" : "bg-[#FF5C39] text-white hover:bg-[#FF6E4E]"
                    }`}
            >
                {live ? "Go offline" : "Go live"}
            </button>
        </div>
    );
}

export default function Header() {
    const { restaurantdashBoard: restaurant, hasRestaurant, loading } = useSelector((state) => state.restaurant);
    const dispatch = useDispatch();
    const pathname = usePathname();

    useEffect(() => {

        dispatch(restaurantDashboard())
            .unwrap()
            .then((res) => {
                if (res?.data?._id) {
                    setCookie("restaurant_id", res.data._id, { maxAge: 60 * 60 * 24 * 30, path: "/" });
                }
            })
            .catch(console.error);

    }, [dispatch]);

    if (!pathname.startsWith("/restaurantdashboard")) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-10 space-y-6">
            <header className="flex items-center justify-between py-6 sm:pt-10 border-b border-[#EEE7DA]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2421] tracking-tight font-space">
                        {!loading && hasRestaurant && restaurant ? restaurant.restaurantName : "Dashboard"}
                    </h1>
                    <p className="text-sm text-[#6B7280] mt-1.5 font-inter">
                        {!loading && hasRestaurant && restaurant
                            ? [restaurant.outletType, restaurant.ownerName].filter(Boolean).join(" · ")
                            : "Manage your restaurant, menu and orders"}
                    </p>
                </div>

                {!loading && hasRestaurant && restaurant?.status && (
                    <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#B33F2C]/10 border border-[#B33F2C]/20 px-3.5 py-1.5 text-sm text-[#B33F2C] capitalize">
                        {icons.star("w-3.5 h-3.5 text-[#D4A857]")}
                        <span className="font-mono text-xs font-semibold">{restaurant.status}</span>
                    </div>
                )}
            </header>

            {!loading && hasRestaurant && <LiveStatusCard />}
        </div>
    );
}