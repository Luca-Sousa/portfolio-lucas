import { db } from "../_lib/prisma"

interface CreateTechnologyParams {
  name: string
  iconURL: string
}

export const createTechnology = async ({
  ...params
}: CreateTechnologyParams) => {
  const newTechnology = await db.technology.create({
    data: { ...params },
  })

  return newTechnology
}
