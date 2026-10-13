import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import type {
  CreateTrackedLinkInput,
  TrackedLinkRecord,
} from "@/lib/link-types";

import {
  createTrackedLink,
  getTrackedLinkPath,
} from "@/lib/link-generator";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "tracked-links.json");

async function readLinks(): Promise<TrackedLinkRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid tracked-link registry");
    }

    return parsed as TrackedLinkRecord[];
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
}

async function writeLinks(
  links: TrackedLinkRecord[]
): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  const temporaryFile = `${DATA_FILE}.${process.pid}.tmp`;

  await fs.writeFile(
    temporaryFile,
    JSON.stringify(links, null, 2),
    "utf8"
  );

  await fs.rename(temporaryFile, DATA_FILE);
}

export async function registerTrackedLink(
  input: CreateTrackedLinkInput
): Promise<{
  record: TrackedLinkRecord;
  url: string;
}> {
  if (process.env.SIGNALS_PREVIEW !== "1") {
    throw new Error(
      "Local link registration is available only in preview mode"
    );
  }

  const record = createTrackedLink(input);

  const links = await readLinks();

  links.push(record);

  await writeLinks(links);

  return {
    record,
    url: getTrackedLinkPath(record),
  };
}

export async function resolveTrackedLink(
  token: string
): Promise<TrackedLinkRecord | null> {
  if (process.env.SIGNALS_PREVIEW !== "1") {
    return null;
  }

  const links = await readLinks();

  return links.find((link) => link.token === token) ?? null;
}

export async function getTrackedLinks(): Promise<
  TrackedLinkRecord[]
> {
  if (process.env.SIGNALS_PREVIEW !== "1") {
    return [];
  }

  return readLinks();
}
