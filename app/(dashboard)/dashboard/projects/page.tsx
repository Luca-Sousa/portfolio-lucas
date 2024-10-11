import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../_components/ui/card"
import { User2Icon } from "lucide-react"
import { Button } from "../../../_components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../../../_components/ui/dropdown-menu"
import DashboardButtonUser from "../../../_components/dashboard-button-user"
import ModalCreateNewProjetc from "../../../_components/modal-create-new-project"
import ModalCreateNewTechnology from "../../_components/modal-create-new-technology"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/_lib/auth"
import { DataTable } from "@/app/(dashboard)/dashboard/projects/_components/data-table"
import { projectsTableColumns } from "./_components/table-columns"
import { getProjects } from "@/app/_data_access/get-projects"
import CreateProjectButton from "./_components/create-project-button"

const Projects = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return notFound()
  const projects = await getProjects({})

  return (
    <div className="w-full bg-accent">
      <div className="flex flex-col items-center gap-5 p-8">
        <div className="flex w-full justify-end gap-4">
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

          <CreateProjectButton />
        </div>

        <Card className="h-full w-full rounded-2xl">
          <CardHeader className="space-y-3">
            <CardTitle className="text-3xl">Projetos</CardTitle>
            <div className="h-2 w-8 rounded-3xl bg-primary"></div>
          </CardHeader>

          <CardContent>
            <DataTable columns={projectsTableColumns} data={projects} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Projects
