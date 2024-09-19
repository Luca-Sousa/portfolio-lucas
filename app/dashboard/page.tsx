import { notFound } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../_components/ui/card"
import DashboardProjects from "../_components/dashboard-projects"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import Image from "next/image"
import Link from "next/link"
import {
  CalendarCheck,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  User2Icon,
} from "lucide-react"
import { TbAppsFilled } from "react-icons/tb"
import { Input } from "../_components/ui/input"
import { Button } from "../_components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../_components/ui/dropdown-menu"
import DashboardButtonUser from "../_components/dashboard-button-user"
import ModalCreateNewProjetc from "../_components/modal-create-new-project"
import ModalCreateNewTechnology from "../_components/modal-create-new-technology"

const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) return notFound()

  return (
    <div className="mx-4 flex h-full flex-col gap-4 py-4 sm:mx-auto sm:max-w-xl sm:gap-8 sm:py-8 md:max-w-2xl lg:max-w-4xl xl:max-w-[1920px] xl:flex-row xl:gap-10 xl:p-0">
      <Card
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full rounded-none transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
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

        <CardContent className="h-full overflow-y-auto px-3 py-4">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href={"#"}
                className="flex items-center rounded-lg p-2 text-primary hover:bg-secondary"
              >
                <LayoutDashboard size={25} />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex items-center rounded-lg p-2 text-secondary-foreground hover:bg-secondary"
              >
                <TbAppsFilled size={25} />

                <span className="ms-3 flex-1 whitespace-nowrap">Projetos</span>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex items-center rounded-lg p-2 text-secondary-foreground hover:bg-secondary"
              >
                <FolderKanban size={25} />
                <span className="ms-3 flex-1 whitespace-nowrap">Kanban</span>
                <span className="ms-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex items-center rounded-lg p-2 text-secondary-foreground hover:bg-secondary"
              >
                <Inbox size={25} />
                <span className="ms-3 flex-1 whitespace-nowrap">Inbox</span>
                <span className="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex items-center rounded-lg p-2 text-secondary-foreground hover:bg-secondary"
              >
                <CalendarCheck size={25} />
                <span className="ms-3 flex-1 whitespace-nowrap">Diário</span>
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="ml-64 flex w-full flex-col items-center gap-5 bg-accent p-8">
        <div className="flex w-full justify-end gap-4">
          <Input className="w-96" placeholder="Search..."></Input>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="rounded-full bg-popover hover:scale-110 hover:bg-popover"
              >
                <User2Icon />
              </Button>
            </DropdownMenuTrigger>

            <DashboardButtonUser />
          </DropdownMenu>
        </div>

        <div className="flex w-full items-center justify-end gap-3">
          <ModalCreateNewTechnology />
          <ModalCreateNewProjetc />
        </div>

        <Card className="w-full rounded-2xl">
          <CardHeader className="space-y-3">
            <div className="space-y-1 sm:space-y-3">
              <CardTitle className="sm:text-3xl">Projetos</CardTitle>
              <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
            </div>
          </CardHeader>

          <CardContent>
            <DashboardProjects />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
