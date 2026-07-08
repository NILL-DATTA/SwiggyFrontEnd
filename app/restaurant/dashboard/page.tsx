"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restaurantDashboard } from "@/redux/slice/restaurantSlice";
import { setCookie } from "cookies-next";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
`;

const Icon = {
    Grid: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
    ),
    Bag: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
            <path d="M6 8h12l-1 12H7L6 8Z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
    ),
    Menu: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
            <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
    ),
    Star: (p) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
            <path d="M12 2.5l2.9 6.1 6.6.6-5 4.5 1.5 6.5L12 16.9 6 20.2l1.5-6.5-5-4.5 6.6-.6L12 2.5Z" />
        </svg>
    ),
    Wallet: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
            <rect x="3" y="6" width="18" height="13" rx="2" />
            <path d="M3 10h18M16 14h2" />
        </svg>
    ),
    Clock: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
        </svg>
    ),
    Settings: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
        </svg>
    ),
    Plus: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
            <path d="M12 5v14M5 12h14" />
        </svg>
    ),
    Store: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
            <path d="M4 9l1.5-5h13L20 9M4 9v10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9M4 9h16" />
        </svg>
    ),
};



function LiveStatusCard() {
    const [live, setLive] = useState(true);

    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#1F2421] text-white px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-center gap-4">
                <span className="relative flex h-3.5 w-3.5">
                    {live && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E7D5B] opacity-75" />
                    )}
                    <span
                        className={`relative inline-flex rounded-full h-3.5 w-3.5 ${live ? "bg-[#2E7D5B]" : "bg-[#6B7280]"
                            }`}
                    />
                </span>

                <div>
                    <p
                        className="text-xl sm:text-2xl text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                    >
                        {live ? "You're live" : "You're offline"}
                    </p>
                    <p className="text-sm text-[#FFF9F2]/55 mt-0.5">
                        {live
                            ? "Customers can find and order from you right now."
                            : "Your restaurant is hidden from customers."}
                    </p>
                </div>
            </div>

            <button
                onClick={() => setLive((v) => !v)}
                className={`self-start sm:self-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${live
                    ? "bg-white/10 text-white hover:bg-white/15"
                    : "bg-[#FF5C39] text-[#1F2421] hover:bg-[#FF6E4E]"
                    }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {live ? "Go offline" : "Go live"}
            </button>
        </div>
    );
}

function StatCard({ label, value, sub, accent }) {
    return (
        <div className="rounded-xl bg-white border border-[#1F2421]/8 px-5 py-4">
            <p className="text-xs uppercase tracking-wide text-[#6B7280]">{label}</p>
            <p
                className="mt-1.5 text-2xl text-[#1F2421]"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
            >
                {value}
            </p>
            {sub && (
                <p className="mt-1 text-xs" style={{ color: accent || "#6B7280" }}>
                    {sub}
                </p>
            )}
        </div>
    );
}

function NoRestaurant() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-24 px-6 rounded-2xl border border-dashed border-[#1F2421]/15 bg-white">
            <div className="h-14 w-14 rounded-xl bg-[#FF5C39]/10 flex items-center justify-center mb-5">
                <Icon.Store className="text-[#FF5C39]" style={{ width: 26, height: 26 }} />
            </div>
            <h2
                className="text-2xl text-[#1F2421]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
            >
                No restaurant set up yet
            </h2>
            <p className="mt-2 max-w-sm text-sm text-[#6B7280]">
                Add your restaurant details, menu and timings to start receiving
                orders from customers near you.
            </p>
            <button
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FF5C39] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#FF6E4E] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <Icon.Plus style={{ width: 16, height: 16 }} />
                Create your restaurant
            </button>
        </div>
    );
}

function LoadingState() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-24 rounded-2xl bg-[#1F2421]/10" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 rounded-xl bg-[#1F2421]/8" />
                ))}
            </div>
            <div className="h-64 rounded-xl bg-[#1F2421]/8" />
        </div>
    );
}

function ErrorState({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-[#1F2421]/10 bg-white">
            <p className="text-sm text-[#6B7280]">
                {message || "Couldn't load your restaurant right now."}
            </p>
            <button
                onClick={onRetry}
                className="mt-4 rounded-full border border-[#1F2421]/15 px-4 py-2 text-sm text-[#1F2421] hover:bg-[#1F2421]/5 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}

export default function RestaurantDashboardPage() {
    const { restaurantdashBoard, hasRestaurant, loading, error } = useSelector(
        (state) => state.restaurant
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(restaurantDashboard())
            .unwrap()
            .then((res) => {
                if (res?.data?._id) {
                    setCookie("restaurant_id", res.data._id, {
                        maxAge: 60 * 60 * 24 * 30,
                        path: "/",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [dispatch]);
    const restaurant = restaurantdashBoard;


    console.log(restaurantdashBoard, "restaurant")

    return (
        <div className="min-h-screen bg-[#FFF9F2]" style={{ fontFamily: "'Inter', sans-serif" }}>
            <style>{FONTS}</style>

            <div className="flex">


                <main className="flex-1 px-5 py-6 sm:px-10 sm:py-8">
                    <header className="flex items-center justify-between mb-7">
                        <div>
                            <h1
                                className="text-2xl sm:text-3xl text-[#1F2421]"
                                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                            >
                                {hasRestaurant && restaurant ? restaurant.restaurantName : "Dashboard"}
                            </h1>
                            <p className="text-sm text-[#6B7280] mt-1">
                                {hasRestaurant && restaurant
                                    ? [restaurant.outletType, restaurant.ownerName].filter(Boolean).join(" · ")
                                    : "Manage your restaurant, menu and orders"}
                            </p>
                        </div>
                        {hasRestaurant && restaurant?.status && (
                            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#FFC94D]/20 px-3 py-1.5 text-sm text-[#1F2421] capitalize">
                                <Icon.Star style={{ width: 14, height: 14 }} className="text-[#FFC94D]" />
                                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                    {restaurant.status}
                                </span>
                            </div>
                        )}
                    </header>

                    {loading && <LoadingState />}

                    {!loading && error && (
                        <ErrorState
                            message={error?.message}
                            onRetry={() => dispatch(restaurantDashboard())}
                        />
                    )}

                    {!loading && !error && hasRestaurant === false && <NoRestaurant />}

                    {!loading && !error && hasRestaurant && restaurant && (
                        <div className="space-y-6">
                            <LiveStatusCard />
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <StatCard label="Today's orders" value={restaurant.todayOrders ?? 0} sub="+0 vs yesterday" />
                                <StatCard
                                    label="Today's revenue"
                                    value={`₹${restaurant.todayRevenue ?? 0}`}
                                    sub="Settles in 2 days"
                                />
                                <StatCard
                                    label="Menu items"
                                    value={restaurant.menuCount ?? 0}
                                    sub="View menu"
                                    accent="#FF5C39"
                                />
                                <StatCard
                                    label="Avg. prep time"
                                    value={`${restaurant.avgPrepTime ?? 20} min`}
                                    sub="Last 7 days"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2 rounded-xl bg-white border border-[#1F2421]/8 p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3
                                            className="text-base text-[#1F2421]"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                                        >
                                            Recent orders
                                        </h3>
                                        <button className="text-xs text-[#FF5C39] hover:underline">View all</button>
                                    </div>
                                    <div className="flex flex-col items-center justify-center py-14 text-center">
                                        <Icon.Clock className="text-[#1F2421]/20" style={{ width: 32, height: 32 }} />
                                        <p className="text-sm text-[#6B7280] mt-3">
                                            New orders will show up here the moment they come in.
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-white border border-[#1F2421]/8 p-5">
                                    <h3
                                        className="text-base text-[#1F2421] mb-4"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                                    >
                                        Restaurant details
                                    </h3>
                                    <dl className="space-y-3 text-sm">
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-[#6B7280]">Location</dt>
                                            <dd className="text-[#1F2421] text-right">{restaurant.location || "—"}</dd>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-[#6B7280]">Phone</dt>
                                            <dd className="text-[#1F2421]">{restaurant.phone || "—"}</dd>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-[#6B7280]">WhatsApp</dt>
                                            <dd className="text-[#1F2421]">{restaurant.whatsappNumber || "—"}</dd>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-[#6B7280]">Status</dt>
                                            <dd className="text-[#2E7D5B] font-medium capitalize">
                                                {restaurant.status || "—"}
                                            </dd>
                                        </div>
                                    </dl>
                                    <button className="mt-5 w-full rounded-lg border border-[#1F2421]/15 py-2 text-sm text-[#1F2421] hover:bg-[#1F2421]/5 transition-colors">
                                        Edit details
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}