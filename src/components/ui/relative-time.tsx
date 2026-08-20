"use client";

import { useState, useEffect } from "react";

function formatRelativeTime(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diffMs / 3_600_000);

  if (hours < 1) return "just now";
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export default function RelativeTime({ date }: { date: string }) {
  const [relativeTime, setRelativeTime] = useState<string | null>(null);

  useEffect(() => {
    setRelativeTime(formatRelativeTime(date));

    const interval = setInterval(() => {
      setRelativeTime(formatRelativeTime(date));
    }, 60_000);

    return () => clearInterval(interval);
  }, [date]);

  return <span>{relativeTime ?? ""}</span>;
}
