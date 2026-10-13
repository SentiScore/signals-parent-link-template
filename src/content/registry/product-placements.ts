import type { ProductPlacement } from "./types";

/**
 * Workbook-driven product placement configuration.
 *
 * Only approved placements should become enabled.
 */
export const PRODUCT_PLACEMENTS: ProductPlacement[] = [];

export function getPlacementsForProduct(
  productId: string,
  companyId: string
) {
  return PRODUCT_PLACEMENTS.filter(
    (placement) =>
      placement.productId === productId &&
      placement.companyId === companyId &&
      placement.enabled &&
      placement.status === "approved"
  );
}
