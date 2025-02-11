"use client";

import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import UpsertProductDialogContent from "./upsert-dialog-content";
import DeleteProjectDialogContent from "./delete-dialog-content";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useState } from "react";
import { Project } from "@/app/_types/types";
import { GrDeploy } from "react-icons/gr";

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
    accessorKey: "imagesUrl",
    header: "",
    cell: ({ row: { original: project } }) => {
      return (
        <div className="relative size-12 overflow-hidden rounded-md">
          <Image
            alt="Imagem do projeto"
            src={project.imagesUrl[0]}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Projeto",
    cell: ({ row: { original: project } }) => {
      return (
        <div className="truncate text-sm">
          {project.title.length > 20
            ? `${project.title.slice(0, 20)}...`
            : project.title}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row: { original: project } }) => {
      return (
        <div className="truncate text-sm">
          {project.description.length > 50
            ? `${project.description.slice(0, 50)}...`
            : project.description}
        </div>
      );
    },
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
      );
    },
    cell: ({ row: { original: project } }) => {
      return (
        <Badge className="text-secondary">
          {project.status.toString().replace(/_/g, " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "technologies",
    header: "Tecnologias",
    cell: ({ row: { original: project } }) => {
      return (
        <div className="flex items-center gap-2 overflow-x-auto">
          {project.technologies.map((tech) => (
            <Image
              key={tech.id}
              alt={tech.name}
              src={tech.iconURL}
              width={18}
              height={18}
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "deployUrl",
    header: "Deploy",
    cell: ({ row: { original: project } }) => {
      return (
        <Button variant={"ghost"} asChild>
          <Link target="_blank" href={project.deployUrl}>
            <GrDeploy size={20} />
          </Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "repositoryURL",
    header: "Repositório",
    cell: ({ row: { original: project } }) => {
      return (
        <Button variant={"ghost"} asChild>
          <Link target="_blank" href={project.repositoryUrl}>
            <FaGithub size={20} />
          </Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    header: "Ações",
    cell: ({ row: { original: project } }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

      const copyID = () => {
        navigator.clipboard.writeText(project.id);
        toast.success("ID do projeto, copiado com sucesso!");
      };

      return (
        <AlertDialog>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontalIcon size={16} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={copyID} className="gap-1.5">
                  <ClipboardCopyIcon size={16} />
                  Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5">
                    <EditIcon size={16} />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>

                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5">
                    <TrashIcon size={16} />
                    Deletar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <UpsertProductDialogContent
              defaultValues={{
                id: project.id,
                title: project.title,
                description: project.description,
                startDate: project.startDate,
                features: project.features as string[],
                thumbnailUrl: project.thumbnailUrl,
                imagesUrl: project.imagesUrl,
                repositoryUrl: project.repositoryUrl,
                deployUrl: project.deployUrl,
                status: project.status,
                technologies: project.technologies.map((tech) => tech.id),
              }}
              onSuccess={() => setEditDialogOpen(false)}
            /> */}

            <DeleteProjectDialogContent
              productId={project.id}
              imageURL={project.imagesUrl[0]}
            />
          </Dialog>
        </AlertDialog>
      );
    },
  },
];
