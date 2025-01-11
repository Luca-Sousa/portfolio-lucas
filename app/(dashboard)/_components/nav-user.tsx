"use client";

import { BadgeCheck, ChevronsUpDown, LogOut, Sparkles } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/_components/ui/sidebar";

import Link from "next/link";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

export function NavUser() {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                tooltip={"Perfil"}
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    className="rounded-full"
                    src={"/perfil.png"}
                    alt="Imagem do usuário"
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Lucas Sousa</span>
                  <span className="truncate text-xs">
                    lucas2015366@gmail.com
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      className="rounded-full"
                      src="/perfil.png"
                      alt="Imagem do usuário"
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Lucas Sousa</span>
                    <span className="truncate text-xs">
                      lucas2015366@gmail.com
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setOpenMobile(false)}
                  asChild
                >
                  <Link href={"/subscription"}>
                    <Sparkles />
                    Atualize pro Premium
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer">
                    <BadgeCheck />
                    Configurar Conta
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Button
                  className="w-full cursor-pointer justify-start bg-destructive/70 focus:bg-destructive focus-visible:ring-0"
                  variant="destructive"
                >
                  <LogOut />
                  Sair da Conta
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>

            <DialogContent className="flex h-[95%] max-w-fit flex-col overflow-hidden rounded-3xl border-0 p-0 md:h-auto">
              <DialogTitle hidden>
                <VisuallyHidden>
                  Configuração da Conta do Usuário
                </VisuallyHidden>
              </DialogTitle>
              <DialogDescription hidden>
                <VisuallyHidden>
                  Selecione as configurações que desejar!
                </VisuallyHidden>
              </DialogDescription>

              <ScrollArea>Conteúdo da Configuração da Conta</ScrollArea>
            </DialogContent>
          </DropdownMenu>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
