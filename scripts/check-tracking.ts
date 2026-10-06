/**
 * Tracking/context integrity check.
 *
 * Validates the parent -> child tracking structure without:
 * - opening a browser
 * - sending GA4 events
 * - connecting to BST-DB
 *
 * Safe to run during template development.
 */

import { PARENTS } from "../src/content/parents";
import { COMPANIES } from "../src/content/companies";
import { resolveParent } from "../src/lib/content";
import { withContext, type LinkContext } from "../src/lib/context";

let errors = 0;
let parentCount = 0;
let childCount = 0;

function fail(message: string) {
  errors++;
  console.error(`  ✗ ${message}`);
}

const company =
  process.env.COMPANY ??
  Object.keys(COMPANIES)[0] ??
  "example-co";

const testContext: LinkContext = {
  token: "TEST_ONLY",
  company,
  story: "tracking-test-story",
  platform: "nexis",
  placement: "standard_block",
  published: "2026-10-06",
};

console.log("\nReadership Signal — Tracking Integrity Check\n");

for (const base of PARENTS) {
  if (!base.live) continue;

  parentCount++;

  const parent = resolveParent(base, company);

  console.log(
    `${String(base.order).padStart(2)}. ${base.title}`
  );

  if (!base.id) {
    fail("missing parent id");
  }

  if (!base.slug) {
    fail("missing parent slug");
  }

  if (!parent.children.length) {
    fail("parent has no live children");
    continue;
  }

  for (const child of parent.children) {
    childCount++;

    if (!child.id) {
      fail(`${base.title}: child missing id`);
    }

    if (!child.slug) {
      fail(`${base.title}: ${child.title} missing slug`);
    }

    const href =
      child.href ??
      `/signals/${base.slug}/${child.slug}`;

    const trackedHref = withContext(href, testContext);

    const parsed = new URL(
      trackedHref,
      "http://localhost:3300"
    );

    const expected: Record<string, string | undefined> = {
      t: testContext.token,
      company: testContext.company,
      story: testContext.story,
      platform: testContext.platform,
      placement: testContext.placement,
      published: testContext.published,
    };

    for (const [key, value] of Object.entries(expected)) {
      if (value && parsed.searchParams.get(key) !== value) {
        fail(
          `${base.title} -> ${child.title}: context "${key}" was not preserved`
        );
      }
    }

    console.log(
      `    ✓ ${child.id} -> context preserved`
    );
  }
}

console.log("\n----------------------------------------");
console.log(`Parents checked : ${parentCount}`);
console.log(`Children checked: ${childCount}`);
console.log(`Errors          : ${errors}`);
console.log("----------------------------------------");

if (parentCount !== 15) {
  fail(`expected 15 live parents, found ${parentCount}`);
}

if (errors > 0) {
  console.error("\nTracking integrity check FAILED.\n");
  process.exit(1);
}

console.log("\nTracking integrity check PASSED.\n");