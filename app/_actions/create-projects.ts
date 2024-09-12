"use server"

import { db } from "../_lib/prisma"

interface CreateProjectsParams {
  title: string
  description: string
  imageURL: string
  repositoryURL: string
  liveURL: string
  status: string
  techIds: string[]
}

export const createProjects = async ({ ...params }: CreateProjectsParams) => {
  await db.project.create({
    data: { ...params },
  })
}
