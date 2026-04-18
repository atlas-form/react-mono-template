"use client"

import * as React from "react"
import { Slot } from "radix-ui"

import { useIsMobile } from "../../hooks/use-mobile"
import { DEFAULT_MODE } from "../../lib/component-mode"
import { ChevronRightIcon, PanelLeftIcon } from "../../lib/icon-slots"
import { cn } from "../../lib/utils"
import { Button } from "../button"
import { Input } from "../input"
import { Separator } from "../separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../sheet"
import { Skeleton } from "../skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"
import {
  sidebarClassNames,
  sidebarMenuButtonVariants,
} from "./sidebar.styles"
import type {
  SidebarContentProps,
  SidebarFooterProps,
  SidebarGroupActionProps,
  SidebarGroupContentProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarInputProps,
  SidebarInsetProps,
  SidebarMenuActionProps,
  SidebarMenuBadgeProps,
  SidebarMenuButtonProps,
  SidebarMenuItemProps,
  SidebarMenuProps,
  SidebarMenuSkeletonProps,
  SidebarMenuSubButtonProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubProps,
  SidebarProps,
  SidebarProviderProps,
  SidebarRailProps,
  SidebarSeparatorProps,
  SidebarTriggerProps,
} from "./sidebar.types"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  mode = DEFAULT_MODE,
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((nextOpen) => !nextOpen) : setOpen((nextOpen) => !nextOpen)
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  if (mode === "headless") {
    return (
      <SidebarContext.Provider value={contextValue}>
        <div className={className} style={style} {...props}>
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  mode = DEFAULT_MODE,
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    if (mode === "headless") {
      return (
        <div className={className} {...props}>
          {children}
        </div>
      )
    }

    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    if (mode === "headless") {
      return (
        <Sheet mode={mode} open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent mode={mode} dir={dir} side={side}>
            {children}
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <Sheet mode={mode} open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          mode={mode}
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className={sidebarClassNames.slot1}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader mode={mode} className={sidebarClassNames.slot2}>
            <SheetTitle mode={mode}>Sidebar</SheetTitle>
            <SheetDescription mode={mode}>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className={sidebarClassNames.slot3}>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  if (mode === "headless") {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={sidebarClassNames.slot4}
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div data-sidebar="sidebar" data-slot="sidebar-inner" className={sidebarClassNames.slot5}>
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  mode = DEFAULT_MODE,
  iconClassName,
  textClassName,
  className,
  onClick,
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar()

  if (mode === "headless") {
    const {
      asChild: _asChild,
      variant: _variant,
      color: _color,
      size: _size,
      classNameMode: _classNameMode,
      classResolver: _classResolver,
      ...rest
    } = props

    return (
      <button
        className={className}
        onClick={(event) => {
          onClick?.(event)
          toggleSidebar()
        }}
        {...rest}
      >
        <PanelLeftIcon className={iconClassName} />
        <span className={textClassName}>Toggle Sidebar</span>
      </button>
    )
  }

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon className={iconClassName} />
      <span className={cn("sr-only", textClassName)}>Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ mode = DEFAULT_MODE, className, onClick, ...props }: SidebarRailProps) {
  const { toggleSidebar } = useSidebar()

  if (mode === "headless") {
    return (
      <button
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={(event) => {
          onClick?.(event)
          toggleSidebar()
        }}
        title="Toggle Sidebar"
        className={className}
        {...props}
      />
    )
  }

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ mode = DEFAULT_MODE, className, ...props }: SidebarInsetProps) {
  if (mode === "headless") {
    return <main className={className} {...props} />
  }

  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({ mode = DEFAULT_MODE, className, ...props }: SidebarInputProps) {
  if (mode === "headless") {
    return <Input mode={mode} className={className} {...props} />
  }

  return (
    <Input
      mode={mode}
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-8 w-full bg-background shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ mode = DEFAULT_MODE, className, ...props }: SidebarHeaderProps) {
  if (mode === "headless") {
    return <div className={className} {...props} />
  }

  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ mode = DEFAULT_MODE, className, ...props }: SidebarFooterProps) {
  if (mode === "headless") {
    return <div className={className} {...props} />
  }

  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({ mode = DEFAULT_MODE, className, ...props }: SidebarSeparatorProps) {
  if (mode === "headless") {
    return <Separator mode={mode} className={className} {...props} />
  }

  return (
    <Separator
      mode={mode}
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
}

function SidebarContent({ mode = DEFAULT_MODE, className, ...props }: SidebarContentProps) {
  if (mode === "headless") {
    return <div className={className} {...props} />
  }

  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ mode = DEFAULT_MODE, className, ...props }: SidebarGroupProps) {
  if (mode === "headless") {
    return <div className={className} {...props} />
  }

  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  mode = DEFAULT_MODE,
  className,
  asChild = false,
  ...props
}: SidebarGroupLabelProps) {
  const Comp = asChild ? Slot.Root : "div"

  if (mode === "headless") {
    return <Comp className={className} {...props} />
  }

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  mode = DEFAULT_MODE,
  className,
  asChild = false,
  ...props
}: SidebarGroupActionProps) {
  const Comp = asChild ? Slot.Root : "button"

  if (mode === "headless") {
    return <Comp className={className} {...props} />
  }

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({ mode = DEFAULT_MODE, className, ...props }: SidebarGroupContentProps) {
  if (mode === "headless") {
    return <div className={className} {...props} />
  }

  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ mode = DEFAULT_MODE, className, ...props }: SidebarMenuProps) {
  if (mode === "headless") {
    return <ul className={className} {...props} />
  }

  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-0", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ mode = DEFAULT_MODE, className, ...props }: SidebarMenuItemProps) {
  if (mode === "headless") {
    return <li className={className} {...props} />
  }

  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuButton({
  mode = DEFAULT_MODE,
  asChild = false,
  isActive = false,
  disclosure = false,
  disclosureOpen = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  const { isMobile, state } = useSidebar()

  if (mode === "headless") {
    const button = <Comp className={className} {...props} />

    if (!tooltip) {
      return button
    }

    const tooltipProps =
      typeof tooltip === "string" ? { children: tooltip } : tooltip

    return (
      <Tooltip mode={mode}>
        <TooltipTrigger mode={mode} asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent
          mode={mode}
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltipProps}
        />
      </Tooltip>
    )
  }

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      data-disclosure={disclosure}
      data-disclosure-open={disclosureOpen}
      aria-expanded={disclosure ? disclosureOpen : undefined}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    >
      {props.children}
      {disclosure ? (
        <ChevronRightIcon
          aria-hidden="true"
          className={cn(
            "ml-auto shrink-0 transition-transform duration-200 ease-out group-data-[collapsible=icon]:hidden",
            disclosureOpen ? "rotate-90" : undefined
          )}
        />
      ) : null}
    </Comp>
  )

  if (!tooltip) {
    return button
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip

  return (
    <Tooltip mode={mode}>
      <TooltipTrigger mode={mode} asChild>
        {button}
      </TooltipTrigger>
      <TooltipContent
        mode={mode}
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  mode = DEFAULT_MODE,
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: SidebarMenuActionProps) {
  const Comp = asChild ? Slot.Root : "button"

  if (mode === "headless") {
    return <Comp className={className} {...props} />
  }

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({ mode = DEFAULT_MODE, className, ...props }: SidebarMenuBadgeProps) {
  if (mode === "headless") {
    return <div className={className} {...props} />
  }

  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  mode = DEFAULT_MODE,
  className,
  showIcon = false,
  ...props
}: SidebarMenuSkeletonProps) {
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  })

  if (mode === "headless") {
    return (
      <div className={className} {...props}>
        {showIcon ? <Skeleton mode={mode} /> : null}
        <Skeleton
          mode={mode}
          style={
            {
              width,
            } as React.CSSProperties
          }
        />
      </div>
    )
  }

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          mode={mode}
          className={sidebarClassNames.slot6}
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        mode={mode}
        className={sidebarClassNames.slot7}
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ mode = DEFAULT_MODE, className, ...props }: SidebarMenuSubProps) {
  if (mode === "headless") {
    return <ul className={className} {...props} />
  }

  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({ mode = DEFAULT_MODE, className, ...props }: SidebarMenuSubItemProps) {
  if (mode === "headless") {
    return <li className={className} {...props} />
  }

  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  mode = DEFAULT_MODE,
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) {
  const Comp = asChild ? Slot.Root : "a"

  if (mode === "headless") {
    return <Comp className={className} {...props} />
  }

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
}
