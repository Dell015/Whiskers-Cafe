import { SITE } from "@/lib/site";

/** Always-visible notice that this is an unofficial concept. */
export default function Banner() {
  return (
    <div
      role="note"
      className="fixed inset-x-0 top-0 z-50 flex min-h-8 items-center justify-center bg-ink px-3 py-1 text-center text-[11px] leading-tight text-paper md:text-xs"
    >
      <p>
        <span className="font-bold">Concept project by {SITE.credit}.</span>{" "}
        Not affiliated with {SITE.name}. All photos, logo and menu belong to the
        cafe.
      </p>
    </div>
  );
}
