import "server-only";

import { randomBytes, randomUUID } from "node:crypto";

import { getProduct } from "@/config/products";
import { getParentBySlug } from "@/lib/content";

import type {
  CreateTrackedLinkInput,
  TrackedLinkRecord,
} from "@/lib/link-types";

export function generateTrackingToken(): string {
  return randomBytes(16).toString("base64url");
}

export function createTrackedLink(
  input: CreateTrackedLinkInput
): TrackedLinkRecord {
  if (!getProduct(input.productId)) {
    throw new Error(`Unknown product: ${input.productId}`);
  }

  const parent = getParentBySlug(input.parentSlug);

  if (!parent || !parent.live) {
    throw new Error(`Unknown or inactive parent: ${input.parentSlug}`);
  }

  if (!input.companyId.trim()) {
    throw new Error("Company ID is required");
  }

  if (!input.clientId.trim()) {
    throw new Error("Client ID is required");
  }

  if (!input.deliveryId.trim()) {
    throw new Error("Delivery ID is required");
  }

  if (!input.storyId.trim()) {
    throw new Error("Story ID is required");
  }

  return {
    ...input,
    id: randomUUID(),
    token: generateTrackingToken(),
    createdAt: new Date().toISOString(),
  };
}

export function getTrackedLinkPath(
  link: TrackedLinkRecord
): string {
  return [
    "",
    encodeURIComponent(link.productId),
    encodeURIComponent(link.companyId),
    encodeURIComponent(link.parentSlug),
    encodeURIComponent(link.token),
  ].join("/");
}
