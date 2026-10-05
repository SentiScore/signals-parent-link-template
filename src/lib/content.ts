import { COMPANIES } from "@/content/companies";
import { PARENTS } from "@/content/parents";
import type { ChildContent, CompanyContent, ParentContent, ParentOverride } from "@/content/types";

export function getCompany(id: string): CompanyContent {
  return COMPANIES[id] ?? { id, name: "Company Name" };
}

/** Live parents in link-block order. */
export const liveParents = () => PARENTS.filter((p) => p.live).sort((a, b) => a.order - b.order);

export function getParentBySlug(slug: string) {
  return PARENTS.find((p) => p.slug === slug);
}

/** Parent defaults merged with the company's overrides; dormant children dropped. */
export function resolveParent(parent: ParentContent, companyId: string): ParentContent {
  const o: ParentOverride | undefined = getCompany(companyId).parents?.[parent.slug];
  const { children: childOverrides, ...rest } = o ?? {};
  const merged = deepMerge(parent, rest) as ParentContent;
  merged.children = parent.children
    .map((c) => ({ ...c, ...(childOverrides?.[c.id] ?? {}) }) as ChildContent)
    .filter((c) => c.live);
  return merged;
}

/** Replace {company} in copy. */
export const fill = (s: string, company: string) => s.replaceAll("{company}", company);

function deepMerge<T>(base: T, over: unknown): T {
  if (over === undefined) return base;
  if (Array.isArray(over) || typeof over !== "object" || over === null || typeof base !== "object" || base === null || Array.isArray(base)) {
    return over as T;
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(over)) out[k] = deepMerge((base as Record<string, unknown>)[k], v);
  return out as T;
}
