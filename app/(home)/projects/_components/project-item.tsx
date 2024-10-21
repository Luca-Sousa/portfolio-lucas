"use client"

import { useEffect, useState } from "react"
import { ArrowRight, StarIcon } from "lucide-react"
import { Button } from "../../../_components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../_components/ui/dialog"
import { AspectRatio } from "../../../_components/ui/aspect-ratio"
import { Badge } from "../../../_components/ui/badge"
import { MdDeveloperBoard } from "react-icons/md"
import { GrUpdate } from "react-icons/gr"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaGithub } from "react-icons/fa"
import { IoLogoVercel } from "react-icons/io5"
import Link from "next/link"
import { Skeleton } from "../../../_components/ui/skeleton"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { ProjectStatus } from "@prisma/client"
import { Project } from "../../../_types/types"

interface ProjectItemProps {
  project: Project
  setDataLoaded: (loaded: boolean) => void
}

const ProjectItem = ({ project, setDataLoaded }: ProjectItemProps) => {
  useEffect(() => {
    setDataLoaded(true)
  }, [project, setDataLoaded])

  return (
    <div className="flex gap-4">
      <div className="flex w-full min-w-52 max-w-52 flex-col gap-3 overflow-hidden rounded-2xl bg-secondary p-1.5">
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
            {project.status === ProjectStatus.Em_Dev && (
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

            {project.status === ProjectStatus.Finalizado && (
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

            {project.status === ProjectStatus.Em_Att && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center justify-center"
              >
                <GrUpdate size={12} className="fill-primary text-primary" />
              </motion.div>
            )}

            <p className="text-xs font-semibold">
              {project.status.replace(/_/g, " ")}
            </p>
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
              {project.technologies.map((tech) => (
                <Image
                  title={tech.name}
                  key={tech.id}
                  alt={`Logo ${tech.name}`}
                  src={tech.iconURL}
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
                  <DialogDescription>{project.description}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap items-center justify-center gap-3 py-3">
                  {project.technologies.map((tech) => (
                    <div key={tech.id} className="flex gap-1">
                      <Image
                        alt={`Logo ${tech.name}`}
                        src={tech.iconURL}
                        width={24}
                        height={24}
                      />
                      <p className="text-sm">{tech.name}</p>
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
                        <Link target="_blank" href={project.liveURL}>
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
    </div>
  )
}

export default ProjectItem
