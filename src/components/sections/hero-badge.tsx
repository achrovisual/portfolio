"use client";

interface HeroBadgeProps {
  emoji: string;
  label: string;
  className?: string;
  enabled: boolean;
}

export default function HeroBadge({
  emoji,
  label,
  className = "",
  enabled,
}: HeroBadgeProps) {
  return (
    <div
      className={`group flex flex-row items-center justify-center gap-0 hover:gap-2 w-14 h-14 hover:w-auto hover:justify-start hover:px-4 rounded-lg shrink-0 overflow-hidden
        transition-all duration-300 ease-out
        ${enabled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
        ${className}`}
    >
      <span aria-hidden="true" className="shrink-0 text-2xl">
        {emoji}
      </span>
      <span className="inline-block w-0 group-hover:w-auto font-medium text-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-300">
        {label}
      </span>
    </div>
  );
}
