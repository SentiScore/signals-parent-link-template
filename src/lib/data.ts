/**
 * Cached reads of page content. Content changes at most monthly (live project doc, "Content refresh"),
 * so it is cached per company and topic, and invalidated per company with revalidateTag("company:<id>")
 * when the content agent writes new content (see app/api/revalidate). Rendering a link never touches the
 * content store directly, so link volume does not translate into database load.
 */
import { cacheLife, cacheTag } from "next/cache";
import { source } from "@/content/source";
import type { TopicCode } from "@/content/taxonomy";

export async function getCompany(id: string) {
  "use cache";
  cacheTag(`company:${id}`);
  cacheLife("days");
  return source.getCompany(id);
}

export async function getPage(companyId: string, code: TopicCode) {
  "use cache";
  cacheTag(`company:${companyId}`);
  cacheLife("days");
  return source.getPage(companyId, code);
}
