import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../_components/ui/card";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { DataTable } from "@/app/(dashboard)/dashboard/projects/_components/data-table";
import { projectsTableColumns } from "./_components/table-columns";
import { getProjects } from "@/app/_data_access/get-projects";
import { SidebarInset, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { Separator } from "@/app/_components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/app/_components/ui/breadcrumb";

const Projects = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return notFound();
  const projects = await getProjects({});

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Task Manager</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Projetos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 p-4 pt-0">
        <Card className="flex w-full flex-col">
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
    </SidebarInset>
  );
};

export default Projects;
