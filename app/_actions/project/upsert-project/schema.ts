import { z } from "zod"

export const upsertProjectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  imageURL: z.string(),
  repositoryURL: z.string().url({ message: "URL do GitHub inválida" }),
  liveURL: z.string().url({ message: "URL da Vercel inválida" }),
  status: z.enum(["Finalizado", "Em_Att", "Em_Dev"], {
    message: "O status é obrigatório",
  }),
  technologies: z.array(z.string()).min(1, {
    message: "Selecione pelo menos uma tecnologia",
  }),
})

export type UpsertProjectSchema = z.infer<typeof upsertProjectSchema>
