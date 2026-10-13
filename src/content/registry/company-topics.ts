import type { CompanyTopicDefinition } from "./types";

/**
 * Workbook-driven company/topic definitions.
 *
 * Expected initial scope:
 * Apple: 14 topic slots
 * Alphabet: 15 topic slots
 * NVIDIA: 14 topic slots
 * Microsoft: 15 topic slots
 *
 * Total: 58 proposed slots.
 *
 * Entries will be imported from the workbook.
 */
export const COMPANY_TOPICS: CompanyTopicDefinition[] = [];

export function getTopicsForCompany(companyId: string) {
  return COMPANY_TOPICS.filter(
    (topic) => topic.companyId === companyId
  );
}

export function getCompanyTopic(
  companyId: string,
  topicCode: string
) {
  return COMPANY_TOPICS.find(
    (topic) =>
      topic.companyId === companyId &&
      topic.topicCode === topicCode
  );
}
