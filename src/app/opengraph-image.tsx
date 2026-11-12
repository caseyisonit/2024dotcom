import { site } from "@/content/site";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = `${site.author}: ${site.logo.word}${site.logo.tld}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: site.home.hero, seed: "home", meta: "Design systems · AI · Design engineering · Accessibility" });
}
