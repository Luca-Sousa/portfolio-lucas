"use server"

import { db } from "../_lib/prisma"

interface GetProjectsProps {
  status: string
}

export const getProjects = async ({ status }: GetProjectsProps) => {
  // Primeiro, busque todos os projetos com as tecnologias incluídas
  const projects = await db.project.findMany({
    where: { status },
    include: {
      technologies: true,
    },
  })

  // Em seguida, ordene os projetos pela quantidade de tecnologias
  const sortedProjects = projects.sort(
    (a, b) => b.technologies.length - a.technologies.length,
  )

  return sortedProjects
}
