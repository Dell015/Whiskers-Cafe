"use client";

import {
  Card,
  PAGE_PAD,
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
    <div className={PAGE_PAD}>
      <Reveal active={active}>
        <SectionHeading kicker="the real bosses" title="Meet the cats">
          Every cafe cat gets a profile card: name, personality and whether
          they are a resident or looking for a home.
        </SectionHeading>
        <div className="mt-4">
          <Placeholder>Names and details are placeholders</Placeholder>
        </div>
      </Reveal>

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

      <section className="mt-20 grid gap-5 md:grid-cols-2">
        <Reveal active={active}>
          <Card className="h-full">
            <p className="font-hand text-2xl text-cocoa">how this works</p>
            <h3 className="font-display text-3xl font-bold">
              Easy for the cafe to update
            </h3>
            <p className="mt-2 leading-relaxed text-ink/80">
              In a finished version, adding a new cat or marking one as adopted
              would be a quick edit to a single list, so the page never goes
              stale like a pinned Facebook post can.
            </p>
          </Card>
        </Reveal>
        <Reveal active={active} delay={0.08}>
          <Card className="h-full">
            <p className="font-hand text-2xl text-cocoa">cat etiquette</p>
            <h3 className="font-display text-3xl font-bold">
              House rules <span className="align-middle"><Placeholder>Sample</Placeholder></span>
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-ink/80">
              <li>Let the cats come to you.</li>
              <li>Be gentle, and never pick a cat up.</li>
              <li>No flash photos, please.</li>
              <li>Keep food and drinks away from the cats.</li>
            </ul>
            <p className="mt-3 text-sm text-ink/70">
              Generic cat cafe etiquette as a stand-in. The cafe sets the real
              rules.
            </p>
          </Card>
        </Reveal>
      </section>

      <PageFooter />
    </div>
  );
}
