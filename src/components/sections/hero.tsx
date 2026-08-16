"use client";

import Section from "@/components/layout/section";
import { useTypewriter } from "@/components/hooks/use-typewriter";
import HeroBadge from "@/components/sections/hero-badge";

interface Segment {
  text: string;
  underline?: boolean;
}

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

export default function Hero() {
  const displayed = useTypewriter(FULL_TEXT, 30);
  const isDone = displayed.length === FULL_TEXT.length;

  let remaining = displayed.length;

  return (
    <Section>
      <div className="flex flex-col">
        <h1 className="font-serif text-5xl md:text-6xl leading-tight">
          {SEGMENTS.map((segment, i) => {
            const visibleChars = Math.max(
              0,
              Math.min(segment.text.length, remaining),
            );
            remaining -= segment.text.length;

            return (
              <span
                key={i}
                className={segment.underline ? "underline" : undefined}
              >
                {segment.text.slice(0, visibleChars)}
              </span>
            );
          })}
          <span
            className={`inline-block w-[3px] h-[1em] bg-foreground ml-1 align-middle ${
              isDone ? "animate-pulse" : ""
            }`}
            aria-hidden="true"
          />
        </h1>
        <div className="flex flex-row flex-wrap items-center gap-3 mt-6">
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
    </Section>
  );
}
