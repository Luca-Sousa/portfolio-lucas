"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"

const DashboardButtonUser = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: false })
    window.location.href = "/"
  }

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="p-0">
        <Button
          className="w-full"
          size={"sm"}
          variant={"destructive"}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}

export default DashboardButtonUser
