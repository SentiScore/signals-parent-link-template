import { PREVIEW } from "@/config/site";
import { isPlaceholder } from "@/content/helpers";

/** Wraps text; in preview mode marks unfilled (lorem ipsum) text with a dashed outline. */
export function Ph({ children, as: Tag = "span", className = "" }: { children: string; as?: React.ElementType; className?: string }) {
  const flag = PREVIEW && isPlaceholder(children);
  return <Tag className={`${className} ${flag ? "ph" : ""}`}>{children}</Tag>;
}
