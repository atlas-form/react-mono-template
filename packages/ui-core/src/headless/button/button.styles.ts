import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--button-bg)] text-[var(--button-fg)] hover:bg-[var(--button-hover)] active:bg-[var(--button-active)] disabled:bg-[var(--button-disabled)]",
        outline:
          "border-[var(--button-bg)] bg-transparent text-[var(--button-bg)] hover:bg-[var(--button-soft)] hover:text-[var(--button-bg)] aria-expanded:bg-[var(--button-soft)] dark:border-[var(--button-bg)] dark:bg-transparent dark:hover:bg-[var(--button-soft)]",
        ghost:
          "text-[var(--button-bg)] hover:bg-[var(--button-soft)] hover:text-[var(--button-bg)] aria-expanded:bg-[var(--button-soft)] aria-expanded:text-[var(--button-bg)] dark:hover:bg-[var(--button-soft)]",
        link: "h-auto p-0 text-[var(--button-bg)] underline-offset-4 hover:text-[var(--button-hover)] hover:underline active:text-[var(--button-active)]",
      },
      color: {
        default:
          "[--button-active:var(--primary-active,var(--primary))] [--button-bg:var(--primary)] [--button-disabled:var(--primary-disabled,var(--primary))] [--button-fg:var(--primary-foreground)] [--button-hover:var(--primary-hover,var(--primary))] [--button-soft:color-mix(in_oklab,var(--primary)_14%,transparent)]",
        primary:
          "[--button-active:var(--primary-active,var(--primary))] [--button-bg:var(--primary)] [--button-disabled:var(--primary-disabled,var(--primary))] [--button-fg:var(--primary-foreground)] [--button-hover:var(--primary-hover,var(--primary))] [--button-soft:color-mix(in_oklab,var(--primary)_14%,transparent)]",
        secondary:
          "[--button-active:var(--secondary-active,var(--secondary))] [--button-bg:var(--secondary)] [--button-disabled:var(--secondary-disabled,var(--secondary))] [--button-fg:var(--secondary-foreground)] [--button-hover:var(--secondary-hover,var(--secondary))] [--button-soft:color-mix(in_oklab,var(--secondary)_28%,transparent)]",
        destructive:
          "[--button-active:var(--destructive-active,var(--destructive))] [--button-bg:var(--destructive)] [--button-disabled:var(--destructive-disabled,var(--destructive))] [--button-fg:var(--primary-foreground)] [--button-hover:var(--destructive-hover,var(--destructive))] [--button-soft:color-mix(in_oklab,var(--destructive)_16%,transparent)] focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
      size: "default",
    },
  }
)
