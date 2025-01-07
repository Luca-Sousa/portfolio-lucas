"use client"

import Image from "next/image"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../_components/ui/card"
import SidebarCardFooter from "./sidebar-card-footer"
import SidebarCardContent from "./sidebar-card-content"
import { ScrollArea } from "@/app/_components/ui/scroll-area"

const SidebarHomeDesktop = () => {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="flex-1 items-center justify-center gap-3">
        <div className="relative size-24 overflow-hidden rounded-full bg-card ring-2 ring-primary xl:h-72 xl:w-48">
          <Image
            alt="perfil"
            src="/perfil.png"
            fill
            className="object-cover object-top"
          />
        </div>

        <CardTitle>Lucas Sousa</CardTitle>

        <CardDescription className="rounded-xl bg-accent px-2 py-0.5 text-sm">
          Desenvolvedor Web
        </CardDescription>
      </CardHeader>

      <ScrollArea>
        <SidebarCardContent />
        <SidebarCardFooter />
      </ScrollArea>
    </Card>
  )
}

export default SidebarHomeDesktop
