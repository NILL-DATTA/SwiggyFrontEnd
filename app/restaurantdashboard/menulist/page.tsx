"use client";

import { useEffect, useMemo, useState } from "react";
import type { SVGProps } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { foodList } from "@/redux/slice/restaurantSlice";

import type { RootState, AppDispatch } from "@/redux/store";

type SortKey = "relevance" | "rating" | "cost";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
`;

const Icon = {
    Star: (p: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
            <path d="M12 2.5l2.9 6.1 6.6.6-5 4.5 1.5 6.5L12 16.9 6 20.2l1.5-6.5-5-4.5 6.6-.6L12 2.5Z" />
        </svg>
    ),
    Pencil: (p: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
    ),
    Trash: (p: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
            <path d="M4 7h16" />
            <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
        </svg>
    ),
    Search: (p: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    ),
};

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

export default function Home() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [pureVegOnly, setPureVegOnly] = useState(false);
    const [minRating, setMinRating] = useState(false);
    const [sortKey, setSortKey] = useState<SortKey>("relevance");
    const [confirmId, setConfirmId] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const { hasRestaurant, menuData, loading, error } =
        useSelector((state: RootState) => state.restaurant);

    useEffect(() => {
        dispatch(foodList());
    }, [dispatch]);

    const items = menuData?.data ?? [];

    const categories = useMemo(() => {
        const unique = new Set<string>();
        items.forEach((item: any) => {
            if (item?.category) unique.add(item.category.trim());
        });
        return ["All", ...Array.from(unique)];
    }, [items]);

    const filtered = useMemo(() => {
        let list = [...items];

        if (query.trim()) {
            list = list.filter((food: any) =>
                food.itemName?.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (activeCategory !== "All") {
            list = list.filter(
                (food: any) =>
                    food.category?.trim().toLowerCase() === activeCategory.trim().toLowerCase()
            );
        }

        if (pureVegOnly) {
            list = list.filter((food: any) => food.isVeg);
        }

        if (minRating) {
            list = list.filter((food: any) => (food.rating ?? 0) >= 4.3);
        }

        switch (sortKey) {
            case "rating":
                list.sort((a: any, b: any) => (b.rating ?? 0) - (a.rating ?? 0));
                break;
            case "cost":
                list.sort((a: any, b: any) => (a.basePrice ?? 0) - (b.basePrice ?? 0));
                break;
        }

        return list;
    }, [items, query, activeCategory, pureVegOnly, minRating, sortKey]);

    const clearAllFilters = () => {
        setQuery("");
        setActiveCategory("All");
        setPureVegOnly(false);
        setMinRating(false);
        setSortKey("relevance");
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
                                href="/restaurant/addfood"
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

                        {/* Main UI Layout Dynamic Resolution */}
                        {loading ? (
                            <TableSkeleton />
                        ) : error ? (
                            <EmptyPanel
                                emoji="⚠️"
                                title="Couldn't load the menu"
                                message={typeof error === "string" ? error : "Something went wrong. Please try again."}
                                action={{ label: "Retry Dashboard Load", onClick: () => dispatch(foodList()) }}
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
                                            <th className="px-6 py-4 text-right font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1F2421]/8">
                                        {filtered.map((food: any) => (
                                            <tr
                                                key={food._id}
                                                className="hover:bg-[#FAFAFA] transition-colors"
                                            >
                                                {/* Image */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img
                                                        src={food.image ? `http://localhost:4000${food.image}` : "/api/placeholder/48/48"}
                                                        alt={food.itemName || "Food item"}
                                                        className="h-12 w-12 rounded-lg object-cover border border-gray-200 shadow-sm"
                                                    />
                                                </td>

                                                {/* Name */}
                                                <td className="px-6 py-4">
                                                    <div className="max-w-[200px]">
                                                        <p className="font-semibold text-[#1F2421] truncate">{food.itemName}</p>
                                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                                            {food.description || "No description provided."}
                                                        </p>
                                                    </div>
                                                </td>

                                                {/* Category */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                                                        {food.category}
                                                    </span>
                                                </td>

                                                {/* Veg / Non-Veg */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${food.isVeg
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-red-50 text-red-700"
                                                            }`}
                                                    >
                                                        <span className={`h-2 w-2 rounded-full ${food.isVeg ? "bg-green-600" : "bg-red-600"}`} />
                                                        {food.isVeg ? "Veg" : "Non Veg"}
                                                    </span>
                                                </td>

                                                {/* Rating */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-1.5 text-gray-700">
                                                        <Icon.Star className="text-yellow-400 w-4 h-4" />
                                                        <span className="font-medium">{food.rating || "-"}</span>
                                                    </div>
                                                </td>

                                                {/* Price */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="font-bold text-[#FF5C39]">
                                                        ₹{food.basePrice}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={`/dashboard/menu/${food._id}/edit`}
                                                            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition"
                                                        >
                                                            <Icon.Pencil className="w-4 h-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() => setConfirmId(food._id)}
                                                            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                                                        >
                                                            <Icon.Trash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <EmptyPanel
                                emoji="🍽️"
                                title="No Food Found"
                                message="We couldn't find any items matching your active search keywords or selected filter properties."
                                action={{
                                    label: "Clear All Filters",
                                    onClick: clearAllFilters,
                                }}
                            />
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}