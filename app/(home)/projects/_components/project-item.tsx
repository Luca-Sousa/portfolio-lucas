"use client"

import { useEffect } from "react"
import { StarIcon } from "lucide-react"
import { Button } from "../../../_components/ui/button"
import { Badge } from "../../../_components/ui/badge"
import { MdDeveloperBoard } from "react-icons/md"
import { GrUpdate } from "react-icons/gr"
import Image from "next/image"
import { motion } from "framer-motion"
import { ProjectStatus } from "@prisma/client"
import { Project } from "../../../_types/types"
import { useRouter } from "next/navigation"

interface ProjectItemProps {
  project: Project
  setDataLoaded: (loaded: boolean) => void
}

const ProjectItem = ({ project, setDataLoaded }: ProjectItemProps) => {
  useEffect(() => {
    setDataLoaded(true)
  }, [project, setDataLoaded])

  const router = useRouter()

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
              {project.status === "Finalizado" && <span>Finalizado</span>}
              {project.status === "Em_Att" && <span>Atualização</span>}
              {project.status === "Em_Dev" && <span>Desenvolvimento</span>}
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

          <Button
            className="w-full rounded-xl bg-gray-700 px-4 hover:bg-gray-600"
            variant="ghost"
            onClick={() => {
              router.push(`/projects/${project.id}`)
              project
            }}
          >
            Ver Projeto
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
