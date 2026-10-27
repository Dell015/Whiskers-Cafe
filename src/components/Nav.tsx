"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PAGES, SITE, type PageId } from "@/lib/site";

function Icon({ id }: { id: PageId }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (id) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5M10 20v-5h4v5" />
        </svg>
      );
    case "cats":
      return (
        <svg {...common}>
          <path d="M5 9 4 3.5 8.5 6a9 9 0 0 1 7 0L20 3.5 19 9c1 1.4 1.2 3 .8 4.5C19 17 16 20 12 20s-7-3-7.8-6.5C3.800 12 4 10.400 5 9Z" />
          <path d="M9 12.500h.01M15 12.500h.01M10.500 15.500c.9.6 2.100.6 3 0" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M5 9h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V9Zm12 1.500h1.500a2.500 2.500 0 0 1 0 5H16.500M9 3.500c-.8 1 .8 1.500 0 2.500M13 3.500c-.8 1 .8 1.500 0 2.500" />
        </svg>
      );
    case "events":
      return (
        <svg {...common}>
          <path d="m12 3.500 2.200 4.700 5.100.7-3.700 3.500.9 5.100L12 15l-4.500 2.500.9-5.100L4.700 8.900l5.100-.7L12 3.500Z" />
        </svg>
      );
    case "gallery":
      return (
        <svg {...common}>
          <rect x="3.500" y="5" width="17" height="14" rx="2.500" />
          <circle cx="9" cy="10" r="1.500" />
          <path d="m4 17 5-4.500 3.500 3 3-2.500L20 16" />
        </svg>
      );
    case "visit":
      return (
        <svg {...common}>
          <path d="M12 21s-6.500-5.800-6.500-11a6.500 6.500 0 0 1 13 0c0 5.200-6.500 11-6.500 11Z" />
          <circle cx="12" cy="10" r="2.300" />
        </svg>
      );
  }
}

function MiniMap({ active }: { active: PageId }) {
  return (
    <div
      aria-hidden
      className="relative ml-1 hidden h-9 w-14 shrink-0 lg:block"
    >
      {PAGES.map((p) => (
        <span
          key={p.id}
          className={`absolute h-3.5 w-3.5 rounded-[4px] border border-cocoa/50 transition-colors ${
            p.id === active ? "bg-pumpkin" : "bg-paper-deep"
          }`}
          style={{ left: p.col * 20, top: p.row * 20 }}
        />
      ))}
    </div>
  );
}

export default function Nav({
  active,
  go,
}: {
  active: PageId;
  go: (id: PageId) => void;
}) {
  return (
    <>
      <nav
        aria-label="Main"
        className="pointer-events-none fixed inset-x-0 top-12 z-40 hidden justify-center md:flex lg:top-10"
      >
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-cocoa/25 bg-paper/90 px-2 py-1.5 shadow-[0_8px_24px_-12px_rgba(74,42,23,0.6)] backdrop-blur">
          <button
            onClick={() => go("home")}
            aria-label={`${SITE.name} home`}
            className="mr-1 h-9 w-9 overflow-hidden rounded-full border border-cocoa/20 bg-paper"
          >
            <Image
              src="/images/logo.webp"
              alt=""
              width={72}
              height={72}
              className="h-full w-full object-cover"
            />
          </button>
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => go(p.id)}
              aria-current={p.id === active ? "page" : undefined}
              className="relative rounded-full px-4 py-2 font-display text-lg font-semibold text-ink"
            >
              {p.id === active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-rose-soft"
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                />
              )}
              <span className="relative">{p.label}</span>
            </button>
          ))}
          <MiniMap active={active} />
        </div>
      </nav>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-cocoa/25 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <ul className="mx-auto flex max-w-md justify-between px-2">
          {PAGES.map((p) => (
            <li key={p.id} className="flex-1">
              <button
                onClick={() => go(p.id)}
                aria-current={p.id === active ? "page" : undefined}
                className={`relative flex w-full flex-col items-center gap-0.5 py-2 text-xs font-bold ${
                  p.id === active ? "text-pumpkin" : "text-ink/70"
                }`}
              >
                {p.id === active && (
                  <motion.span
                    layoutId="tab-dot"
                    className="absolute -top-px h-0.5 w-8 rounded-full bg-pumpkin"
                  />
                )}
                <Icon id={p.id} />
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
