import type { PageContent } from "@/content/types";
import { C01 } from "./C01";
import { C02 } from "./C02";
import { C05 } from "./C05";
import { C07 } from "./C07";
import { C10 } from "./C10";

export type TemplateLinks = {
  /** C10 only: tracked rotation link to a peer's own C10 page, or null when that peer has none live. */
  peerHref: (companyId: string) => string | null;
};

/**
 * One template per category; S12-S15 links render with the template their company record names.
 * Adding C03, C04, C06, C08, C09 or C11 = a content type in content/types.ts, a component here,
 * and an entry in content/taxonomy.ts.
 */
export function Template({ page, links, today }: { page: PageContent; links: TemplateLinks; today: string }) {
  switch (page.template) {
    case "C01":
      return <C01 page={page} />;
    case "C02":
      return <C02 page={page} />;
    case "C05":
      return <C05 page={page} />;
    case "C07":
      return <C07 page={page} today={today} />;
    case "C10":
      return <C10 page={page} peerHref={links.peerHref} />;
  }
}
