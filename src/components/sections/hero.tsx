"use client";

import Section from "@/components/layout/section";
import HeroBadge from "@/components/sections/hero-badge";
import { useTypewriter } from "@/components/hooks/use-typewriter";

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

export default function Hero() {
  const displayed = useTypewriter(FULL_TEXT, 30);
  const isDone = displayed.length === FULL_TEXT.length;

  const animatedRemaining = { current: displayed.length };

  return (
    <Section>
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
    </Section>
  );
}
