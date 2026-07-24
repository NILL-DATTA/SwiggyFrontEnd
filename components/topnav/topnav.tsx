"use client";

import { useEffect, useState } from "react";
import {
    Search,
    Percent,
    HelpCircle,
    User,
    ShoppingCart,
    Briefcase,
    ChevronDown,
    Menu,
    X,
} from "lucide-react";

interface TopNavProps {
    brandName: string;
    location: string;
    userName: string;
    cartCount?: number;
    onLocationClick?: () => void;
    onCartClick?: () => void;
}

interface NavLink {
    label: string;
    icon: typeof Briefcase;
    badge?: string;
}

const navLinks: NavLink[] = [
    { label: "Corporate", icon: Briefcase },
    { label: "Search", icon: Search },
    { label: "Offers", icon: Percent, badge: "NEW" },
    { label: "Help", icon: HelpCircle },
];

export default function TopNav({
    brandName,
    location,
    userName,
    cartCount = 0,
    onLocationClick,
    onCartClick,
}: TopNavProps) {
    const [elevated, setElevated] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setElevated(window.scrollY > 4);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-30 bg-white transition-shadow duration-200 ${elevated ? "shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_4px_16px_-8px_rgba(0,0,0,0.12)]" : "border-b border-neutral-100"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-6">
                <div className="w-9 h-9 rounded-xl bg-[#e6461c] flex items-center justify-center shrink-0">
                    <span className="text-white font-black text-base">
                        {brandName?.charAt(0).toUpperCase()}
                    </span>
                </div>

                <button
                    onClick={onLocationClick}
                    className="hidden sm:flex flex-col items-start leading-tight rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6461c]"
                >
                    <span className="text-[11px] font-bold tracking-wide border-b-2 border-[#e6461c] pb-0.5 text-neutral-900">
                        WORK
                    </span>
                    <span className="flex items-center gap-1 text-sm text-neutral-700 max-w-[220px] truncate">
                        <span className="truncate">{location}</span>
                        <ChevronDown size={14} className="text-[#e6461c] shrink-0" />
                    </span>
                </button>

                <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-neutral-600 ml-2">
                    {navLinks.map(({ label, icon: Icon, badge }) => (
                        <button
                            key={label}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50 hover:text-neutral-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6461c]"
                        >
                            <Icon size={17} strokeWidth={2} />
                            {label}
                            {badge && (
                                <span className="text-[10px] font-bold text-[#e6461c] -ml-1">
                                    {badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-1 ml-auto text-sm font-medium text-neutral-600">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50 hover:text-neutral-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6461c]">
                        <User size={17} strokeWidth={2} />
                        <span className="max-w-[120px] truncate">{userName}</span>
                    </button>
                    <button
                        onClick={onCartClick}
                        className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50 hover:text-neutral-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6461c]"
                    >
                        <ShoppingCart size={17} strokeWidth={2} />
                        Cart
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#e6461c] text-white text-[10px] font-bold flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>

                <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="md:hidden ml-auto p-2 rounded-lg hover:bg-neutral-50 text-neutral-700"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-neutral-100 px-4 py-3 flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm text-neutral-700 pb-2 mb-1 border-b border-neutral-100">
                        <span className="truncate">{location}</span>
                        <ChevronDown size={14} className="text-[#e6461c] shrink-0" />
                    </div>
                    {navLinks.map(({ label, icon: Icon }) => (
                        <button
                            key={label}
                            className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-neutral-50 text-neutral-700 text-sm font-medium"
                        >
                            <Icon size={18} />
                            {label}
                        </button>
                    ))}
                    <button
                        onClick={onCartClick}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-neutral-50 text-neutral-700 text-sm font-medium"
                    >
                        <ShoppingCart size={18} />
                        Cart {cartCount > 0 && `(${cartCount})`}
                    </button>
                </div>
            )}
        </header>
    );
}