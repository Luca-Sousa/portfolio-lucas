"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/app/_components/ui/sidebar";
import { Separator } from "@/app/_components/ui/separator";
import { Logo } from "./logo";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { data } from "@/app/_contants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-5">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        <div>
          <NavMain items={data.navMain} />
          {/* <Separator className="group-data-[collapsible=icon]:hidden" /> */}
          {/* <NavTasks tasks={data.tasks} /> */}
        </div>
      </SidebarContent>

      <Separator className="group-data-[collapsible=icon]:hidden" />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
