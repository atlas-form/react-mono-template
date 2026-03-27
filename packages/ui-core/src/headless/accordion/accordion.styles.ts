export const accordionClassNames = {
  slot1: "flex",
  slot2:
    "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden",
  slot3:
    "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline",
  slot4:
    "overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up",
} as const
