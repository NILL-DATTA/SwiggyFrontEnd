export function CategorySkeleton() {
    return (
        <div className="flex flex-col items-center gap-3 shrink-0" aria-hidden="true">
            <div className="w-28 h-28 rounded-full bg-neutral-100 animate-pulse" />
            <div className="w-16 h-3.5 rounded bg-neutral-100 animate-pulse" />
        </div>
    );
}

export function RestaurantCardSkeleton() {
    return (
        <div aria-hidden="true">
            <div className="w-full aspect-[4/3] rounded-2xl bg-neutral-100 animate-pulse" />
            <div className="pt-3 space-y-2">
                <div className="h-4 w-3/4 rounded bg-neutral-100 animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-neutral-100 animate-pulse" />
                <div className="h-3 w-2/3 rounded bg-neutral-100 animate-pulse" />
            </div>
        </div>
    );
}