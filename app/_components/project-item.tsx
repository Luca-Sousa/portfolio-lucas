"use client"

import { useEffect, useState } from "react"
import { ArrowRight, StarIcon } from "lucide-react"
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
import { motion } from "framer-motion"
import { FaGithub } from "react-icons/fa"
import { IoLogoVercel } from "react-icons/io5"
import Link from "next/link"
import { getProjects } from "../_actions/get-projects"
import { Skeleton } from "./ui/skeleton"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

interface Technology {
  id: string
  name: string
  iconURL: string
}

interface Project {
  id: string
  title: string
  description: string
  imageURL: string
  repositoryURL: string
  liveURL: string
  status: string
  technologies: Technology[]
}

const ProjectItem: React.FC<{
  status: string
  setDataLoaded: (loaded: boolean) => void
}> = ({ status, setDataLoaded }) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true) // Adicione esse estado

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects({ status })
        const mappedProjects = fetchedProjects.map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          imageURL: project.imageURL,
          repositoryURL: project.repositoryURL,
          liveURL: project.liveURL,
          status: project.status,
          technologies: project.technologies,
        }))
        setProjects(mappedProjects)
      } catch (error) {
        console.error("Erro ao carregar os projetos:", error)
      } finally {
        setIsLoading(false)
        setDataLoaded(true)
      }
    }

    fetchProjects()
  }, [status, setDataLoaded])

  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [])

    return windowSize
  }
  const { width } = useWindowSize()
  const skeletonCount =
    width < 540 ? 1 : width < 768 ? 2 : width < 1024 ? 3 : width < 1300 ? 4 : 5

  return (
    <div className={`${isLoading && "w-full"} flex gap-4`}>
      {isLoading ? (
        <div className="flex w-full gap-4">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-72 w-full rounded-2xl bg-secondary"
            >
              <span className="flex h-full animate-pulse items-center justify-center gap-3 bg-secondary/50 text-sm text-secondary-foreground">
                <AiOutlineLoading3Quarters size={18} className="animate-spin" />
                Carregando...
              </span>
            </Skeleton>
          ))}
        </div>
      ) : (
        projects.map((project) => (
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
                  src={project.imageURL}
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

                <div className="flex items-center gap-3 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  {project.technologies?.map((technology) => (
                    <Image
                      title={technology.name}
                      key={technology.id}
                      alt={`Logo ${technology.name}`}
                      src={technology.iconURL}
                      width={24}
                      height={24}
                      className="hover:scale-105"
                    />
                  ))}
                </div>
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
                      src={project.imageURL}
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
                      <DialogDescription>
                        {project.description}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-wrap items-center justify-center gap-3 py-3">
                      {project.technologies?.map((technology) => (
                        <div key={technology.id} className="flex gap-1">
                          <Image
                            alt={`Logo ${technology.name}`}
                            src={technology.iconURL}
                            width={24}
                            height={24}
                          />
                          <p className="text-sm">{technology.name}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row lg:h-full lg:flex-col lg:justify-between">
                      <div className="flex w-full gap-4 lg:flex-col">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.8 }}
                          className="w-full"
                        >
                          <Button
                            size={"lg"}
                            className="w-full overflow-hidden bg-cyan-600 px-0 hover:bg-cyan-600 xl:w-[90%]"
                            asChild
                          >
                            <Link target="_blank" href={project.repositoryURL}>
                              <div className="flex flex-1 items-center justify-center gap-2 uppercase">
                                <FaGithub size={20} />
                                Github
                              </div>

                              <div className="hidden h-full w-10 items-center justify-center bg-orange-400 sm:flex lg:w-14">
                                <ArrowRight />
                              </div>
                            </Link>
                          </Button>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.8 }}
                          className="w-full"
                        >
                          <Button
                            size={"lg"}
                            className="w-full overflow-hidden bg-cyan-600 px-0 hover:bg-cyan-600 xl:w-[90%]"
                            asChild
                          >
                            <Link target="_blank" href={project.repositoryURL}>
                              <div className="flex flex-1 items-center justify-center gap-2 uppercase">
                                <IoLogoVercel size={20} />
                                Vercel
                              </div>

                              <div className="hidden h-full w-10 items-center justify-center bg-orange-400 sm:flex lg:w-14">
                                <ArrowRight />
                              </div>
                            </Link>
                          </Button>
                        </motion.button>

                        {/* <Button
                          size={"lg"}
                          className="flex w-full gap-2 text-secondary"
                          asChild
                        >
                          <Link target="_blank" href={project.liveURL}>
                            <IoLogoVercel size={20} />
                            Vercel
                          </Link>
                        </Button> */}
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
        ))
      )}
    </div>
  )
}

export default ProjectItem
