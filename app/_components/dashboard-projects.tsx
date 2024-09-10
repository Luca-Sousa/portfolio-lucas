import Image from "next/image"
import { getProjects } from "../_actions/get-projects"
import { Avatar, AvatarImage } from "./ui/avatar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import Link from "next/link"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Settings2 } from "lucide-react"
import ModalCreateNewProjetc from "./modal-create-new-project"

interface DashboardProjectsProps {
  status: string
}

const DashboardProjects = async ({ status }: DashboardProjectsProps) => {
  const projects = await getProjects({ status })

  return (
    <Table>
      <TableCaption>Lista de Projetos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Projeto</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tecnologies</TableHead>
          <TableHead>Link Vercel</TableHead>
          <TableHead>Link GitHub</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={project.imageURL} />
              </Avatar>
            </TableCell>

            <TableCell className="w-full max-w-48 truncate font-medium">
              {project.title}
            </TableCell>

            <TableCell className="w-full max-w-32 truncate font-medium">
              {project.description}
            </TableCell>

            <TableCell>{project.status}</TableCell>

            <TableCell>
              <div className="flex w-32 items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {project.technologies.map((tech) => (
                  <Image
                    key={tech.id}
                    alt={tech.name}
                    src={tech.iconURL}
                    width={24}
                    height={24}
                  />
                ))}
              </div>
            </TableCell>

            <TableCell className="w-full max-w-24 truncate text-xs">
              <Link
                target="_blank"
                href={project.liveURL}
                className="hover:underline"
              >
                {project.liveURL}
              </Link>
            </TableCell>

            <TableCell className="w-full max-w-24 truncate text-xs">
              <Link
                target="_blank"
                href={project.repositoryURL}
                className="hover:underline"
              >
                {project.repositoryURL}
              </Link>
            </TableCell>

            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="flex items-center gap-2"
                  >
                    <Settings2 size={14} />
                    Editar
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Configurações do Projeto</DialogTitle>
                  </DialogHeader>

                  <form action="">
                    <div>
                      <Image
                        alt={project.title}
                        src={project.imageURL}
                        width={200}
                        height={200}
                      />
                    </div>
                  </form>

                  <DialogFooter>
                    <Button variant={"destructive"} type="submit">
                      Salvar Alterações
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <ModalCreateNewProjetc />
      </TableFooter>
    </Table>
  )
}

export default DashboardProjects
