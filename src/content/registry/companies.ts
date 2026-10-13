import type { CompanyRegistryEntry } from "./types";

export const REGISTERED_COMPANIES: CompanyRegistryEntry[] = [
  {
    id: "apple",
    name: "Apple",
    ticker: "AAPL",
    active: true,
  },
  {
    id: "alphabet",
    name: "Alphabet",
    ticker: "GOOGL",
    active: true,
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    ticker: "NVDA",
    active: true,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    ticker: "MSFT",
    active: true,
  },
];

export function getRegisteredCompany(id: string) {
  return REGISTERED_COMPANIES.find(
    (company) => company.id === id
  );
}

export function getActiveCompanies() {
  return REGISTERED_COMPANIES.filter(
    (company) => company.active
  );
}
