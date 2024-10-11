"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"

const DashboardButtonUser = () => {
  const handleSignOut = async () => {
    await signOut()
    window.location.href = "/"
  }

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Perfil</DropdownMenuItem>
      <DropdownMenuItem>Configurações</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="p-0">
        <Button
          className="w-full gap-1.5"
          size={"sm"}
          variant={"destructive"}
          onClick={handleSignOut}
        >
          <LogOutIcon size={16} />
          Sair
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}

export default DashboardButtonUser
