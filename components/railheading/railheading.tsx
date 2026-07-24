"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface RailHeadingProps {
    title: string;
    onLeft: () => void;
    onRight: () => void;
    canScrollLeft: boolean;
    canScrollRight: boolean;
}

export default function RailHeading({
    title,
    onLeft,
    onRight,
    canScrollLeft,
    canScrollRight,
}: RailHeadingProps) {
    return (
        <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">{title}</h2>
            <div className="hidden sm:flex items-center gap-2">
                <button
                    onClick={onLeft}
                    disabled={!canScrollLeft}
                    className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center transition-colors enabled:hover:bg-neutral-50 enabled:hover:border-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6461c]"
                    aria-label={`Scroll ${title} left`}
                >
                    <ChevronLeft size={16} />
                </button>
                <button
                    onClick={onRight}
                    disabled={!canScrollRight}
                    className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center transition-colors enabled:hover:bg-neutral-50 enabled:hover:border-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6461c]"
                    aria-label={`Scroll ${title} right`}
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}