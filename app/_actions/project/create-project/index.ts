"use server"

import { db } from "../../../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../_lib/auth"
import { createProjectSchema, CreateProjectSchema } from "./schema"

export const createProject = async (data: CreateProjectSchema) => {
  createProjectSchema.parse(data)
  const user = await getServerSession(authOptions)

  if (!user) {
    throw new Error("Usuário não autenticado")
  }

  await db.project.create({
    data: {
      title: data.title,
      description: data.description,
      imageURL: data.imageUrl,
      repositoryURL: data.repositoryURL,
      liveURL: data.liveURL,
      status: data.status,
      technologies: {
        create: data.technologies.map((techId) => ({
          technology: {
            connect: { id: techId },
          },
        })),
      },
    },
  })
}
