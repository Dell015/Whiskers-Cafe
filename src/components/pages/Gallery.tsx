"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { GROUPS, SHOTS, shot, type Group, type Shot } from "@/lib/gallery";
import Lightbox from "../Lightbox";
import {
  BODY,
  PAGE_ROOT,
  PageFooter,
  PageHeader,
  Polaroid,
  Reveal,
} from "../ui";

/** One masonry column that drifts against the scroll, up and down. */
function Column({
  shots,
  shown,
  progress,
  offset,
  root,
  onOpen,
}: {
  shots: Shot[];
  shown: Shot[];
  progress: MotionValue<number>;
  offset: number;
  root: RefObject<HTMLElement | null>;
  onOpen: (i: number) => void;
}) {
  const y = useTransform(progress, [0, 1], [offset, -offset]);
  return (
    <motion.div style={{ y }} className="flex flex-1 flex-col gap-3 md:gap-5">
      {shots.map((s) => (
        <motion.button
          key={s.id}
          onClick={() => onOpen(shown.indexOf(s))}
          aria-label={s.alt}
          initial={{ opacity: 0, scale: 0.9, rotate: -1.5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ root, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="group relative block w-full overflow-hidden rounded-2xl border-4 border-white bg-paper-deep shadow-[0_8px_18px_-10px_rgba(74,42,23,0.6)]"
          style={{ aspectRatio: s.aspect }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </motion.button>
      ))}
    </motion.div>
  );
}

function useColumnCount() {
  const [n, setN] = useState(2);
  useEffect(() => {
    const calc = () =>
      setN(window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2);
    const id = requestAnimationFrame(calc);
    window.addEventListener("resize", calc);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", calc);
    };
  }, []);
  return n;
}

export default function Gallery({ active }: { active: boolean }) {
  const [filter, setFilter] = useState<Group | "all">("all");
  const [open, setOpen] = useState<number | null>(null);

  const cols = useColumnCount();
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      rootRef.current = gridRef.current?.closest<HTMLElement>("[data-board-scroller]") ?? null;
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  const { scrollYProgress } = useScroll({
    container: ready ? rootRef : undefined,
    target: gridRef,
    offset: ["start end", "end start"],
  });

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

        <div
          ref={gridRef}
          key={filter}
          className="mt-8 flex items-start gap-3 pb-16 md:gap-5"
        >
          {Array.from({ length: cols }, (_, c) => (
            <Column
              key={`${filter}-${cols}-${c}`}
              shots={shown.filter((_, i) => i % cols === c)}
              shown={shown}
              progress={scrollYProgress}
              offset={reduce ? 0 : (c % 2 ? -1 : 1) * (cols === 2 ? 28 : 60)}
              root={rootRef}
              onOpen={setOpen}
            />
          ))}
        </div>
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
