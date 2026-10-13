export type TrackedLinkRecord = {
  id: string;
  token: string;

  productId: string;
  companyId: string;
  parentSlug: string;

  clientId: string;
  deliveryId: string;
  storyId: string;

  reportDate: string;
  platform: string;
  placement: "standard_block" | "in_section";

  createdAt: string;
};

export type CreateTrackedLinkInput = Omit<
  TrackedLinkRecord,
  "id" | "token" | "createdAt"
>;
