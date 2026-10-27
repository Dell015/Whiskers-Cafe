"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { SITE } from "@/lib/site";

/** Content that settles into place when its page becomes the active one. */
export function Reveal({
  children,
  active,
  delay = 0,
  className = "",
  rotate = 0,
}: {
  children: ReactNode;
  active: boolean;
  delay?: number;
  className?: string;
  rotate?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={
        active
          ? { y: 0, rotate, opacity: 1 }
          : { y: 14, rotate: rotate * 1.6, opacity: 0.55 }
      }
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 16,
        delay: active ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

const TAPE_CLIP: CSSProperties = {
  clipPath:
    "polygon(0 0,4% 22%,0 42%,4% 62%,0 82%,0 100%,100% 100%,96% 80%,100% 60%,96% 40%,100% 20%,100% 0)",
};

export function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      style={TAPE_CLIP}
      className={`absolute z-10 block h-6 w-20 bg-rose/70 ${className}`}
    />
  );
}

export function Polaroid({
  src,
  alt,
  caption,
  sub,
  rotate = 0,
  aspect = "4/5",
  className = "",
  sizes = "(min-width: 1024px) 24vw, 70vw",
  objectPosition = "center",
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  sub?: ReactNode;
  rotate?: number;
  aspect?: string;
  className?: string;
  sizes?: string;
  objectPosition?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`relative bg-white p-3 pb-4 shadow-[0_10px_24px_-10px_rgba(74,42,23,0.55)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
      <div
        className="relative w-full overflow-hidden bg-paper-deep"
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 font-hand text-2xl leading-none text-ink">
          {caption}
        </figcaption>
      )}
      {sub && <div className="mt-1 text-sm text-ink/70">{sub}</div>}
    </figure>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 160 12"
      className={`h-3 w-40 text-rose ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path d="M3 7c10-8 16 8 26 0s16 8 26 0 16 8 26 0 16 8 26 0 16 8 26 0" />
    </svg>
  );
}

export function SectionHeading({
  kicker,
  title,
  tone = "dark",
  children,
}: {
  kicker: string;
  title: string;
  tone?: "dark" | "light";
  children?: ReactNode;
}) {
  const light = tone === "light";
  return (
    <header className="max-w-3xl">
      <p className={`font-hand text-3xl ${light ? "text-tan" : "text-cocoa"}`}>
        {kicker}
      </p>
      <h2
        className={`font-display text-6xl font-bold leading-[0.92] md:text-7xl ${
          light ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <Squiggle className="mt-4" />
      {children && (
        <div
          className={`mt-5 text-lg leading-relaxed ${
            light ? "text-paper/85" : "text-ink/80"
          }`}
        >
          {children}
        </div>
      )}
    </header>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`hand-border border-2 border-dashed border-cocoa/30 bg-paper-deep/60 p-5 ${className}`}
    >
      {children}
    </div>
  );
}

/** A small label that marks content as a stand-in until the cafe confirms it. */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-cocoa/50 bg-rose-soft px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-cocoa">
      {children}
    </span>
  );
}

export function Paw({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
    >
      <ellipse cx="32" cy="42" rx="14" ry="11" />
      <ellipse cx="14" cy="28" rx="6" ry="8" transform="rotate(-18 14 28)" />
      <ellipse cx="26" cy="16" rx="6" ry="8.5" transform="rotate(-6 26 16)" />
      <ellipse cx="40" cy="16" rx="6" ry="8.5" transform="rotate(6 40 16)" />
      <ellipse cx="52" cy="28" rx="6" ry="8" transform="rotate(18 52 28)" />
    </svg>
  );
}

export function PageFooter() {
  return (
    <footer className="relative mt-24 bg-bean bean-pattern text-paper/85">
      <div aria-hidden className="scallop-up absolute inset-x-0 -top-6 h-6" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-5 pb-28 pt-12 md:grid-cols-[auto_1fr] md:gap-10 md:px-10 md:pb-12">
        <div className="flex items-center gap-3">
          <span className="relative block h-16 w-16 overflow-hidden rounded-full border-2 border-paper/70 bg-paper">
            <Image
              src="/images/logo.webp"
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          </span>
          <span className="font-display text-3xl font-bold text-paper">
            {SITE.name}
          </span>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="font-bold text-paper">
            Concept mockup by {SITE.credit}. Not affiliated with or endorsed
            by {SITE.name}.
          </p>
          <p className="mt-1">
            The logo, photos, menu, flyers and artwork shown here belong to{" "}
            {SITE.name} and were taken from their public Facebook posts for
            this concept only. Hours, cat details and rules marked as
            placeholders are not confirmed.
          </p>
        </div>
      </div>
    </footer>
  );
}

/** The brown header band with a scalloped lower edge that opens every page. */
export function Band({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative z-10 bg-bean bean-pattern text-paper ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-24 md:px-10 md:pb-24 md:pt-36">
        {children}
      </div>
      <div aria-hidden className="scallop-down absolute inset-x-0 -bottom-6 h-6" />
    </div>
  );
}

export const PAGE_ROOT = "flex min-h-full flex-col";
export const BODY =
  "mx-auto w-full max-w-7xl flex-1 px-5 pt-16 md:px-10 md:pt-24";
