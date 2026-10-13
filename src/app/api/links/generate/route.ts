import { NextResponse } from "next/server";

import { registerTrackedLink } from "@/lib/link-registry";
import { getProduct } from "@/config/products";
import { getParentBySlug } from "@/lib/content";

import type { CreateTrackedLinkInput } from "@/lib/link-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isLocalPreview(request: Request): boolean {
  const hostname = new URL(request.url).hostname;

  return (
    process.env.NODE_ENV !== "production" &&
    process.env.SIGNALS_PREVIEW === "1" &&
    (hostname === "localhost" || hostname === "127.0.0.1")
  );
}

function isValidInput(
  value: unknown
): value is CreateTrackedLinkInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const input = value as Record<string, unknown>;

  const requiredFields = [
    "productId",
    "companyId",
    "parentSlug",
    "clientId",
    "deliveryId",
    "storyId",
    "reportDate",
    "platform",
  ];

  if (
    !requiredFields.every(
      (field) =>
        typeof input[field] === "string" &&
        (input[field] as string).trim().length > 0
    )
  ) {
    return false;
  }

  return (
    input.placement === "standard_block" ||
    input.placement === "in_section"
  );
}

export async function POST(request: Request) {
  if (!isLocalPreview(request)) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!isValidInput(body)) {
    return NextResponse.json(
      { error: "Invalid link-generation input" },
      { status: 400 }
    );
  }

  if (!getProduct(body.productId)) {
    return NextResponse.json(
      { error: "Unknown or disabled product" },
      { status: 400 }
    );
  }

  const parent = getParentBySlug(body.parentSlug);

  if (!parent || !parent.live) {
    return NextResponse.json(
      { error: "Unknown or inactive parent topic" },
      { status: 400 }
    );
  }

  try {
    const result = await registerTrackedLink(body);

    return NextResponse.json(
      {
        ok: true,
        mode: "local-preview",
        url: result.url,
        token: result.record.token,
        linkId: result.record.id,
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[signals:link-generation]", error);

    return NextResponse.json(
      { error: "Link generation failed" },
      { status: 500 }
    );
  }
}
