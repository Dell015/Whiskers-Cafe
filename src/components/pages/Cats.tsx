"use client";

import { HOUSE_RULES } from "@/lib/site";
import {
  Card,
  PAGE_ROOT,
  BODY,
  Band,
  PageFooter,
  Placeholder,
  Polaroid,
  Reveal,
  SectionHeading,
} from "../ui";

const CATS = [
  {
    src: "/images/cats/cat-black.webp",
    alt: "A fluffy black cat with yellow eyes lying in front of a Mona Lisa print",
    photo: "Fluffy black cat, lounging in a Mona Lisa frame",
    rotate: -2,
    pos: "50% 60%",
  },
  {
    src: "/images/cats/cat-tower.webp",
    alt: "A fluffy white cat sitting on top of a wooden cat tree",
    photo: "White fluffy cat, king of the cat tree",
    rotate: 1.5,
    pos: "50% 35%",
  },
  {
    src: "/images/cats/cat-blue-glasses.webp",
    alt: "A sleepy white and brown cat wearing round blue glasses",
    photo: "Snoozing in a pair of blue glasses",
    rotate: -1,
    pos: "50% 45%",
  },
  {
    src: "/images/cats/cat-tortoise-glasses.webp",
    alt: "A fluffy white cat wearing tortoise-shell round glasses",
    photo: "Fluffy white cat, very studious",
    rotate: 2,
    pos: "50% 40%",
  },
];

export default function Cats({ active }: { active: boolean }) {
  return (
    <div className={PAGE_ROOT}>
      <Band>
      <Reveal active={active}>
        <SectionHeading tone="light" kicker="the real bosses" title="Meet the cats">
          Every cafe cat gets a profile card: name, personality and whether
          they are a resident or looking for a home.
        </SectionHeading>
        <div className="mt-4">
          <Placeholder>Names and details are placeholders</Placeholder>
        </div>
      </Reveal>
      </Band>
      <div className={BODY}>

      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
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
