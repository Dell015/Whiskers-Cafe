"use client";

import Image from "next/image";
import { SHOTS, shot } from "@/lib/gallery";
import { SITE, type PageId } from "@/lib/site";
import {
  BODY,
  Band,
  Card,
  PAGE_ROOT,
  PageFooter,
  Paw,
  Placeholder,
  Polaroid,
  Reveal,
  SectionHeading,
  Squiggle,
} from "../ui";

const SIGNATURE = [
  {
    src: "/images/menu/signature-coffee.webp",
    name: "Whiskers Signature Coffee",
    price: "₱265",
    pos: "50% 8%",
  },
  {
    src: "/images/menu/biscoff-cloud-latte.webp",
    name: "Biscoff Cloud Latte",
    price: "₱235 / ₱265 oat",
    pos: "50% 8%",
  },
  {
    src: "/images/menu/uji-rose-matcha.webp",
    name: "UJI Rose Matcha",
    price: "₱320",
    pos: "50% 12%",
  },
  {
    src: "/images/menu/rose-americano.webp",
    name: "Rose Americano",
    price: "₱185 hot · ₱195 cold",
    pos: "50% 12%",
  },
];

const SHOTS_COUNT = SHOTS.length;

const BENTO: { id: string; cls: string; pos?: string }[] = [
  { id: "inside/main-bar", cls: "col-span-2 row-span-2", pos: "50% 65%" },
  { id: "inside/lounge-plants", cls: "" },
  { id: "bar/pulling-a-shot", cls: "row-span-2" },
  { id: "bar/golden-hour", cls: "" },
  { id: "cats/kitten-tree", cls: "" },
  { id: "bar/photo-wall", cls: "" },
];

export default function Home({
  active,
  go,
}: {
  active: boolean;
  go: (id: PageId) => void;
}) {
  return (
    <div className={PAGE_ROOT}>
      <Band>
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Reveal active={active}>
              <p className="font-hand text-3xl text-tan md:text-4xl">
                a cozy cat cafe in Cauayan City
              </p>
            </Reveal>
            <Reveal active={active} delay={0.08}>
              <h1 className="mt-2 font-display text-[clamp(3.75rem,8vw,8.5rem)] font-bold leading-[0.88] text-paper">
                Every sip creates a{" "}
                <span className="text-glow">meowment.</span>
              </h1>
            </Reveal>
            <Reveal active={active} delay={0.16}>
              <Squiggle className="mt-6" />
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-paper/85">
                Coffee, matcha and comfort food, with the cafe cats keeping you
                company. Find the menu, meet the cats and plan your visit, all
                in one place.
              </p>
            </Reveal>
            <Reveal
              active={active}
              delay={0.24}
              className="mt-9 flex flex-wrap gap-4"
            >
              <button
                onClick={() => go("visit")}
                className="rounded-full bg-paper px-8 py-3.5 text-lg font-bold text-ink shadow-[0_6px_0_0_#c9a574] transition active:translate-y-1 active:shadow-none"
              >
                Visit us
              </button>
              <button
                onClick={() => go("menu")}
                className="rounded-full border-2 border-paper px-8 py-3.5 text-lg font-bold text-paper transition hover:bg-paper/15"
              >
                See the menu
              </button>
            </Reveal>
          </div>

          <Reveal
            active={active}
            delay={0.12}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:max-w-md"
          >
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] border-2 border-dashed border-tan/60"
            />
            <div className="absolute inset-0 overflow-hidden rounded-t-[999px] border-[6px] border-paper bg-paper-deep shadow-[0_24px_40px_-16px_rgba(0,0,0,0.6)]">
              <Image
                src={shot("inside/main-bar").src}
                alt="The curved wooden bar at Whiskers Cafe, lit by warm pendant lamps"
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 24rem"
                className="object-cover"
                style={{ objectPosition: "50% 70%" }}
              />
            </div>

            <div className="absolute -left-3 top-12 aspect-square w-[38%] sm:-left-8 overflow-hidden rounded-full border-4 border-white bg-paper shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/logo.webp"
                alt="Whiskers Cafe logo: a tabby cat hugging a slice of strawberry cake"
                fill
                sizes="160px"
                className="scale-[1.12] object-cover"
              />
            </div>

            <div className="absolute -right-2 top-10 rotate-12 sm:-right-5 rounded-full bg-rose-soft px-5 py-3 text-center font-hand text-2xl leading-none text-ink shadow-lg">
              open since
              <br />
              Feb 2026
            </div>

            <Polaroid
              src={shot("cats/white-tower").src}
              alt="A fluffy white cat sitting on top of a cat tree"
              caption="hello!"
              aspect="4/5"
              rotate={6}
              className="absolute -bottom-8 -right-3 w-[40%] sm:-right-8"
              sizes="170px"
              objectPosition="50% 30%"
            />
            <Polaroid
              src={shot("cats/tortoise-glasses").src}
              alt="A fluffy white cat wearing tortoise-shell glasses"
              aspect="4/5"
              rotate={-7}
              className="absolute -bottom-6 -left-2 w-[34%] sm:-left-6"
              sizes="150px"
              objectPosition="50% 35%"
            />
          </Reveal>
        </div>
      </Band>

      <div className={BODY}>
        {/* Quick facts */}
        <section className="grid gap-6 md:grid-cols-3">
          <Reveal active={active}>
            <Card className="h-full">
              <p className="font-hand text-2xl text-cocoa">find us</p>
              <p className="mt-1 font-display text-3xl font-bold leading-tight">
                {SITE.addressLines[0]}
                <br />
                {SITE.addressLines[1]}
              </p>
              <p className="mt-1 text-sm text-ink/75">{SITE.addressNote}</p>
              <button
                onClick={() => go("visit")}
                className="mt-4 rounded-full border-2 border-ink px-5 py-2 font-bold text-ink transition hover:bg-rose-soft"
              >
                Map and directions
              </button>
            </Card>
          </Reveal>
          <Reveal active={active} delay={0.08}>
            <Card className="h-full">
              <p className="font-hand text-2xl text-cocoa">opening hours</p>
              <p className="mt-1 font-display text-3xl font-bold leading-tight">
                To be confirmed
              </p>
              <p className="mt-1 text-sm text-ink/75">
                Their grand opening day ran 1:00 PM to 10:00 PM. The cafe will
                add regular hours here.
              </p>
              <div className="mt-3">
                <Placeholder>Placeholder</Placeholder>
              </div>
            </Card>
          </Reveal>
          <Reveal active={active} delay={0.16}>
            <Card className="h-full">
              <p className="font-hand text-2xl text-cocoa">the residents</p>
              <p className="mt-1 font-display text-3xl font-bold leading-tight">
                Meet the cats
              </p>
              <p className="mt-1 text-sm text-ink/75">
                Fluffy, sleepy, and occasionally in glasses.
              </p>
              <button
                onClick={() => go("cats")}
                className="mt-4 rounded-full border-2 border-ink px-5 py-2 font-bold text-ink transition hover:bg-rose-soft"
              >
                Say hi
              </button>
            </Card>
          </Reveal>
        </section>

        {/* Halloween strip */}
        <Reveal active={active} className="mt-16">
          <button
            onClick={() => go("events")}
            className="group relative flex w-full flex-col items-start gap-3 overflow-hidden rounded-[28px] bg-bean bean-pattern px-6 py-8 text-left text-paper md:flex-row md:items-center md:justify-between md:px-12"
          >
            <span>
              <span className="font-hand text-3xl text-glow">
                latest from their posts
              </span>
              <span className="block font-display text-5xl font-bold leading-none md:text-6xl">
                Halloween Candy Hunt
              </span>
              <span className="mt-3 block max-w-xl text-lg text-paper/85">
                Oct 31 to Nov 2. Spend ₱300, find a hidden candy, get a free
                cookie or egg tart.
              </span>
            </span>
            <span className="rounded-full bg-glow px-7 py-3.5 text-lg font-bold text-ink transition group-hover:translate-x-1">
              See how it works
            </span>
          </button>
        </Reveal>

        {/* Signature sips */}
        <section className="mt-24">
          <SectionHeading kicker="from the menu" title="Signature sips" />
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {SIGNATURE.map((d, i) => (
              <Reveal
                key={d.name}
                active={active}
                delay={0.06 * i}
                rotate={i % 2 ? 1.5 : -1.5}
              >
                <Polaroid
                  src={d.src}
                  alt={d.name}
                  caption={d.name}
                  sub={d.price}
                  aspect="4/5"
                  objectPosition={d.pos}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                />
              </Reveal>
            ))}
          </div>
          <button
            onClick={() => go("menu")}
            className="mt-10 rounded-full bg-ink px-8 py-3.5 text-lg font-bold text-paper shadow-[0_6px_0_0_#2a160a] transition active:translate-y-1 active:shadow-none"
          >
            Browse the full menu
          </button>
        </section>

        {/* The space */}
        <section className="mt-24">
          <SectionHeading kicker="a peek inside" title="The space">
            Warm wood, soft lighting and plenty of corners to settle into.
          </SectionHeading>
          <div className="mt-10 grid grid-cols-2 auto-rows-[10rem] gap-3 sm:auto-rows-[13rem] md:gap-4 lg:grid-cols-4 lg:auto-rows-[15rem]">
            {BENTO.map((t, i) => {
              const sh = shot(t.id);
              return (
                <Reveal
                  key={t.id}
                  active={active}
                  delay={0.05 * i}
                  className={`relative overflow-hidden rounded-2xl border-4 border-white bg-paper-deep shadow-[0_10px_20px_-12px_rgba(74,42,23,0.7)] ${t.cls}`}
                >
                  <Image
                    src={sh.src}
                    alt={sh.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: t.pos ?? "50% 50%" }}
                  />
                  <span className="absolute bottom-2 left-2 rounded-full bg-paper/90 px-3 py-0.5 font-hand text-lg leading-tight text-ink">
                    {sh.caption}
                  </span>
                </Reveal>
              );
            })}
            <button
              onClick={() => go("gallery")}
              className="col-span-2 flex items-center justify-center gap-3 rounded-2xl bg-ink px-6 text-paper shadow-[0_6px_0_0_#2a160a] transition active:translate-y-1 active:shadow-none"
            >
              <span className="font-display text-3xl font-bold">
                See all {SHOTS_COUNT} photos
              </span>
              <span aria-hidden className="text-2xl">→</span>
            </button>
          </div>
        </section>

        <div className="mt-14 flex items-center gap-3 text-latte">
          <Paw className="h-6 w-6" />
          <Paw className="h-5 w-5 rotate-12" />
          <Paw className="h-4 w-4 rotate-[24deg]" />
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
