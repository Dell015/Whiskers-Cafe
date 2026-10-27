"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MENU, peso, type Group } from "@/lib/menu";
import {
  PAGE_ROOT,
  BODY,
  Band,
  PageFooter,
  Polaroid,
  Reveal,
  SectionHeading,
} from "../ui";

function GroupBlock({ group }: { group: Group }) {
  const cols = group.cols;
  return (
    <section className="mb-9 break-inside-avoid">
      {(group.title || group.note || cols) && (
        <div className="mb-1 flex items-end justify-between gap-3 border-b-2 border-ink/80 pb-1">
          <div>
            {group.title && (
              <h3 className="font-display text-3xl font-bold leading-none">
                {group.title}
              </h3>
            )}
            {group.note && (
              <p className="font-hand text-xl text-cocoa">{group.note}</p>
            )}
          </div>
          {cols && (
            <div className="flex text-xs font-bold uppercase tracking-wide text-cocoa">
              {cols.map((c) => (
                <span key={c} className="w-[4.5rem] text-right">
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      <ul>
        {group.items.map((item) => (
          <li
            key={item.name}
            className="flex items-baseline gap-3 border-b border-dotted border-cocoa/40 py-2"
          >
            <span className="flex-1">
              <span className="font-semibold">{item.name}</span>
              {item.note && (
                <span className="block text-xs text-ink/65">{item.note}</span>
              )}
            </span>
            {item.display ? (
              <span className="max-w-[9rem] text-right text-sm font-bold tabular-nums">
                {item.display}
              </span>
            ) : (
              <span className="flex font-bold tabular-nums">
                {item.prices.map((p, i) => (
                  <span
                    key={i}
                    className={`w-[4.5rem] text-right ${p == null ? "text-ink/30" : ""}`}
                  >
                    {peso(p)}
                  </span>
                ))}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Menu({ active }: { active: boolean }) {
  const [tab, setTab] = useState(MENU[0].id);
  const current = MENU.find((c) => c.id === tab) ?? MENU[0];

  return (
    <div className={PAGE_ROOT}>
      <Band>
      <Reveal active={active}>
        <SectionHeading tone="light" kicker="sip and snack" title="The menu">
          Easy to scan on a phone, and no need to scroll back through old
          Facebook posts to find it.
        </SectionHeading>
        <p className="mt-3 inline-block rounded-md bg-rose-soft px-3 py-1.5 text-sm text-ink/80">
          Prices come from the cafe&apos;s posted menu and may change. Please
          confirm with the cafe.
        </p>
      </Reveal>
      </Band>
      <div className={BODY}>

      <div
        role="tablist"
        aria-label="Menu categories"
        className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0"
      >
        {MENU.map((c) => {
          const selected = c.id === tab;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(c.id)}
              className="relative shrink-0 rounded-full border-2 border-ink/80 px-4 py-1.5 font-display text-xl font-bold"
            >
              {selected && (
                <motion.span
                  layoutId="menu-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              )}
              <span className={`relative ${selected ? "text-paper" : ""}`}>
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_17rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={current.groups.length > 1 || current.groups[0].items.length > 9 ? "md:columns-2 md:gap-12" : ""}
          >
            {current.groups.map((g, i) => (
              <GroupBlock key={g.title ?? i} group={g} />
            ))}
          </motion.div>
        </AnimatePresence>

        {current.photos.length > 0 && (
          <aside
            aria-label={`${current.label} photos`}
            className="flex flex-wrap justify-center gap-6 lg:flex-col lg:items-center"
          >
            {current.photos.map((p, i) => (
              <Polaroid
                key={p.src}
                src={p.src}
                alt={p.caption}
                caption={p.caption}
                aspect={p.aspect}
                objectPosition={p.pos}
                rotate={i % 2 ? 2.5 : -2.5}
                className="w-40 lg:w-52"
                sizes="220px"
              />
            ))}
          </aside>
        )}
      </div>

      </div>
      <PageFooter />
    </div>
  );
}
