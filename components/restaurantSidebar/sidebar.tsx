"use client";
import { usePathname } from "next/navigation";

function Sidebar() {

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

    const pathname = usePathname();

    if (!pathname.startsWith("/restaurantdashboard")) {
        return null;
    }

    const items = [
        { icon: Icon.Grid, label: "Overview", active: true },
        { icon: Icon.Bag, label: "Orders" },
        { icon: Icon.Menu, label: "Menu" },
        { icon: Icon.Wallet, label: "Payouts" },
        { icon: Icon.Star, label: "Ratings" },
        { icon: Icon.Settings, label: "Settings" },
    ];
    return (
        <aside className="hidden md:flex w-60 shrink-0 flex-col bg-[#1F2421] text-[#FFF9F2]/90 min-h-screen py-6 px-4">
            <div className="flex items-center gap-2 px-2 mb-10">
                <div className="h-8 w-8 rounded-lg bg-[#FF5C39] flex items-center justify-center">
                    <Icon.Store className="h-4.5 w-4.5 text-[#1F2421]" />
                </div>

                <span
                    className="text-lg tracking-tight text-white"
                    style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600
                    }}
                >
                    Partner Hub
                </span>
            </div>


            <nav className="flex flex-col gap-1">

                {items.map(({ icon: I, label, active }) => (
                    <button
                        key={label}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active
                            ? "bg-white/10 text-white"
                            : "text-[#FFF9F2]/60 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <I style={{ width: 18, height: 18 }} />

                        {label}
                    </button>
                ))}

            </nav>


            <div className="mt-auto px-3 py-3 rounded-lg bg-white/5 text-xs text-[#FFF9F2]/50 leading-relaxed">
                Orders, payouts and menu edits sync here in real time once your
                restaurant is live.
            </div>

        </aside>
    );
}

export default Sidebar;