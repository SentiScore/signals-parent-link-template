import { getRegisteredCompany } from "@/content/registry/companies";

import {
  getCompanyTopic,
  getTopicsForCompany,
} from "@/content/registry/company-topics";

import {
  getPlacementsForProduct,
} from "@/content/registry/product-placements";

export function resolveCompanyTopic(
  companyId: string,
  topicCode: string
) {
  const company = getRegisteredCompany(companyId);

  if (!company || !company.active) {
    return null;
  }

  const topic = getCompanyTopic(
    companyId,
    topicCode
  );

  if (!topic || !topic.active) {
    return null;
  }

  return {
    company,
    topic,
  };
}

export function getAvailableCompanyTopics(
  companyId: string
) {
  const company = getRegisteredCompany(companyId);

  if (!company || !company.active) {
    return [];
  }

  return getTopicsForCompany(companyId).filter(
    (topic) =>
      topic.active &&
      topic.status === "approved"
  );
}

export function getReportTopics(
  productId: string,
  companyId: string
) {
  const placements = getPlacementsForProduct(
    productId,
    companyId
  );

  return placements.flatMap((placement) => {
    const resolved = resolveCompanyTopic(
      companyId,
      placement.topicCode
    );

    if (
      !resolved ||
      resolved.topic.status !== "approved"
    ) {
      return [];
    }

    return [{
      ...resolved,
      placement,
    }];
  });
}
