"use client"

import { FolderOpenDotIcon, StarIcon } from "lucide-react"
import { Badge } from "../../../_components/ui/badge"
import { MdDeveloperBoard } from "react-icons/md"
import { GrUpdate } from "react-icons/gr"
import Image from "next/image"
import { motion } from "framer-motion"
import { ProjectStatus } from "@prisma/client"
import { Project } from "../../../_types/types"
import { useRouter } from "next/navigation"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"

interface ProjectItemProps {
  project: Project
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const router = useRouter()

  return (
    <Card>
      <div className="px-4 pt-4">
        <Button
          title="Ver Projeto"
          variant={"ghost"}
          className="relative aspect-square size-full overflow-hidden"
          onClick={() => {
            router.push(`/projects/${project.id}`)
          }}
        >
          <Image
            className="object-left-top"
            src={project.imageURL}
            alt={project.title}
            fill
          />

          <Badge
            className="absolute right-2 top-2 max-w-fit space-x-1.5 px-1 py-px text-xs font-medium"
            variant="secondary"
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

            {project.status === "Finalizado" && <span>Finalizado</span>}
            {project.status === "Em_Att" && <span>Atualização</span>}
            {project.status === "Em_Dev" && <span>Desenvolvimento</span>}
          </Badge>
        </Button>
      </div>

      <CardHeader className="p-4">
        <CardTitle className="truncate text-sm font-bold text-primary">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-4 max-h-16 min-h-16 text-xs">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-col gap-4 px-4 pb-4">
        <div className="flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {project.technologies.map((tech) => (
            <Image
              key={tech.id}
              title={tech.name}
              alt={`Logo ${tech.name}`}
              src={tech.iconURL}
              width={24}
              height={24}
            />
          ))}
        </div>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            router.push(`/projects/${project.id}`)
          }}
        >
          <FolderOpenDotIcon size={16} className="mr-2" />
          Ver Projeto
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProjectItem
