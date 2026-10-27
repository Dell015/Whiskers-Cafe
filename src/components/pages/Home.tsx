"use client";

import Image from "next/image";
import { SITE, type PageId } from "@/lib/site";
import {
  Card,
  PAGE_PAD,
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
    aspect: "4/5",
    pos: "50% 8%",
  },
  {
    src: "/images/menu/biscoff-cloud-latte.webp",
    name: "Biscoff Cloud Latte",
    price: "₱235 / ₱265 oat",
    aspect: "4/5",
    pos: "50% 8%",
  },
  {
    src: "/images/menu/uji-rose-matcha.webp",
    name: "UJI Rose Matcha",
    price: "₱320",
    aspect: "4/5",
    pos: "50% 12%",
  },
  {
    src: "/images/menu/rose-americano.webp",
    name: "Rose Americano",
    price: "₱185 hot · ₱195 cold",
    aspect: "4/5",
    pos: "50% 12%",
  },
];

const SPACE = [
  {
    src: "/images/space/seating.webp",
    alt: "Lounge seating under a curved wooden arch",
    caption: "Lounge corner",
    rotate: -2,
  },
  {
    src: "/images/space/bar.webp",
    alt: "The curved bar counter with stools and warm pendant lights",
    caption: "The bar",
    rotate: 1.5,
  },
  {
    src: "/images/space/espresso-machine.webp",
    alt: "A two-group espresso machine behind the counter",
    caption: "Espresso station",
    rotate: -1,
  },
  {
    src: "/images/space/milk-shelf.webp",
    alt: "Shelves stacked with full cream and oat milk cartons",
    caption: "Oat or full cream",
    rotate: 2,
  },
];

export default function Home({
  active,
  go,
}: {
  active: boolean;
  go: (id: PageId) => void;
}) {
  return (
    <div className={PAGE_PAD}>
      {/* Hero */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal active={active}>
            <p className="font-hand text-3xl text-cocoa">
              a cozy cat cafe in Cauayan City
            </p>
          </Reveal>
          <Reveal active={active} delay={0.08}>
            <h1 className="mt-1 font-display text-6xl font-bold leading-[0.9] text-ink sm:text-7xl lg:text-8xl">
              Every sip creates a <span className="text-pumpkin">meowment.</span>
            </h1>
          </Reveal>
          <Reveal active={active} delay={0.16}>
            <Squiggle className="mt-4" />
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/80">
              Coffee, matcha and comfort food, with the cafe cats keeping you
              company. Find the menu, meet the cats and plan your visit, all in
              one place.
            </p>
          </Reveal>
          <Reveal active={active} delay={0.24} className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => go("visit")}
              className="rounded-full bg-ink px-7 py-3 font-bold text-paper shadow-[0_6px_0_0_#2a160a] transition active:translate-y-1 active:shadow-none"
            >
              Visit us
            </button>
            <button
              onClick={() => go("menu")}
              className="rounded-full border-2 border-ink bg-paper px-7 py-3 font-bold text-ink transition hover:bg-rose-soft"
            >
              See the menu
            </button>
          </Reveal>
        </div>

        <Reveal active={active} delay={0.12} className="relative mx-auto w-full max-w-md">
          <div className="relative mx-auto aspect-square w-[78%] overflow-hidden rounded-full border-4 border-white bg-paper shadow-[0_14px_30px_-12px_rgba(74,42,23,0.6)]">
            <Image
              src="/images/logo.webp"
              alt="Whiskers Cafe logo: a tabby cat hugging a slice of strawberry cake"
              fill
              priority
              sizes="(min-width: 1024px) 30vw, 70vw"
              className="object-cover"
            />
          </div>
          <Polaroid
            src="/images/cats/cat-tower.webp"
            alt="A fluffy white cat sitting on top of a cat tree"
            caption="hello!"
            aspect="4/5"
            rotate={6}
            className="absolute -right-2 -top-4 w-[34%]"
            sizes="20vw"
            objectPosition="50% 30%"
          />
          <Polaroid
            src="/images/cats/cat-tortoise-glasses.webp"
            alt="A fluffy white cat wearing tortoise-shell glasses"
            aspect="4/5"
            rotate={-7}
            className="absolute -bottom-6 -left-2 w-[32%]"
            sizes="20vw"
            objectPosition="50% 35%"
          />
        </Reveal>
      </section>

      {/* Quick facts */}
      <section className="mt-20 grid gap-5 md:grid-cols-3">
        <Reveal active={active}>
          <Card className="h-full">
            <p className="font-hand text-2xl text-cocoa">find us</p>
            <p className="mt-1 font-display text-2xl font-bold leading-tight">
              {SITE.addressLines[0]}
              <br />
              {SITE.addressLines[1]}
            </p>
            <p className="mt-1 text-sm text-ink/75">{SITE.addressNote}</p>
            <button
              onClick={() => go("visit")}
              className="mt-3 font-bold text-pumpkin underline underline-offset-4"
            >
              Map and directions
            </button>
          </Card>
        </Reveal>
        <Reveal active={active} delay={0.08}>
          <Card className="h-full">
            <p className="font-hand text-2xl text-cocoa">opening hours</p>
            <p className="mt-1 font-display text-2xl font-bold leading-tight">
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
            <p className="mt-1 font-display text-2xl font-bold leading-tight">
              Meet the cats
            </p>
            <p className="mt-1 text-sm text-ink/75">
              Fluffy, sleepy, and occasionally in glasses.
            </p>
            <button
              onClick={() => go("cats")}
              className="mt-3 font-bold text-pumpkin underline underline-offset-4"
            >
              Say hi
            </button>
          </Card>
        </Reveal>
      </section>

      {/* Halloween strip */}
      <Reveal active={active} className="mt-14">
        <button
          onClick={() => go("events")}
          className="group relative flex w-full flex-col items-start gap-2 overflow-hidden rounded-[28px] bg-ink px-6 py-6 text-left text-paper md:flex-row md:items-center md:justify-between md:px-10"
        >
          <span>
            <span className="font-hand text-2xl text-rose">
              latest from their posts
            </span>
            <span className="block font-display text-4xl font-bold leading-none md:text-5xl">
              Halloween Candy Hunt
            </span>
            <span className="mt-2 block text-paper/85">
              Oct 31 to Nov 2. Spend ₱300, find a hidden candy, get a free
              cookie or egg tart.
            </span>
          </span>
          <span className="rounded-full bg-pumpkin px-6 py-3 font-bold text-white transition group-hover:translate-x-1">
            See how it works
          </span>
        </button>
      </Reveal>

      {/* Signature sips */}
      <section className="mt-20">
        <SectionHeading kicker="from the menu" title="Signature sips" />
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {SIGNATURE.map((d, i) => (
            <Reveal key={d.name} active={active} delay={0.06 * i} rotate={i % 2 ? 1.5 : -1.5}>
              <Polaroid
                src={d.src}
                alt={d.name}
                caption={d.name}
                sub={d.price}
                aspect={d.aspect}
                objectPosition={d.pos}
                sizes="(min-width: 1024px) 20vw, 45vw"
              />
            </Reveal>
          ))}
        </div>
        <button
          onClick={() => go("menu")}
          className="mt-8 font-bold text-pumpkin underline underline-offset-4"
        >
          Browse the full menu
        </button>
      </section>

      {/* The space */}
      <section className="mt-20">
        <SectionHeading kicker="a peek inside" title="The space">
          Warm wood, soft lighting and plenty of corners to settle into.
        </SectionHeading>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {SPACE.map((s, i) => (
            <Reveal key={s.src} active={active} delay={0.06 * i}>
              <Polaroid
                src={s.src}
                alt={s.alt}
                caption={s.caption}
                rotate={s.rotate}
                aspect="3/4"
                sizes="(min-width: 1024px) 20vw, 45vw"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mt-10 flex items-center gap-3 text-latte">
        <Paw className="h-6 w-6" />
        <Paw className="h-5 w-5 rotate-12" />
        <Paw className="h-4 w-4 rotate-[24deg]" />
      </div>

      <PageFooter />
    </div>
  );
}
