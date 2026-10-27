"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Shot } from "@/lib/gallery";

/**
 * Full-screen photo viewer. It renders into document.body, because the board
 * is transformed and a fixed overlay inside it would be positioned against the
 * board instead of the screen.
 */
export default function Lightbox({
  shots,
  index,
  onClose,
  onChange,
}: {
  shots: Shot[];
  index: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const total = shots.length;

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % total);
      if (e.key === "ArrowLeft") onChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onClose, onChange]);

  if (index === null || typeof document === "undefined") return null;
  const current = shots[index];
  if (!current) return null;

  const prev = () => onChange((index - 1 + total) % total);
  const next = () => onChange((index + 1) % total);

  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-full bg-paper/90 text-ink shadow-lg transition hover:bg-paper";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.caption}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-ink/90 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close photo"
        className={`${arrow} absolute right-4 top-4 z-10`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" aria-hidden>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>

      <div className="flex w-full items-center justify-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous photo"
          className={`${arrow} hidden md:flex`}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) next();
            else if (info.offset.x > 70) prev();
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative aspect-[3/4] h-[68dvh] max-h-[820px] max-w-[88vw] cursor-grab touch-pan-y overflow-hidden rounded-xl border-4 border-white bg-paper-deep shadow-2xl active:cursor-grabbing"
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(min-width: 768px) 620px, 88vw"
            className="object-cover"
            draggable={false}
          />
        </motion.div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next photo"
          className={`${arrow} hidden md:flex`}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div
        className="mt-4 text-center text-paper"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-hand text-3xl">{current.caption}</p>
        <p className="text-sm text-paper/70">
          {index + 1} of {total}
          <span className="md:hidden"> · swipe for more</span>
        </p>
      </div>
    </div>,
    document.body,
  );
}
