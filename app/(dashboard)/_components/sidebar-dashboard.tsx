import Image from "next/image";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/app/_lib/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/app/_components/ui/sidebar";
import SidebarDashboardButton from "./sidebar-dashboard-button";
import {
  CalendarCheckIcon,
  FolderKanbanIcon,
  InboxIcon,
  LayoutDashboardIcon,
  SquareChartGanttIcon,
} from "lucide-react";
import Link from "next/link";

const MENU_ITEMS_SIDE_BAR_LABELS = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboardIcon size={20} />,
  },
  {
    title: "Projetos",
    url: "/dashboard/projects",
    icon: <SquareChartGanttIcon size={20} />,
  },
  {
    title: "Kanban",
    url: "/dashboard/kanban",
    badge: "Pro",
    icon: <FolderKanbanIcon size={20} />,
  },
  {
    title: "Mensagens",
    url: "/dashboard/inbox",
    badge: 3,
    icon: <InboxIcon size={20} />,
  },
  {
    title: "Diário",
    url: "/dashboard/diario",
    icon: <CalendarCheckIcon size={20} />,
  },
];

const SidebarDashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return notFound();

  const user = {
    name: session.user.name as string,
    email: session.user.email as string,
    image: session.user.image as string,
  };

  return (
    <Sidebar>
      <SidebarHeader className="py-8">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Image
                    className="rounded-full"
                    src={"/logo.png"}
                    width={32}
                    height={32}
                    alt="Logo"
                  />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">Portifólio</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS_SIDE_BAR_LABELS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <SidebarDashboardButton href={item.url}>
                      {item.icon}

                      {item.title}
                    </SidebarDashboardButton>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>{/* <NavUser user={user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default SidebarDashboard;

{
  /* <CardContent className="space-y-2 font-medium">
        <SidebarDashboardButton href="/dashboard">
          <LayoutDashboardIcon size={20} />
          Dashboard
        </SidebarDashboardButton>

        <SidebarDashboardButton href="/dashboard/projects">
          <SquareChartGanttIcon size={20} />
          Projetos
        </SidebarDashboardButton>

        <SidebarDashboardButton href="/dashboard/kanban">
          <FolderKanbanIcon size={20} />
          Kanban
          <span className="ml-auto inline-flex items-center justify-center rounded-full bg-gray-700 px-2 text-sm font-medium text-gray-300">
            Pro
          </span>
        </SidebarDashboardButton>

        <SidebarDashboardButton href="/dashboard/inbox">
          <InboxIcon size={20} />
          Inbox
          <span className="ml-auto inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-900 p-3 text-sm font-medium text-blue-300">
            3
          </span>
        </SidebarDashboardButton>

        <SidebarDashboardButton href="/dashboard/diario">
          <CalendarCheckIcon size={20} />
          Diário
        </SidebarDashboardButton>
      </CardContent> */
}
