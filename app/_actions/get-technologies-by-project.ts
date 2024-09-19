"use server"

import { Technology } from "@prisma/client"
import { db } from "../_lib/prisma"

export const getTechnologiesByProject = async (projectIds: string[]) => {
  const projectTechnologies = await db.projectTechnology.findMany({
    where: {
      projectId: {
        in: projectIds,
      },
    },
    include: {
      technology: true, // Inclui as tecnologias associadas
    },
  })

  // Organiza as tecnologias por projectId
  const techByProject = projectTechnologies.reduce(
    (acc, pt) => {
      if (!acc[pt.projectId]) {
        acc[pt.projectId] = []
      }
      acc[pt.projectId].push(pt.technology)
      return acc
    },
    {} as Record<string, Technology[]>,
  )

  return techByProject
}
