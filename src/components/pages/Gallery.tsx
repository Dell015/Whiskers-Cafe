"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GROUPS, SHOTS, shot, type Group } from "@/lib/gallery";
import Lightbox from "../Lightbox";
import {
  BODY,
  PAGE_ROOT,
  PageFooter,
  PageHeader,
  Polaroid,
  Reveal,
} from "../ui";

export default function Gallery({ active }: { active: boolean }) {
  const [filter, setFilter] = useState<Group | "all">("all");
  const [open, setOpen] = useState<number | null>(null);

  const shown = filter === "all" ? SHOTS : SHOTS.filter((s) => s.group === filter);
  const count = (id: Group | "all") =>
    id === "all" ? SHOTS.length : SHOTS.filter((s) => s.group === id).length;

  return (
    <div className={PAGE_ROOT}>
      <PageHeader
        variant="sage"
        kicker="take a look around"
        title="Look around"
        aside={
          <div aria-hidden className="relative mx-auto h-64 w-full max-w-sm md:h-72">
            <Polaroid
              src={shot("inside/main-bar").src}
              alt=""
              aspect="3/4"
              rotate={-7}
              className="absolute left-0 top-6 w-[44%]"
              sizes="180px"
              objectPosition="50% 60%"
            />
            <Polaroid
              src={shot("bar/golden-hour").src}
              alt=""
              aspect="3/4"
              rotate={4}
              className="absolute left-[28%] top-0 z-10 w-[44%]"
              sizes="180px"
            />
            <Polaroid
              src={shot("cats/white-tower").src}
              alt=""
              aspect="3/4"
              rotate={9}
              className="absolute left-[54%] top-10 w-[44%]"
              sizes="180px"
            />
          </div>
        }
      >
        <p>
          The lounge, the bar, the cat room and everything in between.{" "}
          {SHOTS.length} photos from the cafe&apos;s own posts. Tap any photo to
          see it bigger.
        </p>
      </PageHeader>

      <div className={BODY}>
        <Reveal active={active}>
          <div
            role="tablist"
            aria-label="Photo groups"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0"
          >
            {GROUPS.map((g) => {
              const selected = g.id === filter;
              return (
                <button
                  key={g.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(g.id)}
                  className="relative shrink-0 rounded-full border-2 border-ink/80 px-4 py-1.5 font-display text-xl font-bold"
                >
                  {selected && (
                    <motion.span
                      layoutId="gallery-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                  <span className={`relative ${selected ? "text-paper" : ""}`}>
                    {g.label}
                    <span className={`ml-1.5 text-sm ${selected ? "text-paper/70" : "text-ink/55"}`}>
                      {count(g.id)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-8 columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4"
        >
          {shown.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setOpen(i)}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border-4 border-white bg-paper-deep text-left shadow-[0_8px_18px_-10px_rgba(74,42,23,0.6)] md:mb-5"
              style={{ aspectRatio: s.aspect }}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-2 pt-8 font-hand text-xl leading-tight text-white">
                {s.caption}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      <PageFooter />
      <Lightbox
        shots={shown}
        index={open}
        onClose={() => setOpen(null)}
        onChange={setOpen}
      />
    </div>
  );
}
