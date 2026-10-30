/** Public site URL, used for SEO tags, share links and Stripe redirects. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rep-theory.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Rep Theory";

/**
 * Social profiles. Only profiles with a URL are shown in the footer,
 * so we never link to an account that doesn't exist.
 */
export const SOCIAL: {
  name: "Instagram" | "TikTok" | "X" | "Facebook";
  handle: string;
  url: string | null;
}[] = [
  { name: "Instagram", handle: "@reptheory", url: null },
  { name: "TikTok", handle: "@reptheory", url: null },
  { name: "X", handle: "@reptheory", url: null },
  { name: "Facebook", handle: "Rep Theory", url: null },
];

export const INSTAGRAM = SOCIAL[0];
