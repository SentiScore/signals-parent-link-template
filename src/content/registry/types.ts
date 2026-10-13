export type CoreTopicCode =
  | "C01" | "C02" | "C03" | "C04" | "C05"
  | "C06" | "C07" | "C08" | "C09" | "C10"
  | "C11";

export type SpecificTopicCode =
  | "S12" | "S13" | "S14" | "S15";

export type TopicCode = CoreTopicCode | SpecificTopicCode;

export type TopicCategory = "core" | "company_specific";

export type PageLayout =
  | "standard"
  | "exhibit_first"
  | "list"
  | "two_exhibits"
  | "comparison"
  | "weekly_list";

export type ApprovalStatus =
  | "proposed"
  | "approved"
  | "rejected"
  | "needs_review";

export type ResearchTopic = {
  code: TopicCode;
  category: TopicCategory;

  cluster: string;
  title: string;

  description?: string;

  active: boolean;
};

export type CompanyRegistryEntry = {
  id: string;
  name: string;
  ticker: string;

  active: boolean;
};

export type ContentRequirement = {
  figures?: string[];
  exhibit?: string;
  interpretation?: string;
  readingGuide?: string;

  dataSources?: string[];

  refreshTrigger?: string;
  analystReview?: string;
};

export type CompanyTopicDefinition = {
  companyId: string;
  topicCode: TopicCode;

  title: string;
  linkText: string;
  promise: string;

  readerQuestion?: string;

  staysInStory?: string;
  behindLink?: string;

  content: ContentRequirement;

  childTopics: string[];

  layout: PageLayout;

  status: ApprovalStatus;
  active: boolean;
};

export type ProductPlacement = {
  productId: string;
  companyId: string;
  topicCode: TopicCode;

  placement: "standard_block" | "in_section";

  sectionAnchor?: string;

  status: ApprovalStatus;

  enabled: boolean;
};
