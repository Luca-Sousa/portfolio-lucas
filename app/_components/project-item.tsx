import { StarIcon, ViewIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { AspectRatio } from "./ui/aspect-ratio"
import { Badge } from "./ui/badge"
import { MdDeveloperBoard } from "react-icons/md"
import { GrUpdate } from "react-icons/gr"
import Image from "next/image"
import ProjectsData from "../ProjectsData"

const ProjectItem: React.FC<{ status: string }> = ({ status }) => {
  const filteredProjects = ProjectsData.filter(
    (project) => project.status === status,
  )

  return (
    <div className="flex gap-4">
      {filteredProjects.map((project) => (
        <div
          key={project.id}
          className="flex max-w-52 flex-col gap-3 overflow-hidden rounded-2xl bg-secondary p-1.5"
        >
          <div className="group relative flex h-72 w-full items-center justify-center overflow-hidden rounded-t-2xl sm:h-80 md:h-64 xl:h-48">
            <Image
              className="object-cover"
              src={project.image}
              alt={project.title}
              fill
            />

            <Badge
              className="absolute left-2 top-2 z-10 space-x-1"
              variant={"secondary"}
            >
              {status === "Em Dev" && (
                <MdDeveloperBoard
                  size={12}
                  className="fill-primary text-primary"
                />
              )}
              {status === "Finalizado" && (
                <StarIcon size={12} className="fill-primary text-primary" />
              )}
              {status === "Em Att" && (
                <GrUpdate size={12} className="fill-primary text-primary" />
              )}

              <p className="text-xs font-semibold">{status}</p>
            </Badge>

            <div className="absolute inset-0 flex items-center justify-center bg-card/40 group-hover:bg-card/20"></div>
          </div>

          <div className="space-y-3">
            <div className="space-y-3 px-1.5">
              <h3 className="truncate text-center text-sm font-bold text-primary">
                {project.title}
              </h3>

              <p className="line-clamp-4 min-h-14 text-left text-xs text-zinc-400">
                {project.description}
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-full rounded-xl bg-gray-700 px-4 hover:bg-gray-600"
                  variant="ghost"
                >
                  Ver Projeto
                </Button>
              </DialogTrigger>

              <DialogContent className="z-50 flex items-center sm:max-w-5xl">
                <AspectRatio ratio={16 / 9} className="flex-1 bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>

                <div className="flex flex-col gap-4">
                  <DialogHeader className="max-w-64 space-y-4">
                    <DialogTitle className="text-primary">
                      {project.title}
                    </DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button
                        className="w-full"
                        type="button"
                        variant="secondary"
                      >
                        Fechar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectItem
