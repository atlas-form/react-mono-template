import type { ReactNode } from "react"
import { BadgeCheck, Bell, CreditCard } from "lucide-react"

export interface AccountActionConfig {
  label: string
  icon: ReactNode
  path: string
}

export const accountActions: AccountActionConfig[] = [
  {
    icon: <BadgeCheck />,
    label: "Account",
    path: "/members",
  },
  {
    icon: <CreditCard />,
    label: "Billing",
    path: "/access",
  },
  {
    icon: <Bell />,
    label: "Notifications",
    path: "/access",
  },
]
