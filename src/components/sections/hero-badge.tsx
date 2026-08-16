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
      className={`group flex flex-row items-center justify-center gap-0 hover:gap-2 w-9 h-9 hover:w-auto hover:justify-start hover:px-4 rounded-full shrink-0 overflow-hidden
        transition-all duration-300
        ${enabled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
        ${className}`}
    >
      <span aria-hidden="true" className="shrink-0">
        {emoji}
      </span>
      <span className="font-medium text-sm max-w-0 group-hover:max-w-xs opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all duration-300">
        {label}
      </span>
    </div>
  );
}
