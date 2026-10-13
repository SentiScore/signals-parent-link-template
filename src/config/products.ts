/**
 * BST publishing product registry.
 *
 * Product identifiers are stable URL slugs.
 * Publishing schedules and enabled topics will be configured
 * separately once confirmed by the publishing team.
 */

export type ProductConfig = {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
};

export const PRODUCTS: Record<string, ProductConfig> = {
  dsr: {
    id: "dsr",
    name: "Daily Stock Report",
    enabled: true,
    description: "Daily company research publication",
  },

  wsr: {
    id: "wsr",
    name: "Weekly Stock Report",
    enabled: true,
    description: "Weekly company research publication",
  },

  "mini-dsr": {
    id: "mini-dsr",
    name: "Mini DSR",
    enabled: true,
    description: "Condensed company research publication",
  },

  "day-ahead-dsr": {
    id: "day-ahead-dsr",
    name: "Day Ahead DSR",
    enabled: true,
    description: "Forward-looking daily research publication",
  },

  "peer-story": {
    id: "peer-story",
    name: "Peer Story",
    enabled: true,
    description: "Peer and competitor-focused research",
  },
};

export function getProduct(id: string): ProductConfig | undefined {
  const product = PRODUCTS[id];
  return product?.enabled ? product : undefined;
}

export function getEnabledProducts(): ProductConfig[] {
  return Object.values(PRODUCTS).filter((product) => product.enabled);
}
