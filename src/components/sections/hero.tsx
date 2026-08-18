"use client";

import { useState } from "react";
import Section from "@/components/layout/section";
import HeroBadge from "@/components/sections/hero-badge";
import { useTypewriter } from "@/components/hooks/use-typewriter";
import type { Segment, TechItem } from "@/types/hero";

import {
  Aws,
  Django,
  MySql,
  Github,
  Python,
  Fastapi,
  Bash,
  Cloudflare,
  NextJs,
  TailwindCss,
  Postgresql,
  Kubernetes,
  Figma,
  Terraform,
} from "@boxicons/react";

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
  {
    name: "AWS",
    text: "I can provision and manage high-availability cloud infrastructure with AWS",
    icon: Aws,
  },
  {
    name: "Kubernetes",
    text: "I can orchestrate containerized applications and workloads using Kubernetes",
    icon: Kubernetes,
  },
  {
    name: "Terraform",
    text: "I can provision multi-tier cloud infrastructure using Terraform as Infrastructure as Code",
    icon: Terraform,
  },
  {
    name: "GitHub",
    text: "I can automate CI/CD pipelines and deployment workflows with GitHub Actions",
    icon: Github,
  },
  {
    name: "Python",
    text: "I can develop backend services and infrastructure automation scripts with Python",
    icon: Python,
  },
  {
    name: "Bash",
    text: "I can script operational workflows and system tasks using Bash",
    icon: Bash,
  },
  {
    name: "Django",
    text: "I can architect secure, full-stack web applications with Django",
    icon: Django,
  },
  {
    name: "FastAPI",
    text: "I can build high-performance, asynchronous REST APIs using FastAPI",
    icon: Fastapi,
  },
  {
    name: "Next.js",
    text: "I can engineer modern, responsive web interfaces with Next.js",
    icon: NextJs,
  },
  {
    name: "Tailwind",
    text: "I can design scalable, utility-first UI components using Tailwind CSS",
    icon: TailwindCss,
  },
  {
    name: "PostgreSQL",
    text: "I can design relational database schemas and complex queries using PostgreSQL",
    icon: Postgresql,
  },
  {
    name: "MySQL",
    text: "I can manage relational data structures and storage with MySQL",
    icon: MySql,
  },
  {
    name: "Cloudflare",
    text: "I can configure DNS, edge security, and performance routing with Cloudflare",
    icon: Cloudflare,
  },
  {
    name: "Figma",
    text: "I can prototype interactive user interfaces and design systems using Figma",
    icon: Figma,
  },
];

const DEFAULT_MARQUEE_TEXT =
  "Explore my skills and tech stack by hovering over an icon";

export default function Hero() {
  const displayed = useTypewriter(FULL_TEXT, 30);
  const isDone = displayed.length === FULL_TEXT.length;
  const animatedRemaining = { current: displayed.length };

  const [hoveredText, setHoveredText] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const loopItems = [
    ...TECH_ITEMS,
    ...TECH_ITEMS,
    ...TECH_ITEMS,
    ...TECH_ITEMS,
  ];

  return (
    <Section>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {/* Invisible full-text layer — reserves final height/line-wrapping upfront */}
          <div
            className="font-serif text-2xl md:text-6xl leading-tight relative"
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
            <h1 className="absolute inset-0 font-serif text-2xl md:text-6xl leading-tight">
              {renderSegments(SEGMENTS, animatedRemaining)}
              <span
                className={`inline-block w-[3px] h-[1em] bg-foreground ml-1 align-middle ${isDone ? "animate-pulse" : ""}`}
                aria-hidden="true"
              />
            </h1>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-2 md:gap-3 mt-4 md:mt-6 font-serif">
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
          <p className="max-w-7xl mx-auto mb-4 px-4 px-8 text-sm md:text-base text-foreground">
            {hoveredText ?? DEFAULT_MARQUEE_TEXT}
          </p>

          <div className="relative overflow-hidden">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {loopItems.map((item, i) => {
                const IconComponent = item.icon;
                const isActive = activeIndex === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onPointerEnter={() => {
                      setHoveredText(item.text);
                      setActiveIndex(i);
                    }}
                    onPointerLeave={() => {
                      setHoveredText(null);
                      setActiveIndex(null);
                    }}
                    aria-label={item.name}
                    className={`flex items-center justify-center w-24 h-24 md:w-28 md:h-28 mx-2 md:mx-3 rounded-lg shrink-0
                      border border-dashed transition-colors cursor-pointer
                      ${isActive ? "border-neutral-900 dark:border-neutral-100" : "border-neutral-300 dark:border-neutral-700"}`}
                  >
                    <IconComponent
                      className={`w-8 h-8 md:w-10 md:h-10 fill-current transition-colors
                        ${isActive ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-300 dark:text-neutral-700"}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
