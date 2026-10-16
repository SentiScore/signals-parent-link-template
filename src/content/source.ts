import type { Company, PageContent } from "./types";
import type { TopicCode } from "./taxonomy";

/**
 * Where page content comes from. The lorem source below is the only implementation today;
 * pillar 1 replaces it with one that reads the content agent's output from the BST database.
 * Nothing else in the app needs to change: pages read through lib/data.ts, which caches by company.
 */
export interface ContentSource {
  getCompany(id: string): Promise<Company | null>;
  listCompanies(): Promise<Company[]>;
  /** null = the company does not carry this topic (dormant or never assigned). */
  getPage(companyId: string, code: TopicCode): Promise<PageContent | null>;
}

export { loremSource as source } from "./lorem";
