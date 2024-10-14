"use client"

import { Button } from "@/app/_components/ui/button"
import { Checkbox } from "@/app/_components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"
import { ProjectStatus, Technology } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpDown,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react"
import { Badge } from "@/app/_components/ui/badge"
import Link from "next/link"
import { IoLogoVercel } from "react-icons/io5"
import { FaGithub } from "react-icons/fa"
import Image from "next/image"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog"
import DeleteProjectDialogContent from "./delete-dialog-content"
import { useState } from "react"
import { Dialog } from "@/app/_components/ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"

export type Project = {
  id: string
  title: string
  description: string
  imageURL: string
  repositoryURL: string
  liveURL: string
  status: ProjectStatus
  technologies: Technology[]
}

export const projectsTableColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="data-[state=checked]:text-black"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="data-[state=checked]:text-black"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageURL",
    header: "",
    cell: ({ row }) => {
      const project = row.original

      return (
        <Image
          alt="Imagem do projeto"
          src={project.imageURL}
          width={64}
          height={56}
          className="rounded-xl"
        />
      )
    },
  },
  {
    accessorKey: "title",
    header: "Projeto",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const project = row.original

      return (
        <Badge className="text-secondary">
          {project.status.toString().replace(/_/g, " ")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "technologies",
    header: "Tecnologias",
    cell: ({ row }) => {
      const project = row.original

      return (
        <div className="flex items-center gap-2 overflow-x-auto">
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
      )
    },
  },
  {
    accessorKey: "liveURL",
    header: "Vercel",
    cell: ({ row }) => {
      const project = row.original

      return (
        <Button variant={"ghost"} asChild>
          <Link target="_blank" href={project.liveURL}>
            <IoLogoVercel size={20} />
          </Link>
        </Button>
      )
    },
  },
  {
    accessorKey: "repositoryURL",
    header: "GitHub",
    cell: ({ row }) => {
      const project = row.original

      return (
        <Button variant={"ghost"} asChild>
          <Link target="_blank" href={project.repositoryURL}>
            <FaGithub size={20} />
          </Link>
        </Button>
      )
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const project = row.original

      const copyID = () => {
        navigator.clipboard.writeText(project.id)
        toast.success("ID do projeto, copiado com sucesso!")
      }

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={copyID} className="gap-1.5">
                <ClipboardCopyIcon size={16} />
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-1.5">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>

              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="gap-1.5">
                  <TrashIcon size={16} />
                  Deletar
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteProjectDialogContent productId={project.id} />
        </AlertDialog>
      )
    },
  },
]
