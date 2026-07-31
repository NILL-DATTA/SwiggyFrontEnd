"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import Pagination from "@/components/pagination/pagination";
import Menu from "@/components/menulist/menu";
import { FONTS, Icon } from "@/components/fonts/fonts";

import { filterMenu, getCategories } from "@/utils/menufilters";
import { handleNext, handlePrev } from "@/handlers/paginationHandlers";
import { handleDelete } from "@/handlers/menuhandler";
import { useMenulist } from "@/customHooks/restaurant/restaurant.hook";
import { foodAvailable, foodList } from "@/redux/slice/restaurantSlice";
import { socket } from "@/lib/socket/socket";

type SortKey = "relevance" | "rating" | "cost";

interface EmptyPanelProps {
    emoji: string;
    title: string;
    message: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

function EmptyPanel({ emoji, title, message, action }: EmptyPanelProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-10 border border-dashed border-[#1F2421]/15 rounded-2xl bg-white/50 max-w-2xl mx-auto my-8">
            <span className="text-4xl mb-4">{emoji}</span>
            <h3 className="text-lg font-semibold text-[#1F2421]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
            <p className="text-sm text-[#6B7280] mt-1 max-w-md">{message}</p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="mt-5 rounded-full bg-[#1F2421] text-white px-5 py-2 text-sm font-medium hover:bg-[#1F2421]/90 transition-colors"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}

function TableSkeleton() {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-[#1F2421]/8 bg-white animate-pulse">
            <div className="h-12 bg-[#1F2421]/[0.03] border-b border-[#1F2421]/8" />
            {[...Array(5)].map((_, idx) => (
                <div key={idx} className="flex p-5 space-x-4 border-b border-[#1F2421]/5 items-center">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/6" />
                    <div className="h-4 bg-gray-200 rounded w-12" />
                    <div className="h-4 bg-gray-200 rounded w-12" />
                    <div className="h-4 bg-gray-200 rounded w-16" />
                    <div className="h-4 bg-gray-200 rounded w-1/12 ml-auto" />
                </div>
            ))}
        </div>
    );
}

export default function Menulist() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [pureVegOnly, setPureVegOnly] = useState(false);
    const [minRating, setMinRating] = useState(false);
    const [sortKey, setSortKey] = useState<SortKey>("relevance");
    const [page, setPage] = useState(1);
    const limit = 10;
    const dispatch = useDispatch()
    const { hasRestaurant, menuData, loading, error, pagination } = useSelector((state: RootState) => state.restaurant);
    useMenulist(page, limit)
    const items = menuData?.data ?? [];

    const categories = useMemo(() => getCategories(items), [items]);

    const filtered = useMemo(
        () =>
            filterMenu({
                items,
                query,
                activeCategory,
                pureVegOnly,
                minRating,
                sortKey,
            }),
        [items, query, activeCategory, pureVegOnly, minRating, sortKey]
    );

    const handleToggle = async (id: string) => {
        await dispatch(foodAvailable(id));
    };


    const deleteFood = (id: string) => {
        handleDelete({
            id,
            dispatch,
            fetchMenu: (page: number, limit: number) =>
                dispatch(foodList({ page, limit })),
            page,
            limit,
        });
    };





    return (
        <div className="min-h-screen bg-[#FFF9F2] text-[#1F2421]" style={{ fontFamily: "'Inter', sans-serif" }}>
            <style>{FONTS}</style>

            <div className="flex flex-col lg:flex-row">
                <main className="flex-1 px-4 py-6 sm:px-10 sm:py-8 max-w-7xl mx-auto w-full">

                    {/* Menu Controls and Filters Section */}
                    <section className="pb-20">
                        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <h2
                                className="text-xl text-[#1F2421]"
                                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                            >
                                Menu Items ({loading ? "..." : filtered.length})
                            </h2>
                            <Link
                                href="/restaurantdashboard/addfood"
                                className="self-start md:self-auto rounded-full bg-[#FF5C39] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#FF6E4E] transition-colors shadow-sm"
                            >
                                + Add New Item
                            </Link>
                        </div>

                        {/* Search and Filters Strip */}
                        {!loading && !error && hasRestaurant && (
                            <div className="bg-white rounded-xl border border-[#1F2421]/8 p-4 mb-6 space-y-4">
                                <div className="flex flex-col md:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <Icon.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                                        <input
                                            type="text"
                                            placeholder="Search dishes by name..."
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 text-sm bg-[#FFF9F2]/30 border border-[#1F2421]/12 rounded-lg focus:outline-none focus:border-[#FF5C39] transition-colors"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={sortKey}
                                            onChange={(e) => setSortKey(e.target.value as SortKey)}
                                            className="px-3 py-2 text-sm bg-white border border-[#1F2421]/12 rounded-lg focus:outline-none focus:border-[#FF5C39] transition-colors text-gray-700"
                                        >
                                            <option value="relevance">Sort by: Relevance</option>
                                            <option value="rating">Sort by: Rating (High to Low)</option>
                                            <option value="cost">Sort by: Price (Low to High)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Categories & Checkbox Toggles */}
                                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1F2421]/5">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveCategory(cat)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${activeCategory === cat
                                                    ? "bg-[#1F2421] text-white border-[#1F2421]"
                                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={pureVegOnly}
                                                onChange={(e) => setPureVegOnly(e.target.checked)}
                                                className="rounded border-gray-300 text-[#2E7D5B] focus:ring-[#2E7D5B] w-4 h-4"
                                            />
                                            Pure Veg 🟢
                                        </label>
                                        <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={minRating}
                                                onChange={(e) => setMinRating(e.target.checked)}
                                                className="rounded border-gray-300 text-[#FFC94D] focus:ring-[#FFC94D] w-4 h-4"
                                            />
                                            Top Rated (4.3+ ★)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {loading ? (
                            <TableSkeleton />
                        ) : error ? (
                            <EmptyPanel
                                emoji="⚠️"
                                title="Couldn't load the menu"
                                message={typeof error === "string" ? error : "Something went wrong. Please try again."}
                            // action={{ label: "Retry Dashboard Load", onClick: () => dispatch(foodList({ page, limit })) }}
                            />
                        ) : !hasRestaurant ? (
                            <EmptyPanel
                                emoji="📍"
                                title="No restaurant selected"
                                message="Pick a restaurant first to see what's on the menu."
                            />
                        ) : filtered.length > 0 ? (
                            <div className="overflow-x-auto rounded-xl border border-[#1F2421]/8 bg-white shadow-sm">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#E5E7EB] bg-gray-50/70 text-gray-600">
                                            <th className="px-6 py-4 font-medium">Image</th>
                                            <th className="px-6 py-4 font-medium">Item</th>
                                            <th className="px-6 py-4 font-medium">Category</th>
                                            <th className="px-6 py-4 font-medium">Type</th>
                                            <th className="px-6 py-4 font-medium">Rating</th>
                                            <th className="px-6 py-4 font-medium">Price</th>
                                            <th className="px-6 py-4 text-right font-medium">Availability</th>
                                            <th className="px-6 py-4 text-center font-medium">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1F2421]/8">
                                        <Menu filtered={filtered} handleDelete={deleteFood} toggleAvailability={handleToggle} />

                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <EmptyPanel
                                emoji="🍽️"
                                title="No Food Found"
                                message="We couldn't find any items matching your active search keywords or selected filter properties."
                            // action={{
                            //     label: "Clear All Filters",
                            //     // onClick: clearAllFilters,
                            // }}
                            />
                        )}
                    </section>
                </main>
            </div>
            <Pagination handlePrev={handlePrev} pagination={pagination} setPage={setPage} handleNext={handleNext} />
        </div>
    );
}