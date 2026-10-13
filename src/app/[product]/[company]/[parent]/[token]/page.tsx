import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ParentLanding } from "@/components/ParentLanding";
import { getCompany, getParentBySlug, resolveParent } from "@/lib/content";
import { resolveTrackedLink } from "@/lib/link-registry";
import { getProduct } from "@/config/products";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    product: string;
    company: string;
    parent: string;
    token: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "BST Research",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function TrackedParentPage({ params }: Props) {
  if (
    process.env.NODE_ENV === "production" ||
    process.env.SIGNALS_PREVIEW !== "1"
  ) {
    notFound();
  }

  const { product, company, parent, token } = await params;

  const link = await resolveTrackedLink(token);

  if (!link) {
    notFound();
  }

  // Prevent mismatched URL segments from using another link's token.
  if (
    link.productId !== product ||
    link.companyId !== company ||
    link.parentSlug !== parent
  ) {
    notFound();
  }

  if (!getProduct(link.productId)) {
    notFound();
  }

  const base = getParentBySlug(link.parentSlug);

  if (!base || !base.live) {
    notFound();
  }

  const companyContent = getCompany(link.companyId);
  const resolvedParent = resolveParent(base, link.companyId);

  const ctx = {
    token: link.token,
    company: link.companyId,
    story: link.storyId,
    platform: link.platform,
    placement: link.placement,
    published: link.reportDate,
  };

  return (
    <ParentLanding
      parent={resolvedParent}
      companyName={companyContent.name}
      ctx={ctx}
    />
  );
}
