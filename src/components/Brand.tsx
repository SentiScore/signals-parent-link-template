import { BRAND_NAME } from "@/config/site";

/**
 * Header brand lockup (Greenwich Research News Data). Deliberately NOT a link: the only way out
 * to stockdashboard.com is the quiet crossover strip below the child links.
 */
export function Brand() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/greenwich-logo.png" alt={BRAND_NAME} width={150} height={60} className="h-12 w-auto" />
  );
}
