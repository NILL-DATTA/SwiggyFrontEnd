"use client";

import { Category } from "@/typeScript/restaurant.type";
import RailHeading from "../railheading/railheading";
import SafeImage from "../safeimage/safeImage";
import { CategorySkeleton } from "../skeleton/skeleton";
import { useHorizontalScroll } from "../Usehorizontalscroll/usehorizontalscroll";

// import { Category } from "../types";
// import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
// import RailHeading from "./RailHeading";
// import SafeImage from "./SafeImage";
// import { CategorySkeleton } from "./Skeletons";

interface CategoryRailProps {
    userName: string;
    categories: Category[];
    isLoading?: boolean;
    selectedCategoryId?: string | null;
    onSelectCategory?: (category: Category) => void;
}

export default function CategoryRail({
    userName,
    categories,
    isLoading = false,
    selectedCategoryId = null,
    onSelectCategory,
}: CategoryRailProps) {
    const { ref, scroll, canScrollLeft, canScrollRight } = useHorizontalScroll();

    return (
        <section className="max-w-7xl mx-auto px-4 pt-8" aria-label="Food categories">
            <RailHeading
                title={`${userName}, what's on your mind?`}
                onLeft={() => scroll("left")}
                onRight={() => scroll("right")}
                canScrollLeft={canScrollLeft}
                canScrollRight={canScrollRight}
            />

            <div
                ref={ref}
                className="flex gap-8 overflow-x-auto scroll-smooth pb-1 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none" }}
                role="list"
            >
                {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => <CategorySkeleton key={i} />)
                    : categories?.map((category) => {
                          const selected = category._id === selectedCategoryId;
                          return (
                              <button
                                  key={category._id}
                                  role="listitem"
                                  aria-pressed={selected}
                                  onClick={() => onSelectCategory?.(category)}
                                  className="flex flex-col items-center gap-3 shrink-0 group rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6461c]"
                              >
                                  <div
                                      className={`w-28 h-28 rounded-full overflow-hidden bg-neutral-50 ring-1 transition-all ${
                                          selected
                                              ? "ring-2 ring-[#e6461c]"
                                              : "ring-neutral-100 group-hover:ring-[#e6461c]/40"
                                      }`}
                                  >
                                      <SafeImage
                                          src={category.image}
                                          alt={category.name}
                                          fallbackLabel={category.name}
                                          width={112}
                                          height={112}
                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      />
                                  </div>
                                  <span
                                      className={`text-sm font-medium ${
                                          selected ? "text-[#e6461c]" : "text-neutral-700"
                                      }`}
                                  >
                                      {category.name}
                                  </span>
                              </button>
                          );
                      })}
            </div>
        </section>
    );
}