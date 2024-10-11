import { z } from "zod"

export const createTechnologySchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),
  iconURL: z.string().url({
    message: "URL do ícone inválida",
  }),
})

export type CreateTechnologySchema = z.infer<typeof createTechnologySchema>
