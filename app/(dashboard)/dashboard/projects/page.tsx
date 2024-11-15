import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../_components/ui/card"
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
    <div className="flex h-full bg-accent px-6 py-4">
      <Card className="flex w-full flex-col rounded-2xl">
        <CardHeader className="flex-row items-center justify-between py-3">
          <div className="space-y-1">
            <CardTitle className="text-3xl">Projetos</CardTitle>
            <div className="h-2 w-10 rounded-3xl bg-primary"></div>
          </div>
        </CardHeader>

        <CardContent className="flex h-full flex-col overflow-hidden pb-0">
          <DataTable columns={projectsTableColumns} data={projects} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Projects
