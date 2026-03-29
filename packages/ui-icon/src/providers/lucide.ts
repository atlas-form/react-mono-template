import type { SemanticIconName } from "../types"

export const lucideSemanticAliases: Partial<
  Record<SemanticIconName, readonly string[]>
> = {
  add: ["plus", "circle-plus"],
  edit: ["square-pen", "pencil"],
  delete: ["trash-2", "trash"],
  "more-horizontal": ["more-horizontal", "ellipsis"],
  "circle-check": ["circle-check", "circle-check-big"],
}
