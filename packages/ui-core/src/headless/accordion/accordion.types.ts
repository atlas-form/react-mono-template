export type AccordionClassNameMode = "merge" | "replace"

export type AccordionClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
