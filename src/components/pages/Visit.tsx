"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";
import {
  Card,
  PAGE_PAD,
  PageFooter,
  Paw,
  Placeholder,
  Reveal,
  SectionHeading,
} from "../ui";

function MapSketch() {
  return (
    <svg
      viewBox="0 0 400 260"
      role="img"
      aria-label="Hand-drawn map placeholder with a pin"
      className="h-full w-full"
    >
      <rect width="400" height="260" fill="#f5e6cf" />
      <g stroke="#b98a5a" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.55">
        <path d="M-10 70 C 120 60, 200 120, 410 90" />
        <path d="M110 -10 C 130 80, 90 170, 150 270" />
        <path d="M-10 200 C 140 180, 260 230, 410 190" />
      </g>
      <g fill="#dca597" opacity="0.5">
        <rect x="190" y="120" width="60" height="40" rx="8" />
        <rect x="270" y="30" width="70" height="36" rx="8" />
        <rect x="30" y="100" width="56" height="44" rx="8" />
        <rect x="300" y="190" width="64" height="40" rx="8" />
      </g>
      <g transform="translate(205 112)">
        <path
          d="M0 40C-20 18-26 6-26-8a26 26 0 0 1 52 0c0 14-6 26-26 48Z"
          fill="#e0762b"
          stroke="#4a2a17"
          strokeWidth="3"
        />
        <circle cx="0" cy="-8" r="9" fill="#fff7ea" />
      </g>
    </svg>
  );
}

export default function Visit({ active }: { active: boolean }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [note, setNote] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const subject = `Visit inquiry from ${name || "a customer"}`;
    const body = `Hi Whiskers Cafe!\n\nName: ${name}\nPreferred date: ${date || "flexible"}\nGuests: ${guests}\n\n${note}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full rounded-lg border-2 border-cocoa/30 bg-white px-3 py-2 text-ink focus:border-pumpkin focus:outline-none";

  return (
    <div className={PAGE_PAD}>
      <Reveal active={active}>
        <SectionHeading kicker="come say hi" title="Plan your visit">
          Where to find us, when to come, and how to ask a question without
          digging through Messenger.
        </SectionHeading>
      </Reveal>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <Reveal active={active}>
          <div className="relative overflow-hidden rounded-[24px] border-2 border-dashed border-cocoa/40 bg-paper-deep">
            <div className="aspect-[16/10]">
              <MapSketch />
            </div>
            <div className="absolute left-3 top-3">
              <Placeholder>Map placeholder</Placeholder>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-display text-3xl font-bold leading-tight">
              {SITE.addressLines[0]}
              <br />
              {SITE.addressLines[1]}
            </p>
            <p className="mt-1 text-ink/75">{SITE.addressNote}</p>
            <a
              href={SITE.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-full bg-ink px-6 py-3 font-bold text-paper shadow-[0_6px_0_0_#2a160a] transition active:translate-y-1 active:shadow-none"
            >
              Open in Google Maps
            </a>
          </div>
        </Reveal>

        <div className="grid content-start gap-5">
          <Reveal active={active} delay={0.08}>
            <Card>
              <p className="font-hand text-2xl text-cocoa">opening hours</p>
              <p className="font-display text-3xl font-bold leading-tight">
                To be confirmed
              </p>
              <p className="mt-1 text-ink/80">
                Their grand opening day ran 1:00 PM to 10:00 PM. Regular hours
                will go here once the cafe shares them.
              </p>
              <div className="mt-3">
                <Placeholder>Placeholder</Placeholder>
              </div>
            </Card>
          </Reveal>
          <Reveal active={active} delay={0.14}>
            <Card>
              <p className="font-hand text-2xl text-cocoa">before you go</p>
              <p className="font-display text-3xl font-bold leading-tight">
                Entry fee and time slots
              </p>
              <p className="mt-1 text-ink/80">
                If the cafe uses an entry fee or timed visits, they would be
                spelled out here so nobody is surprised at the door.
              </p>
              <div className="mt-3">
                <Placeholder>Not confirmed</Placeholder>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <Reveal active={active}>
          <h3 className="font-display text-4xl font-bold">Ask or reserve</h3>
          <p className="mt-1 text-ink/75">
            This prototype opens your email app with the details filled in. A
            real version could send to Messenger or save to a booking list.
          </p>
          <form onSubmit={submit} className="mt-5 grid gap-4">
            <label className="grid gap-1 font-bold">
              Your name
              <input
                className={field}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1 font-bold">
                Preferred date
                <input
                  type="date"
                  className={field}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label className="grid gap-1 font-bold">
                Guests
                <input
                  type="number"
                  min={1}
                  max={20}
                  className={field}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </label>
            </div>
            <label className="grid gap-1 font-bold">
              Anything we should know?
              <textarea
                rows={3}
                className={field}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="justify-self-start rounded-full bg-pumpkin px-7 py-3 font-bold text-white shadow-[0_6px_0_0_#a8501a] transition active:translate-y-1 active:shadow-none"
            >
              Send inquiry
            </button>
          </form>
        </Reveal>

        <Reveal active={active} delay={0.1}>
          <Card className="bg-rose-soft/70">
            <Paw className="h-8 w-8 text-latte" />
            <h3 className="mt-2 font-display text-4xl font-bold leading-none">
              Find us online
            </h3>
            <ul className="mt-4 space-y-3 text-lg">
              <li>
                <a
                  className="font-bold text-pumpkin underline underline-offset-4"
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <span className="text-ink/70"> for news and messages</span>
              </li>
              <li>
                <a
                  className="font-bold text-pumpkin underline underline-offset-4"
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <span className="text-ink/70"> @whiskers_cafe_</span>
              </li>
            </ul>
          </Card>
        </Reveal>
      </section>

      <PageFooter />
    </div>
  );
}
