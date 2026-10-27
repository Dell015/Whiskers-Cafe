"use client";

import { SITE } from "@/lib/site";
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

const STEPS = [
  "Spend at least ₱300 in a single order.",
  "Search the cafe for the hidden candies.",
  "Trade your candy for one free cookie or egg tart.",
];

const RULES = [
  "Only 8 candies are hidden each day.",
  "One candy per customer.",
  "Each candy is good for one cookie or one egg tart.",
  "Once all 8 are found, the hunt is over for that day.",
];

export default function Events({ active }: { active: boolean }) {
  return (
    <div className={PAGE_ROOT}>
      <PageHeader
        variant="lilac"
        kicker="what's happening"
        title="Events and news"
        aside={
          <div className="relative mx-auto flex h-60 w-60 -rotate-6 items-center justify-center rounded-full bg-pumpkin text-center text-white shadow-[0_14px_30px_-12px_rgba(74,42,23,0.7)] md:h-72 md:w-72">
            <span
              aria-hidden
              className="absolute inset-3 rounded-full border-4 border-dashed border-white/60"
            />
            <span className="relative">
              <span className="block font-hand text-3xl">candy hunt</span>
              <span className="block font-display text-6xl font-bold leading-[0.9]">
                Oct 31
                <br />
                to Nov 2
              </span>
            </span>
          </div>
        }
      >
        <p>
          Promos and announcements from the cafe&apos;s Facebook posts, kept
          in one place that is easy to find.
        </p>
      </PageHeader>
      <div className={BODY}>

      {/* Halloween */}
      <section className="mt-12 grid items-start gap-10 lg:grid-cols-[18rem_1fr]">
        <Reveal active={active} rotate={-2} className="mx-auto w-64 lg:w-full">
          <Polaroid
            src="/images/posts/halloween.webp"
            alt="The cafe's Halloween Candy Hunt poster"
            aspect="2/3"
            caption="their original poster"
            sizes="288px"
          />
        </Reveal>

        <Reveal active={active} delay={0.1}>
          <p className="font-hand text-3xl text-pumpkin">October 31 to November 2</p>
          <h3 className="font-display text-5xl font-bold leading-none md:text-6xl">
            Halloween Candy Hunt
          </h3>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink/80">
            Find a candy hidden somewhere in the cafe and trade it for a free
            cookie or egg tart.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Card className="bg-rose-soft/70">
              <h4 className="font-display text-3xl font-bold">How to join</h4>
              <ol className="mt-2 space-y-2">
                {STEPS.map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cocoa font-bold text-paper">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </Card>
            <Card className="bg-lilac/60">
              <h4 className="font-display text-3xl font-bold">Please note</h4>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                {RULES.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* Timeline + hiring */}
      <section className="mt-20 grid gap-10 lg:grid-cols-2">
        <Reveal active={active}>
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
            <Polaroid
              src="/images/posts/grand-opening.webp"
              alt="The cafe's grand opening poster"
              aspect="7/10"
              rotate={2}
              className="w-44 shrink-0 sm:w-48"
              sizes="192px"
            />
            <div>
              <p className="font-hand text-2xl text-cocoa">where it began</p>
              <h3 className="font-display text-4xl font-bold leading-none">
                Grand opening
              </h3>
              <p className="mt-2 text-ink/80">
                {SITE.opened}, 1:00 PM to 10:00 PM, on the 2nd floor of Hua Lao
                Convenience Store.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal active={active} delay={0.1}>
          <Card>
            <p className="font-hand text-2xl text-cocoa">join the crew</p>
            <h3 className="font-display text-4xl font-bold leading-none">
              All-around crew
            </h3>
            <p className="mt-2 leading-relaxed text-ink/80">
              The cafe posted a call for an all-around crew member: customer
              service, cashiering, drinks and food prep, and being comfortable
              around cats. Applicants send a CV by email.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-block rounded-full border-2 border-ink px-5 py-2 font-bold text-ink transition hover:bg-paper"
            >
              Email {SITE.email}
            </a>
            <div className="mt-4">
              <Placeholder>Taken from an earlier post, may be outdated</Placeholder>
            </div>
          </Card>
        </Reveal>
      </section>

      </div>
      <PageFooter />
    </div>
  );
}
