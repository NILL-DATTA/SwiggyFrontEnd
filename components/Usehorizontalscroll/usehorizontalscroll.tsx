import { useCallback, useEffect, useRef, useState, RefObject } from "react";

interface UseHorizontalScrollResult {
    ref: RefObject<HTMLDivElement | null>;
    scroll: (direction: "left" | "right") => void;
    canScrollLeft: boolean;
    canScrollRight: boolean;
}

/**
 * Drives a horizontally-scrolling rail. Tracks scroll position so the
 * prev/next controls can disable themselves at the edges instead of
 * silently doing nothing.
 */
export function useHorizontalScroll(): UseHorizontalScrollResult {
    const ref = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateEdges = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft < maxScroll - 4);
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        updateEdges();

        el.addEventListener("scroll", updateEdges, { passive: true });
        const resizeObserver = new ResizeObserver(updateEdges);
        resizeObserver.observe(el);

        return () => {
            el.removeEventListener("scroll", updateEdges);
            resizeObserver.disconnect();
        };
    }, [updateEdges]);

    const scroll = useCallback((direction: "left" | "right") => {
        const el = ref.current;
        if (!el) return;
        const amount = el.clientWidth * 0.85;
        el.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    }, []);

    return { ref, scroll, canScrollLeft, canScrollRight };
}