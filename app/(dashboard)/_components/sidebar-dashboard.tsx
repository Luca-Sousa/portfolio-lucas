import { Card, CardContent, CardHeader } from "@/app/_components/ui/card"
import {
  CalendarCheckIcon,
  FolderKanbanIcon,
  InboxIcon,
  LayoutDashboardIcon,
  SquareChartGanttIcon,
} from "lucide-react"
import Image from "next/image"
import SidebarDashboardButton from "./sidebar-dashboard-button"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { authOptions } from "@/app/_lib/auth"

const SidebarDashboard = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return notFound()

  return (
    <Card className="max-w-64 rounded-none" aria-label="Sidebar">
      <CardHeader className="flex flex-row items-center gap-3">
        <Image
          className="rounded-full"
          src={"/logo.png"}
          width={32}
          height={32}
          alt="Image Logo"
        />

        <span>{session.user.name}</span>
      </CardHeader>

      <CardContent className="space-y-2 font-medium">
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
          <span className="ml-auto inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            Pro
          </span>
        </SidebarDashboardButton>

        <SidebarDashboardButton href="/dashboard/inbox">
          <InboxIcon size={20} />
          Inbox
          <span className="ml-auto inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            3
          </span>
        </SidebarDashboardButton>

        <SidebarDashboardButton href="/dashboard/diario">
          <CalendarCheckIcon size={20} />
          Diário
        </SidebarDashboardButton>
      </CardContent>
    </Card>
  )
}

export default SidebarDashboard