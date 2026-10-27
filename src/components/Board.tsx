"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { PAGES, isPageId, type PageId } from "@/lib/site";
import Banner from "./Banner";
import Nav from "./Nav";
import { Paw } from "./ui";
import Home from "./pages/Home";
import Cats from "./pages/Cats";
import Menu from "./pages/Menu";
import Events from "./pages/Events";
import Visit from "./pages/Visit";

type Size = { w: number; h: number };

const SPRING = { type: "spring", stiffness: 52, damping: 17, mass: 1 } as const;
const TRAVEL_MS = 1100;

function readHash(): PageId {
  const raw = window.location.hash.replace("#", "");
  return isPageId(raw) ? raw : "home";
}

export default function Board() {
  const [active, setActive] = useState<PageId>("home");
  const [size, setSize] = useState<Size | null>(null);
  const [instant, setInstant] = useState(true);
  const [traveling, setTraveling] = useState(false);
  const scrollers = useRef<Partial<Record<PageId, HTMLDivElement | null>>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTravel = useCallback(() => {
    setTraveling(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setTraveling(false), TRAVEL_MS);
  }, []);

  useEffect(() => {
    const measure = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    const onPop = () => {
      setActive(readHash());
      startTravel();
    };
    // Reading the hash and the window size has to wait until the client mounts.
    let settle: ReturnType<typeof setTimeout> | undefined;
    const init = requestAnimationFrame(() => {
      setActive(readHash());
      measure();
      settle = setTimeout(() => setInstant(false), 120);
    });
    window.addEventListener("resize", measure);
    window.addEventListener("popstate", onPop);
    return () => {
      cancelAnimationFrame(init);
      if (settle) clearTimeout(settle);
      window.removeEventListener("resize", measure);
      window.removeEventListener("popstate", onPop);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [startTravel]);

  const go = useCallback(
    (id: PageId) => {
      if (id === active) return;
      scrollers.current[id]?.scrollTo({ top: 0 });
      setActive(id);
      startTravel();
      window.history.pushState(null, "", `#${id}`);
    },
    [active, startTravel],
  );

  const w = size?.w ?? 0;
  const h = size?.h ?? 0;
  const gx = size ? Math.max(200, Math.round(w * 0.16)) : 0;
  const gy = size ? Math.max(200, Math.round(h * 0.16)) : 0;
  const cw = w + gx;
  const ch = h + gy;
  const here = PAGES.find((p) => p.id === active) ?? PAGES[0];
  const boardW = cw * 3 - gx;
  const boardH = ch * 2 - gy;

  const centers = PAGES.map((p) => ({
    id: p.id,
    label: p.label,
    x: p.col * cw + w / 2,
    y: p.row * ch + h / 2,
  }));

  const route = centers
    .map((c, i) => {
      if (i === 0) return `M ${c.x} ${c.y}`;
      const prev = centers[i - 1];
      const mx = (prev.x + c.x) / 2;
      const my = (prev.y + c.y) / 2;
      const bend = i % 2 ? -70 : 70;
      const horizontal = prev.y === c.y;
      return `Q ${horizontal ? mx : mx + bend} ${horizontal ? my + bend : my} ${c.x} ${c.y}`;
    })
    .join(" ");

  return (
    <MotionConfig reducedMotion="user">
      <Banner />
      <Nav active={active} go={go} />

      <div className="board-surface fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: traveling ? 0.86 : 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
        >
          <motion.div
            className="absolute left-0 top-0"
            style={{ width: boardW, height: boardH }}
            initial={false}
            animate={{ x: -here.col * cw, y: -here.row * ch }}
            transition={instant ? { duration: 0 } : SPRING}
          >
            {size && (
              <>
                <svg
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 text-rose"
                  width={boardW}
                  height={boardH}
                >
                  <path
                    d={route}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeDasharray="1 16"
                  />
                </svg>

                {centers.slice(1).map((c, i) => {
                  const prev = centers[i];
                  const dx = c.x - prev.x;
                  const arrow = dx > 0 ? "→" : dx < 0 ? "←" : "↓";
                  return (
                    <div
                      key={c.id}
                      aria-hidden
                      className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 -rotate-3 flex-col items-center text-cocoa"
                      style={{
                        left: (prev.x + c.x) / 2,
                        top: (prev.y + c.y) / 2,
                      }}
                    >
                      <Paw className="mb-1 h-7 w-7 rotate-12 text-latte" />
                      <span className="whitespace-nowrap font-hand text-3xl">
                        {c.label} {arrow}
                      </span>
                    </div>
                  );
                })}

                {PAGES.map((p) => (
                  <motion.section
                    key={p.id}
                    id={`page-${p.id}`}
                    aria-label={p.label}
                    inert={p.id !== active}
                    className="absolute overflow-hidden bg-paper paper-grain shadow-[0_24px_60px_-24px_rgba(74,42,23,0.6)]"
                    style={{
                      left: p.col * cw,
                      top: p.row * ch,
                      width: w,
                      height: h,
                    }}
                    initial={false}
                    animate={{ borderRadius: traveling ? 36 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      ref={(el) => {
                        scrollers.current[p.id] = el;
                      }}
                      className="h-full overflow-y-auto overscroll-contain"
                    >
                      {p.id === "home" && <Home active={active === "home"} go={go} />}
                      {p.id === "cats" && <Cats active={active === "cats"} />}
                      {p.id === "menu" && <Menu active={active === "menu"} />}
                      {p.id === "events" && <Events active={active === "events"} />}
                      {p.id === "visit" && <Visit active={active === "visit"} />}
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-3 rounded-[24px] border border-cocoa/25 md:inset-4"
                    />
                  </motion.section>
                ))}
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Before the window size is known, show the home page as plain markup. */}
      {!size && (
        <div className="fixed inset-0 overflow-y-auto bg-paper paper-grain">
          <Home active go={go} />
        </div>
      )}
    </MotionConfig>
  );
}
