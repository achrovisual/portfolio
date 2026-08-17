"use client";

import { useState } from "react";
import Section from "@/components/layout/section";
import HeroBadge from "@/components/sections/hero-badge";
import { useTypewriter } from "@/components/hooks/use-typewriter";
import type { Segment, TechItem } from "@/types/hero";

const SEGMENTS: Segment[] = [
  { text: "Gino is a DevOps engineer and UI designer who builds " },
  { text: "reliable platforms", underline: true },
  { text: ", " },
  { text: "bare-metal networks", underline: true },
  { text: ", and " },
  { text: "intuitive digital experiences", underline: true },
  { text: "." },
];

const FULL_TEXT = SEGMENTS.map((s) => s.text).join("");

function renderSegments(
  segments: Segment[],
  remainingRef: { current: number },
) {
  return segments.map((segment, i) => {
    const visibleChars = Math.max(
      0,
      Math.min(segment.text.length, remainingRef.current),
    );
    remainingRef.current -= segment.text.length;

    return (
      <span key={i} className={segment.underline ? "underline" : undefined}>
        {segment.text.slice(0, visibleChars)}
      </span>
    );
  });
}

const TECH_ITEMS: TechItem[] = [
  { name: "AWS", text: "I can deploy infrastructure on AWS", icon: "bxl-aws" },
  {
    name: "Django",
    text: "I can build backends with Django",
    icon: "bxl-django",
  },
  { name: "MySQL", text: "I can design schemas in MySQL", icon: "bxl-my-sql" },
  {
    name: "GitHub",
    text: "I can automate CI/CD with GitHub Actions",
    icon: "bxl-github",
  },
  {
    name: "Python",
    text: "I can script and automate with Python",
    icon: "bxl-python",
  },
  {
    name: "FastAPI",
    text: "I can build APIs with FastAPI",
    icon: "bxl-fastapi",
  },
  {
    name: "Bash",
    text: "I can automate workflows with Bash",
    icon: "bxl-bash",
  },
  {
    name: "Cloudflare",
    text: "I can manage domains using Cloudflare",
    icon: "bxl-cloudflare",
  },
  {
    name: "Next.js",
    text: "I can build frontends with Next.js",
    icon: "bxl-next-js",
  },
  {
    name: "Tailwind",
    text: "I can style interfaces with Tailwind",
    icon: "bxl-tailwind-css",
  },
  {
    name: "PostgreSQL",
    text: "I can design schemas in PostgreSQL",
    icon: "bxl-postgresql",
  },
  {
    name: "Kubernetes",
    text: "I can orchestrate containers with Kubernetes",
    icon: "bxl-kubernetes",
  },
  {
    name: "Figma",
    text: "I can design interfaces in Figma",
    icon: "bxl-figma",
  },
];

const DEFAULT_MARQUEE_TEXT = "Hover an icon to see what I can do";

export default function Hero() {
  const displayed = useTypewriter(FULL_TEXT, 30);
  const isDone = displayed.length === FULL_TEXT.length;
  const animatedRemaining = { current: displayed.length };

  const [hoveredText, setHoveredText] = useState<string | null>(null);
  const loopItems = [
    ...TECH_ITEMS,
    ...TECH_ITEMS,
    ...TECH_ITEMS,
    ...TECH_ITEMS,
  ];

  return (
    <Section>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Invisible full-text layer — reserves final height/line-wrapping upfront */}
          <div
            className="font-serif text-[64px] leading-tight relative"
            aria-hidden="true"
          >
            <span className="invisible">
              {SEGMENTS.map((s, i) => (
                <span key={i} className={s.underline ? "underline" : undefined}>
                  {s.text}
                </span>
              ))}
            </span>

            {/* Animated layer — absolutely positioned over the reserved space */}
            <h1 className="absolute inset-0 font-serif text-[64px] leading-tight">
              {renderSegments(SEGMENTS, animatedRemaining)}
              <span
                className={`inline-block w-[3px] h-[1em] bg-foreground ml-1 align-middle ${
                  isDone ? "animate-pulse" : ""
                }`}
                aria-hidden="true"
              />
            </h1>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-3 mt-6 font-serif">
            <HeroBadge
              emoji="☁️"
              label="DevOps & Platform"
              className="bg-blue-300 text-blue-950"
              enabled={isDone}
            />
            <HeroBadge
              emoji="🌐"
              label="Networking"
              className="bg-green-300 text-green-950"
              enabled={isDone}
            />
            <HeroBadge
              emoji="🎨"
              label="UI/UX Design"
              className="bg-orange-300 text-orange-950"
              enabled={isDone}
            />
            <HeroBadge
              emoji="⚡"
              label="Systems & Backend"
              className="bg-purple-300 text-purple-950"
              enabled={isDone}
            />
          </div>
        </div>

        {/* Tech marquee — breaks out of the max-w-6xl container to span the full viewport */}
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
          <p className="max-w-7xl mx-auto mb-4 px-8 text-md text-foreground">
            {hoveredText ?? DEFAULT_MARQUEE_TEXT}
          </p>

          <div className="relative overflow-hidden">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {loopItems.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHoveredText(item.text)}
                  onMouseLeave={() => setHoveredText(null)}
                  aria-label={item.name}
                  className="group flex items-center justify-center w-28 h-28 mx-3 rounded-lg shrink-0
                    border border-dashed border-neutral-300 dark:border-neutral-700
                    hover:border-neutral-900 dark:hover:border-neutral-100
                    transition-colors"
                >
                  <i
                    className={`bx ${item.icon} text-4xl text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
