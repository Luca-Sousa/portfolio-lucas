"use server"

import { db } from "../_lib/prisma"

interface CreateTechnologyParams {
  name: string
  iconURL: string
}

export const createTechnology = async (params: CreateTechnologyParams) => {
  await db.technology.create({
    data: { ...params },
  })
}
