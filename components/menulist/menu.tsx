import React from 'react'
import { Icon } from '../fonts/fonts'
import Link from 'next/link'

export default function Menu({ filtered, setConfirmId }) {
    return (
        <>
            {filtered.map((food: any) => (
                <tr
                    key={food._id}
                    className="hover:bg-[#FAFAFA] transition-colors"
                >
                    {/* Image */}
                    <td className="px-6 py-4 whitespace-nowrap">
                        <img
                            src={food.image?.includes("/uploads")
                                ? `http://localhost:4000${food.image.substring(food.image.indexOf("/uploads"))}`
                                : "/api/placeholder/48/48"}
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
                            {food?.category}
                        </span>
                    </td>

                    {/* Veg / Non-Veg */}
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${food?.isVeg
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                                }`}
                        >
                            <span className={`h-2 w-2 rounded-full ${food?.isVeg ? "bg-green-600" : "bg-red-600"}`} />
                            {food?.foodType}
                        </span>
                    </td>

                    {/* Rating */}
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-gray-700">
                            <Icon.Star className="text-yellow-400 w-4 h-4" />
                            <span className="font-medium">{food?.rating || "-"}</span>
                        </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-[#FF5C39]">
                            ₹{food?.basePrice}
                        </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                            <Link
                                href={`/restaurantdashboard/edit/${food?._id}`}
                                className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition"
                            >
                                <Icon.Pencil className="w-4 h-4" />
                            </Link>

                            <button
                                onClick={() => setConfirmId(food?._id)}
                                className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                            >
                                <Icon.Trash className="w-4 h-4" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
