import Image from "next/image"
import NavigationMenuItems from "../_components/navigation-menu"
import SideBar from "../_components/side-bar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../_components/ui/card"
import ProjectsData from "../ProjectsData"
import { ViewIcon } from "lucide-react"
import { Button } from "../_components/ui/button"
import Link from "next/link"

const Projects = () => {
  return (
    <div>
      <SideBar />
      <NavigationMenuItems />

      <Card className="m-4 rounded-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl">
        <CardHeader className="space-y-3">
          <div className="space-y-1 sm:space-y-3">
            <CardTitle className="sm:text-3xl">Projetos</CardTitle>
            <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
          </div>
        </CardHeader>

        <CardContent className="mx-auto max-w-md space-y-6 pt-4 md:grid md:max-w-full md:grid-cols-2 md:gap-6 md:space-y-0">
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
                <div>
                  <h3 className="text-sm text-primary">{project.title}</h3>
                  <p className="text-xs text-zinc-400">{project.tagProj}</p>
                </div>

                <Button variant={"secondary"}>Ver Projeto</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default Projects
