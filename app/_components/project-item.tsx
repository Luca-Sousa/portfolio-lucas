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
import { motion } from "framer-motion"
import { FaGithub } from "react-icons/fa"
import { IoLogoVercel } from "react-icons/io5"
import Link from "next/link"

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
          <div className="group relative flex h-48 w-full items-center justify-center overflow-hidden rounded-t-2xl">
            <motion.div
              className="relative h-full w-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                className="object-cover"
                src={project.image}
                alt={project.title}
                fill
              />

              <div className="absolute inset-0 flex items-center justify-center bg-card/25 group-hover:bg-card/10"></div>
            </motion.div>

            <Badge
              className="absolute left-2 top-2 z-10 cursor-default space-x-1"
              variant={"secondary"}
            >
              {status === "Em Dev" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center"
                >
                  <MdDeveloperBoard
                    size={12}
                    className="fill-primary text-primary"
                  />
                </motion.div>
              )}

              {status === "Finalizado" && (
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center"
                >
                  <StarIcon size={12} className="fill-primary text-primary" />
                </motion.div>
              )}
              {status === "Em Att" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex items-center justify-center"
                >
                  <GrUpdate size={12} className="fill-primary text-primary" />
                </motion.div>
              )}

              <p className="text-xs font-semibold">{status}</p>
            </Badge>
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

              <DialogContent className="mx-auto flex w-full max-w-xs flex-col gap-6 px-4 min-[450px]:max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl lg:flex-row xl:max-w-6xl">
                <AspectRatio
                  ratio={16 / 9}
                  className="mt-4 size-full flex-1 bg-muted lg:mt-0 lg:flex-1"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>

                <div className="mt-3 flex flex-col gap-4 lg:mt-5 lg:w-64 xl:w-96">
                  <DialogHeader className="space-y-4">
                    <DialogTitle className="text-primary">
                      {project.title}
                    </DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-4 md:flex-row lg:h-full lg:flex-col lg:justify-between">
                    <div className="flex w-full gap-2 lg:flex-col lg:gap-4">
                      <Button
                        size={"lg"}
                        className="flex w-full gap-2 text-secondary"
                        asChild
                      >
                        <Link target="_blank" href={project.linkGithub}>
                          <FaGithub size={20} />
                          Github
                        </Link>
                      </Button>

                      <Button
                        size={"lg"}
                        className="flex w-full gap-2 text-secondary"
                        asChild
                      >
                        <Link target="_blank" href={project.linkVercel}>
                          <IoLogoVercel size={20} />
                          Vercel
                        </Link>
                      </Button>
                    </div>

                    <DialogFooter className="w-full">
                      <DialogClose asChild>
                        <Button
                          size={"lg"}
                          className="w-full"
                          type="button"
                          variant="destructive"
                        >
                          Fechar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </div>
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
