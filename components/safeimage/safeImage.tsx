"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

type SafeImageProps = Omit<ImageProps, "onError" | "src"> & {
    src?: string | null;
    /** Text used to render an initial-letter placeholder if the image fails or is missing */
    fallbackLabel: string;
};

/**
 * Wraps next/image so a missing or broken image never leaves a blank box —
 * falls back to a soft-tinted initial instead of a broken-image icon.
 */
export default function SafeImage({
    src,
    fallbackLabel,
    className,
    alt,
    ...props
}: SafeImageProps) {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return (
            <div
                className={`flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-400 font-semibold ${className ?? ""}`}
                aria-hidden={alt === ""}
                role={alt ? "img" : undefined}
                aria-label={alt || undefined}
            >
                {fallbackLabel.charAt(0).toUpperCase()}
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            className={className}
            onError={() => setFailed(true)}
            {...props}
        />
    );
}