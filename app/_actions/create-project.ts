"use server"

import { ProjectStatus } from "@prisma/client"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface CreateProjectParams {
  title: string
  description: string
  imageURL: string
  repositoryURL: string
  liveURL: string
  status: ProjectStatus
  techIds: string[]
}

export const createProject = async (params: CreateProjectParams) => {
  const user = await getServerSession(authOptions)

  if (!user) {
    throw new Error("Usuário não autenticado")
  }

  await db.project.create({
    data: {
      title: params.title,
      description: params.description,
      imageURL: params.imageURL,
      repositoryURL: params.repositoryURL,
      liveURL: params.liveURL,
      status: params.status,
      technologies: {
        create: params.techIds.map((techId) => ({
          technology: {
            connect: { id: techId },
          },
        })),
      },
    },
  })
}
