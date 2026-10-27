"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HOUSE_RULES } from "@/lib/site";
import { shot } from "@/lib/gallery";
import {
  Card,
  PAGE_ROOT,
  BODY,
  PageHeader,
  PageFooter,
  Placeholder,
  Polaroid,
  Reveal,
} from "../ui";

function CatBubbles({ active }: { active: boolean }) {
  const bubbles = [
    { src: shot("cats/black-monalisa").src, pos: "50% 60%", cls: "left-0 top-12", delay: 0 },
    { src: shot("cats/white-tower").src, pos: "50% 30%", cls: "left-[23%] top-0", delay: 0.5 },
    { src: shot("cats/blue-glasses").src, pos: "50% 40%", cls: "left-[46%] top-16", delay: 1 },
    { src: shot("cats/kitten-tree").src, pos: "50% 45%", cls: "left-[69%] top-4", delay: 1.5 },
  ];
  return (
    <div aria-hidden className="relative mx-auto h-64 w-full max-w-md md:h-72">
      {bubbles.map((b) => (
        <motion.div
          key={b.src}
          className={`absolute h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-[0_10px_24px_-8px_rgba(74,42,23,0.6)] md:h-[8.5rem] md:w-[8.5rem] ${b.cls}`}
          animate={{ y: active ? [0, -10, 0] : 0 }}
          transition={
            active
              ? { duration: 4, repeat: Infinity, ease: "easeInOut", delay: b.delay }
              : { duration: 0 }
          }
        >
          <Image
            src={b.src}
            alt=""
            fill
            sizes="140px"
            className="object-cover"
            style={{ objectPosition: b.pos }}
          />
        </motion.div>
      ))}
    </div>
  );
}

const CATS = [
  {
    src: shot("cats/black-monalisa").src,
    alt: "A fluffy black cat with yellow eyes lying in front of a Mona Lisa print",
    photo: "Fluffy black cat, lounging in a Mona Lisa frame",
    rotate: -2,
    pos: "50% 60%",
  },
  {
    src: shot("cats/white-tower").src,
    alt: "A fluffy white cat sitting on top of a wooden cat tree",
    photo: "White fluffy cat, king of the cat tree",
    rotate: 1.5,
    pos: "50% 35%",
  },
  {
    src: shot("cats/blue-glasses").src,
    alt: "A sleepy white and brown cat wearing round blue glasses",
    photo: "Snoozing in a pair of blue glasses",
    rotate: -1,
    pos: "50% 45%",
  },
  {
    src: shot("cats/kitten-tree").src,
    alt: shot("cats/kitten-tree").alt,
    photo: shot("cats/kitten-tree").caption,
    rotate: -1.5,
    pos: "50% 45%",
  },
  {
    src: shot("cats/black-blanket").src,
    alt: shot("cats/black-blanket").alt,
    photo: shot("cats/black-blanket").caption,
    rotate: 1,
    pos: "50% 50%",
  },
];

export default function Cats({ active }: { active: boolean }) {
  return (
    <div className={PAGE_ROOT}>
      <PageHeader
        variant="rose"
        kicker="the real bosses"
        title="Meet the cats"
        aside={<CatBubbles active={active} />}
      >
        <p>
          Every cafe cat gets a profile card: name, personality and whether
          they are a resident or looking for a home.
        </p>
        <div className="mt-4">
          <Placeholder>Names and details are placeholders</Placeholder>
        </div>
      </PageHeader>
      <div className={BODY}>

      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {CATS.map((c, i) => (
          <Reveal key={c.src} active={active} delay={0.08 * i}>
            <Polaroid
              src={c.src}
              alt={c.alt}
              rotate={c.rotate}
              aspect="3/4"
              objectPosition={c.pos}
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 80vw"
              caption={`Cat no. ${i + 1}`}
              sub={
                <div className="space-y-1.5">
                  <p>{c.photo}</p>
                  <dl className="space-y-1 text-xs text-ink/70">
                    <div className="flex gap-1.5">
                      <dt className="font-bold">Name:</dt>
                      <dd>coming soon</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="font-bold">Personality:</dt>
                      <dd>to be added by the cafe</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="font-bold">Status:</dt>
                      <dd>resident or adoptable, to be confirmed</dd>
                    </div>
                  </dl>
                </div>
              }
            />
          </Reveal>
        ))}
      </div>

      <section className="mt-20">
        <Reveal active={active}>
          <div className="relative mx-auto mb-14 aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-[28px] border-[6px] border-white shadow-[0_18px_30px_-14px_rgba(74,42,23,0.7)] sm:aspect-[16/9]">
            <Image
              src={shot("cats/cat-room").src}
              alt={shot("cats/cat-room").alt}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-4 py-1 font-hand text-2xl text-ink">
              the cat room
            </span>
          </div>
          <Card className="mx-auto max-w-2xl">
            <p className="font-hand text-2xl text-cocoa">cat etiquette</p>
            <h3 className="font-display text-4xl font-bold leading-tight">
              House rules{" "}
              {HOUSE_RULES.length === 0 && (
                <span className="align-middle">
                  <Placeholder>To be added by the cafe</Placeholder>
                </span>
              )}
            </h3>
            {HOUSE_RULES.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-lg leading-relaxed text-ink/85">
                {HOUSE_RULES.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            ) : (
              <>
                <ul className="mt-4 space-y-4">
                  {["Rule one", "Rule two", "Rule three"].map((label) => (
                    <li key={label} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="h-6 w-6 shrink-0 rounded-full border-2 border-dashed border-cocoa/40"
                      />
                      <span className="flex-1 border-b-2 border-dashed border-cocoa/30 pb-1 text-ink/50">
                        {label}, written by the cafe
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-ink/70">
                  Handling, photos, food and drinks around the cats: the cafe
                  decides, and their rules go here.
                </p>
              </>
            )}
          </Card>
        </Reveal>
      </section>

      </div>
      <PageFooter />
    </div>
  );
}
