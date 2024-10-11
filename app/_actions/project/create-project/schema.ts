import { z } from "zod"

export const createProjectSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  imageUrl: z.string(),
  repositoryURL: z.string().url("URL do Github inválida"),
  liveURL: z.string().url().min(1, "URL da Vercel inválida"),
  status: z.enum(["Finalizado", "Em_Att", "Em_Dev"], {
    message: "O status é obrigatório",
  }),
  technologies: z.array(z.string()).min(1, {
    message: "Selecione pelo menos uma tecnologia",
  }),
})

export type CreateProjectSchema = z.infer<typeof createProjectSchema>
