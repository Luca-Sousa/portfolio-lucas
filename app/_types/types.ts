import { ProjectStatus, Technology } from "@prisma/client"

export interface Project {
  id: string
  title: string
  description: string
  imageURL: string
  repositoryURL: string
  liveURL: string
  status: ProjectStatus
  technologies: Technology[]
}
