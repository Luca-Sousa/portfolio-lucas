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
      className={`${pathname === href && "border-primary text-primary xl:mt-1 xl:border-b-4"} h-full w-full justify-start rounded-none p-0 text-base`}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export default NavbarHomeButton
