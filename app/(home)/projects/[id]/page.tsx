import { AspectRatio } from "@/app/_components/ui/aspect-ratio"
import { Button } from "@/app/_components/ui/button"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { getProjectById } from "@/app/_data_access/get-project-by-id"
import { ArrowRight, CircleArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FaGithub } from "react-icons/fa"
import { IoLogoVercel } from "react-icons/io5"

interface ProjectPageProps {
  params: { id: string }
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const project = await getProjectById(params.id)

  if (!project) {
    notFound()
  }

  return (
    <>
      <CardHeader className="gap-3">
        <Button size="icon" variant="ghost" className="rounded-full" asChild>
          <Link href="/projects" aria-label="Voltar para Projetos">
            <CircleArrowLeft size={36} className="text-primary" />
          </Link>
        </Button>

        <div className="space-y-3">
          <CardTitle className="sm:text-3xl">{project.title}</CardTitle>
          <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
        </div>

        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={project.imageURL}
            alt={project.title}
            fill
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>

        <div className="flex flex-col gap-4 lg:mx-auto lg:max-w-[600px]">
          <div className="flex flex-wrap items-center justify-center gap-3 py-3">
            {project.technologies.map((tech) => (
              <div key={tech.id} className="flex gap-1">
                <Image
                  alt={`Logo ${tech.name}`}
                  src={tech.iconURL}
                  width={24}
                  height={24}
                />
                <p className="text-sm">{tech.name}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto flex w-full max-w-72 flex-col gap-4 md:max-w-[430px] md:flex-row lg:max-w-full">
            <Button
              size={"lg"}
              className="w-full overflow-hidden bg-cyan-600 px-0 hover:bg-cyan-600 xl:w-[90%]"
              asChild
            >
              <Link target="_blank" href={project.repositoryURL}>
                <div className="flex flex-1 items-center justify-center gap-2 uppercase">
                  <FaGithub size={20} />
                  Github
                </div>
                <div className="hidden h-full w-10 items-center justify-center bg-orange-400 sm:flex lg:w-14">
                  <ArrowRight />
                </div>
              </Link>
            </Button>

            <Button
              size={"lg"}
              className="w-full overflow-hidden bg-cyan-600 px-0 hover:bg-cyan-600 xl:w-[90%]"
              asChild
            >
              <Link target="_blank" href={project.liveURL}>
                <div className="flex flex-1 items-center justify-center gap-2 uppercase">
                  <IoLogoVercel size={20} />
                  Vercel
                </div>
                <div className="hidden h-full w-10 items-center justify-center bg-orange-400 sm:flex lg:w-14">
                  <ArrowRight />
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  )
}

export default ProjectPage