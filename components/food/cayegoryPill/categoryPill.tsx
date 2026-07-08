"use client";

type Props = {
  label: string;
  emoji: string;
  active: boolean;
  onClick: () => void;
};

export default function CategoryPill({ label, emoji, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon",
        active
          ? "border-maroon bg-maroon text-cream shadow-sm"
          : "border-ink/15 bg-white/60 text-ink hover:border-maroon/40 hover:bg-white",
      ].join(" ")}
    >
      <span aria-hidden className="text-base leading-none">
        {emoji}
      </span>
      {label}
    </button>
  );
}
