"use client";

import { useEffect, useMemo, useState } from "react";
import type { SVGProps } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { foodList } from "@/redux/slice/restaurantSlice";
import { getCookie } from "cookies-next";
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
                        className={`relative inline-flex rounded-full h-3.5 w-3.5 ${live ? "bg-[#2E7D5B]" : "bg-[#6B7280]"}`}
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
            >
                {live ? "Go offline" : "Go live"}
            </button>
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
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const { restaurantdashBoard, hasRestaurant, menuData, loading, error } =
        useSelector((state: RootState) => state.restaurant);

    const restaurantId = getCookie("restaurant_id") as string | undefined;
    const restaurant = restaurantdashBoard;

    useEffect(() => {
        if (!restaurantId) return;
        dispatch(foodList(restaurantId));
    }, [dispatch, restaurantId]);

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

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            setConfirmId(null);
        } catch (err) {
            console.error("Failed to delete item:", err);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[#FFF9F2] text-[#1F2421]" style={{ fontFamily: "'Inter', sans-serif" }}>
                <style>{FONTS}</style>

                <div className="flex flex-col lg:flex-row">
                    <main className="flex-1 px-4 py-6 sm:px-10 sm:py-8 max-w-7xl mx-auto w-full">
                        
                        {/* Header Section */}
                        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#1F2421]/5 pb-6 mb-7 gap-4">
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
                                <div className="self-start sm:self-auto flex items-center gap-1.5 rounded-full bg-[#FFC94D]/20 px-3 py-1.5 text-sm text-[#1F2421] capitalize">
                                    <Icon.Star style={{ width: 14, height: 14 }} className="text-[#FFC94D]" />
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                        {restaurant.status}
                                    </span>
                                </div>
                            )}
                        </header>

                        {/* Live Status Overview */}
                        {!loading && !error && hasRestaurant && restaurant && (
                            <div className="mb-8">
                                <LiveStatusCard />
                            </div>
                        )}

                        {/* Menu Controls and Filters Section */}
                        <section className="pb-20">
                            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <h2
                                    className="text-xl text-[#1F2421]"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                                >
                                    Menu Items ({filtered.length})
                                </h2>
                                <Link
                                    href="/dashboard/menu/new"
                                    className="self-start md:self-auto rounded-full bg-[#FF5C39] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#FF6E4E] transition-colors shadow-sm"
                                >
                                    + Add New Item
                                </Link>
                            </div>

                            {/* Search and Filters Strip */}
                            {restaurantId && !loading && !error && (
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
                                                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                                                        activeCategory === cat
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

                            {/* Core Dynamic Content Panel */}
                            {!restaurantId ? (
                                <EmptyPanel
                                    emoji="📍"
                                    title="No restaurant selected"
                                    message="Pick a restaurant first to see what's on the menu."
                                />
                            ) : loading ? (
                                <TableSkeleton />
                            ) : error ? (
                                <EmptyPanel
                                    emoji="⚠️"
                                    title="Couldn't load the menu"
                                    message={typeof error === "string" ? error : "Something went wrong. Please try again."}
                                    action={{ label: "Retry Dashboard Load", onClick: () => dispatch(foodList(restaurantId)) }}
                                />
                            ) : filtered.length > 0 ? (
                                <div className="overflow-x-auto rounded-xl border border-[#1F2421]/8 bg-white shadow-sm">
                                    <table className="w-full text-sm text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-[#1F2421]/8 bg-[#1F2421]/[0.03] text-xs uppercase tracking-wide text-[#6B7280]">
                                                <th className="px-6 py-4 font-medium">Item Name</th>
                                                <th className="px-6 py-4 font-medium">Category</th>
                                                <th className="px-6 py-4 font-medium">Type</th>
                                                <th className="px-6 py-4 font-medium">Rating</th>
                                                <th className="px-6 py-4 font-medium">Price</th>
                                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#1F2421]/8">
                                            {filtered.map((food: any) => (
                                                <tr key={food._id} className="hover:bg-[#1F2421]/[0.01] transition-colors">
                                                    <td className="px-6 py-4 text-[#1F2421] font-semibold">{food.itemName}</td>
                                                    <td className="px-6 py-4 text-[#6B7280] capitalize text-xs">{food.category}</td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex h-4 w-4 items-center justify-center rounded-sm border-2 ${food.isVeg ? "border-[#2E7D5B]" : "border-[#C1592B]"}`}
                                                            title={food.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                                                        >
                                                            <span className={`h-2 w-2 rounded-full ${food.isVeg ? "bg-[#2E7D5B]" : "bg-[#C1592B]"}`} />
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1 text-[#1F2421]">
                                                            <Icon.Star style={{ width: 13, height: 13 }} className="text-[#FFC94D]" />
                                                            <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs">
                                                                {food.rating ?? "—"}
                                                            </span>
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#1F2421] font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                                        ₹{food.basePrice}
                                                    </td>
                                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {confirmId === food._id ? (
                                                                <div className="flex items-center gap-1.5 dynamic-confirm-state">
                                                                    <span className="text-xs text-[#C1592B] font-medium mr-1">Delete?</span>
                                                                    <button
                                                                        onClick={() => handleDelete(food._id)}
                                                                        disabled={deletingId === food._id}
                                                                        className="rounded-md bg-[#C1592B] px-2.5 py-1 text-xs font-medium text-white hover:bg-[#C1592B]/90 disabled:opacity-50 transition-colors"
                                                                    >
                                                                        {deletingId === food._id ? "..." : "Yes"}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setConfirmId(null)}
                                                                        className="rounded-md border border-[#1F2421]/15 px-2.5 py-1 text-xs text-[#1F2421] hover:bg-gray-100 transition-colors"
                                                                    >
                                                                        No
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <Link
                                                                        href={`/dashboard/menu/${food._id}/edit`}
                                                                        className="rounded-md border border-[#1F2421]/12 p-1.5 text-[#1F2421] hover:border-[#FF5C39]/50 hover:text-[#FF5C39] transition-colors"
                                                                        title="Edit item information"
                                                                    >
                                                                        <Icon.Pencil style={{ width: 14, height: 14 }} />
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => setConfirmId(food._id)}
                                                                        className="rounded-md border border-[#1F2421]/12 p-1.5 text-[#1F2421] hover:border-[#C1592B]/50 hover:text-[#C1592B] transition-colors"
                                                                        title="Delete item permanently"
                                                                    >
                                                                        <Icon.Trash style={{ width: 14, height: 14 }} />
                                                                    </button>
                                                                </>
                                                            )}
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
                                        onClick: () => {
                                            setQuery("");
                                            setActiveCategory("All");
                                            setPureVegOnly(false);
                                            setMinRating(false);
                                            setSortKey("relevance");
                                        },
                                    }}
                                />
                            )}
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}











