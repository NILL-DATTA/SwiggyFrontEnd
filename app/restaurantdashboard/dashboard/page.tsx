"use client";

import { useSelector, useDispatch } from "react-redux";
import { restaurantDashboard } from "@/redux/slice/restaurantSlice";

const icons = {
    store: (className) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 9l1.5-5h13L20 9M4 9v10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9M4 9h16" />
        </svg>
    ),
    plus: (className) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
        </svg>
    ),
    clock: (className) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
        </svg>
    ),
};

function StatCard({ label, value, sub, accent }) {
    return (
        <div className="rounded-xl bg-white border border-[#1F2421]/8 px-5 py-4 shadow-sm hover:border-[#1F2421]/15 transition-all">
            <p className="text-xs uppercase tracking-wider font-semibold text-[#6B7280] font-inter">{label}</p>
            <p className="mt-2 text-2xl font-medium font-mono text-[#1F2421]">
                {value}
            </p>
            {sub && (
                <p className="mt-1 text-xs font-inter" style={{ color: accent || "#6B7280" }}>
                    {sub}
                </p>
            )}
        </div>
    );
}

function NoRestaurant() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-dashed border-[#1F2421]/15 bg-white shadow-sm">
            <div className="h-14 w-14 rounded-xl bg-[#FF5C39]/10 flex items-center justify-center mb-5">
                {icons.store("w-7 h-7 text-[#FF5C39]")}
            </div>
            <h2 className="text-2xl font-bold text-[#1F2421] font-space">
                No restaurant set up yet
            </h2>
            <p className="mt-2 max-w-sm text-sm text-[#6B7280] font-inter leading-relaxed">
                Add your restaurant details, menu and timings to start receiving orders from customers near you.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FF5C39] text-white px-6 py-3 text-sm font-medium hover:bg-[#FF6E4E] transition-all font-inter active:scale-95 shadow-md shadow-[#FF5C39]/20">
                {icons.plus("w-4 h-4")}
                Create your restaurant
            </button>
        </div>
    );
}

function LoadingState() {
    return (
        <div className="space-y-6 ready-shimmer animate-pulse">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-28 rounded-xl bg-[#1F2421]/5" />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 h-64 rounded-xl bg-[#1F2421]/5" />
                <div className="h-64 rounded-xl bg-[#1F2421]/5" />
            </div>
        </div>
    );
}

function ErrorState({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-[#1F2421]/10 bg-white shadow-sm">
            <p className="text-sm font-medium text-[#6B7280] font-inter">
                {message || "Couldn't load your restaurant right now."}
            </p>
            <button
                onClick={onRetry}
                className="mt-4 rounded-full border border-[#1F2421]/15 px-5 py-2 text-sm text-[#1F2421] font-medium hover:bg-[#1F2421]/5 transition-all font-inter active:scale-95"
            >
                Try again
            </button>
        </div>
    );
}

export default function RestaurantDashboardPage() {
    const { restaurantdashBoard: restaurant, hasRestaurant, loading, error } = useSelector(
        (state) => state.restaurant
    );
    const dispatch = useDispatch();

    return (
        <div className="min-h-screen bg-neutral-50/50">
            <main className="max-w-7xl mx-auto px-5 py-8 sm:px-10">
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
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatCard label="Today's orders" value={restaurant.todayOrders ?? 0} sub="+0 vs yesterday" />
                            <StatCard label="Today's revenue" value={`₹${restaurant.todayRevenue ?? 0}`} sub="Settles in 2 days" />
                            <StatCard label="Menu items" value={restaurant.menuCount ?? 0} sub="View menu" accent="#FF5C39" />
                            <StatCard label="Avg. prep time" value={`${restaurant.avgPrepTime ?? 20} min`} sub="Last 7 days" />
                        </div>


                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Recent Orders area */}
                            <div className="lg:col-span-2 rounded-xl bg-white border border-[#1F2421]/8 p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-bold text-[#1F2421] font-space">
                                        Recent orders
                                    </h3>
                                    <button className="text-xs font-semibold text-[#FF5C39] hover:underline font-inter">View all</button>
                                </div>
                                <div className="flex flex-col items-center justify-center py-14 text-center">
                                    {icons.clock("w-8 h-8 text-[#1F2421]/20")}
                                    <p className="text-sm text-[#6B7280] font-inter mt-3 max-w-xs">
                                        New orders will show up here the moment they come in.
                                    </p>
                                </div>
                            </div>

                            {/* Details Panel */}
                            <div className="rounded-xl bg-white border border-[#1F2421]/8 p-5 shadow-sm flex flex-col justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-[#1F2421] font-space mb-4">
                                        Restaurant details
                                    </h3>
                                    <dl className="space-y-3.5 text-sm font-inter">
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-[#6B7280]">Location</dt>
                                            <dd className="text-[#1F2421] text-right font-medium">{restaurant.location || "—"}</dd>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-[#6B7280]">Phone</dt>
                                            <dd className="text-[#1F2421] font-medium">{restaurant.phone || "—"}</dd>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-[#6B7280]">WhatsApp</dt>
                                            <dd className="text-[#1F2421] font-medium">{restaurant.whatsappNumber || "—"}</dd>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-[#6B7280]">Status</dt>
                                            <dd className="text-[#2E7D5B] font-semibold capitalize bg-[#2E7D5B]/10 px-2 py-0.5 rounded text-xs">
                                                {restaurant.status || "—"}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                                <button className="mt-6 w-full rounded-lg border border-[#1F2421]/15 py-2.5 text-sm font-medium text-[#1F2421] hover:bg-[#1F2421]/5 transition-all font-inter active:scale-\[0.98\]">
                                    Edit details
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}