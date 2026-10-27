export const SITE = {
  name: "Whiskers Cafe",
  tagline: "Every sip creates a meowment.",
  addressLines: ["Pilar St., District III", "Cauayan City, Isabela"],
  addressNote: "2nd floor of Hua Lao Convenience Store",
  facebook: "https://www.facebook.com/profile.php?id=61577699187529",
  instagram: "https://www.instagram.com/whiskers_cafe_",
  email: "whiskerscafe01@gmail.com",
  maps: "https://www.google.com/maps/search/?api=1&query=Whiskers+Cafe+Pilar+St+District+III+Cauayan+City+Isabela",
  opened: "February 12, 2026",
  credit: "Randel Serafica",
} as const;

export const PAGES = [
  { id: "home", label: "Home", col: 0, row: 0 },
  { id: "cats", label: "Cats", col: 1, row: 0 },
  { id: "menu", label: "Menu", col: 2, row: 0 },
  { id: "events", label: "Events", col: 2, row: 1 },
  { id: "visit", label: "Visit", col: 1, row: 1 },
] as const;

export type PageId = (typeof PAGES)[number]["id"];

export function isPageId(value: string): value is PageId {
  return PAGES.some((p) => p.id === value);
}

/**
 * The cafe's own house rules, shown on the Cats page.
 * Leave empty to show fill-in-the-blank placeholders, or add one string per rule.
 */
export const HOUSE_RULES: string[] = [];
