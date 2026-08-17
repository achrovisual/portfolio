"use client";

import { useState } from "react";
import { getVersion } from "@/lib/version";

export default function VersionBadge() {
  const [hovered, setHovered] = useState(false);
  const version = getVersion();

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-foreground font-mono text-xs cursor-default inline-block min-w-[180px] text-right"
    >
      {hovered ? "Built with Next.js & Tailwind" : `v${version}`}
    </span>
  );
}
