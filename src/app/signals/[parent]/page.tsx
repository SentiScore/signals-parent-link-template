import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ParentLanding } from "@/components/ParentLanding";
import { SITE_URL } from "@/config/site";
import { getCompany, getParentBySlug, resolveParent } from "@/lib/content";
import { contextFromSearchParams, hasValidToken } from "@/lib/context";

type Props = { params: Promise<{ parent: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getParentBySlug((await params).parent);
  return { title: p?.title ?? "Research detail", robots: { index: false, follow: false } };
}

export default async function ParentPage({ params, searchParams }: Props) {
  const ctx = contextFromSearchParams(await searchParams);
  // No valid link token = not a professional reader: send to the public site (plan §3.5).
  if (!hasValidToken(ctx)) redirect(SITE_URL);

  const base = getParentBySlug((await params).parent);
  if (!base || !base.live) notFound();

  const company = getCompany(ctx.company);
  const parent = resolveParent(base, ctx.company);
  return <ParentLanding parent={parent} companyName={company.name} ctx={ctx} />;
}
