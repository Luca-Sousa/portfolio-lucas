import Image from "next/image"
import { getProjects } from "../_actions/get-projects"
import { Avatar, AvatarImage } from "./ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
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
import { IoLogoVercel } from "react-icons/io5"
import { FaGithub } from "react-icons/fa"
import { Badge } from "./ui/badge"

const DashboardProjects = async () => {
  const projects = await getProjects({})

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Projeto</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead>Tecnologies</TableHead>
          <TableHead>Vercel</TableHead>
          <TableHead>GitHub</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>
              <Avatar className="h-14 w-16 rounded-xl">
                <AvatarImage src={project.imageURL} />
              </Avatar>
            </TableCell>

            <TableCell className="w-fit truncate font-medium">
              {project.title}
            </TableCell>

            <TableCell className="max-w-72 truncate font-medium">
              {project.description}
            </TableCell>

            <TableCell className="text-center">
              <Badge className="text-secondary">
                {project.status.toString().replace(/_/g, " ")}
              </Badge>
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
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

            <TableCell>
              <Button variant={"ghost"} asChild>
                <Link target="_blank" href={project.liveURL}>
                  <IoLogoVercel size={20} />
                </Link>
              </Button>
            </TableCell>

            <TableCell className="">
              <Button variant={"ghost"} asChild>
                <Link target="_blank" href={project.repositoryURL}>
                  <FaGithub size={20} />
                </Link>
              </Button>
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
    </Table>
  )
}

export default DashboardProjects
