import { ProjectStatus, Technology } from "@prisma/client";

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  features: string[];
  thumbnailUrl: string | undefined;
  imagesUrl: string[];
  repositoryUrl: string;
  deployUrl: string;
  status: ProjectStatus;
  technologies: Technology[];
}
