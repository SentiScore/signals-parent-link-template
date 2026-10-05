import type { ParentContent } from "../types";
import p01 from "./01-debt-refinancing";
import p02 from "./02-liquidity-cash-flow";
import p03 from "./03-earnings-quality";
import p04 from "./04-capital-allocation-dilution";
import p05 from "./05-insiders-management";
import p06 from "./06-ownership";
import p07 from "./07-short-options-positioning";
import p08 from "./08-governance-activism";
import p09 from "./09-deals-legal";
import p10 from "./10-guidance-estimates";
import p11 from "./11-business-performance";
import p12 from "./12-customers-supply-chain-inventory";
import p13 from "./13-geographic-policy-exposure";
import p14 from "./14-peers-competitors";
import p15 from "./15-news-stock-buzz";

/**
 * Registry of every parent link, in story-block order.
 * To take a whole parent offline, set `live: false` in its file (do not delete it).
 */
export const PARENTS: ParentContent[] = [
  p01,
  p02,
  p03,
  p04,
  p05,
  p06,
  p07,
  p08,
  p09,
  p10,
  p11,
  p12,
  p13,
  p14,
  p15,
];
