import type { CompanyContent } from "../types";
import { example } from "./example";

/**
 * Per-company content. The parent files in ../parents hold the shared structure and
 * defaults; a company entry overrides only what differs (summary, table, a child's
 * promise or href, a sector KPI, dormant children...).
 * Add one file per company and list it here. The key is the `company` value carried by the link token.
 */
export const COMPANIES: Record<string, CompanyContent> = {
  [example.id]: example,
};
