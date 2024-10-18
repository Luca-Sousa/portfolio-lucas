"use client"

import { Button } from "@/app/_components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavbarHomeButtonProps {
  children: React.ReactNode
  href: string
}

const NavbarHomeButton = ({ children, href }: NavbarHomeButtonProps) => {
  const pathname = usePathname()

  return (
    <Button
      variant="secondary"
      className={`${pathname === href && "text-primary hover:bg-secondary"} w-full justify-start p-0`}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export default NavbarHomeButton
