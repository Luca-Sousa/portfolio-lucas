"use server"

import { db } from "../_lib/prisma"

interface GetProjectsProps {
  status: string
}

export const getProjects = async ({ status }: GetProjectsProps) => {
  return db.project.findMany({
    where: { status },
    include: {
      technologies: true,
    },
  })
}
