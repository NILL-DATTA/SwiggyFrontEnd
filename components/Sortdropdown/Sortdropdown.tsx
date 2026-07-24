"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { SORT_LABELS, SortOption } from "@/typeScript/restaurant.type";


interface SortDropdownProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

const OPTIONS = Object.keys(SORT_LABELS) as SortOption[];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [open]);

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="flex items-center gap-1.5 text-sm font-medium border border-neutral-300 rounded-full px-4 py-1.5 hover:bg-neutral-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6461c]"
            >
                {SORT_LABELS[value]}
                <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <ul
                    role="listbox"
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-neutral-100 py-1.5 z-20"
                >
                    {OPTIONS.map((option) => (
                        <li key={option}>
                            <button
                                role="option"
                                aria-selected={value === option}
                                onClick={() => {
                                    onChange(option);
                                    setOpen(false);
                                }}
                                className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                            >
                                {SORT_LABELS[option]}
                                {value === option && <Check size={15} className="text-[#e6461c]" />}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}