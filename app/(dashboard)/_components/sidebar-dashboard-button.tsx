"use client"

import { Button } from "@/app/_components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

interface SidebarDashboardButtonProps {
  children: React.ReactNode
  href: string
}

const SidebarDashboardButton = ({
  children,
  href,
}: SidebarDashboardButtonProps) => {
  const pathname = usePathname()

  return (
    <Button
      variant={pathname === href ? "secondary" : "ghost"}
      className={`${pathname === href && "text-primary hover:bg-secondary"} w-full justify-start gap-2`}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export default SidebarDashboardButton
