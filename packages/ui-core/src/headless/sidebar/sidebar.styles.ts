export const sidebarClassNames = {
  slot1:
    "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
  slot2: "sr-only",
  slot3: "flex h-full w-full flex-col",
  slot4: "group peer hidden text-sidebar-foreground md:block",
  slot5:
    "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
  slot6: "size-4 rounded-md",
  slot7: "h-4 max-w-(--skeleton-width) flex-1",
} as const
