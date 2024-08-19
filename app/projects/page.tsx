import Image from "next/image"
import NavigationMenuItems from "./navigation-menu"
import SideBar from "./side-bar"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import ProjectsData from "../ProjectsData"
import { ViewIcon } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

const Projects = () => {
  return (
    <div className="mx-4 h-full space-y-4 py-4 sm:mx-auto sm:max-w-xl sm:space-y-8 sm:py-8 md:max-w-2xl lg:max-w-4xl xl:flex xl:max-w-7xl xl:gap-10 xl:space-y-0">
      <SideBar />

      <div className="md:hidden">
        <NavigationMenuItems />
      </div>

      <Card className="rounded-2xl md:relative xl:overflow-y-auto xl:[&&::-webkit-scrollbar]:hidden">
        <div className="hidden md:block">
          <NavigationMenuItems />
        </div>

        <CardHeader className="space-y-3">
          <div className="space-y-1 sm:space-y-3">
            <CardTitle className="sm:text-3xl">Projetos</CardTitle>
            <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
          </div>
        </CardHeader>

        <CardContent className="mx-auto max-w-md space-y-6 pt-4 sm:space-y-8 md:grid md:max-w-full md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
          {ProjectsData.map((project) => (
            <div key={project.id} className="group flex flex-col gap-3">
              <div className="group relative flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl sm:h-80 md:h-64">
                <Image
                  className="object-cover group-hover:scale-125"
                  src={project.image}
                  alt={project.title}
                  fill
                />

                <div className="absolute inset-0 flex items-center justify-center bg-card/20 group-hover:bg-card/60">
                  <Button
                    className="hidden rounded-2xl px-3 py-6 text-primary group-hover:flex"
                    variant={"secondary"}
                    asChild
                  >
                    <Link href={"#"}>
                      <ViewIcon />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between pl-4">
                <div className="md:max-w-40 lg:max-w-32">
                  <h3 className="truncate text-sm text-primary">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400">{project.tagProj}</p>
                </div>

                <Button className="shrink-0" variant={"outline"}>
                  Ver Projeto
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default Projects
