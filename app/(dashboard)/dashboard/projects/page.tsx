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
import DashboardButtonUser from "../../_components/button-user"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/_lib/auth"
import { DataTable } from "@/app/(dashboard)/dashboard/projects/_components/data-table"
import { projectsTableColumns } from "./_components/table-columns"
import { getProjects } from "@/app/_data_access/get-projects"

const Projects = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return notFound()
  const projects = await getProjects({})

  return (
    <div className="flex min-h-screen w-full overflow-y-auto bg-accent px-6 py-4">
      <Card className="w-full rounded-2xl">
        <CardHeader className="flex-row items-center justify-between py-3">
          <div className="space-y-1">
            <CardTitle className="text-3xl">Projetos</CardTitle>
            <div className="h-2 w-10 rounded-3xl bg-primary"></div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full ring-2 ring-ring ring-offset-2"
              >
                <User2Icon size={24} />
              </Button>
            </DropdownMenuTrigger>

            <DashboardButtonUser />
          </DropdownMenu>
        </CardHeader>

        <CardContent className="pb-0">
          <DataTable columns={projectsTableColumns} data={projects} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Projects
