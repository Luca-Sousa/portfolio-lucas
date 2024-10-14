"use client"

import { MultiImageDropzoneUsage } from "@/app/(dashboard)/_components/MultiImageDropzoneUsage"
import { createProject } from "@/app/_actions/project/create-project"
import {
  createProjectSchema,
  CreateProjectSchema,
} from "@/app/_actions/project/create-project/schema"
import { Button } from "@/app/_components/ui/button"
import { Checkbox } from "@/app/_components/ui/checkbox"
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import { Textarea } from "@/app/_components/ui/textarea"
import { getTechnologies } from "@/app/_data_access/get-technologies"
import { useEdgeStore } from "@/app/_lib/edgestore"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProjectStatus, Technology } from "@prisma/client"
import { PanelLeftCloseIcon, Loader2Icon, FilePlus2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

interface UpsertProductDialogContentProps {
  onSuccess?: () => void
}

const UpsertProductDialogContent = ({
  onSuccess,
}: UpsertProductDialogContentProps) => {
  const { edgestore } = useEdgeStore()
  const [url, setUrl] = useState<string>()
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [status, setStatus] = useState<ProjectStatus[]>([])

  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      repositoryURL: "",
      liveURL: "",
      status: "" as ProjectStatus,
      technologies: [] as string[],
    },
  })

  useEffect(() => {
    const fetchTechnologies = async () => {
      const techs = await getTechnologies()
      setTechnologies(techs)
    }

    fetchTechnologies()
  }, [])

  useEffect(() => {
    setStatus(Object.values(ProjectStatus))
  }, [])

  const handleTechnologyChange = (techId: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId],
    )

    form.setValue("technologies", selectedTechnologies)
  }

  const handleSubmitProject = async (data: CreateProjectSchema) => {
    try {
      if (!url) {
        toast.error("Selecione uma imagem para o projeto.")
        return
      }
      data.imageUrl = url

      await createProject({
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        repositoryURL: data.repositoryURL,
        liveURL: data.liveURL,
        status: data.status,
        technologies: selectedTechnologies,
      })

      if (url) {
        await edgestore.publicFiles.confirmUpload({ url })
      }

      onSuccess?.()
      toast.success("Projeto criado com sucesso")
    } catch (error) {
      toast.error("Ocorreu um erro ao criar o projeto.")
    }
  }

  return (
    <DialogContent className="w-full max-w-screen-lg">
      <FormProvider {...form}>
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmitProject)}
          className="space-y-2"
        >
          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem className="basis-[30%]">
                  <FormLabel>Imagem do Projeto</FormLabel>
                  <FormControl className="relative my-4 h-64 w-96">
                    <MultiImageDropzoneUsage setUrl={setUrl} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="basis-[70%] px-2">
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="basis-4/5">
                      <FormLabel>Título do Projeto</FormLabel>
                      <FormControl>
                        <Input placeholder="Meu Projeto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="basis-1/5">
                      <FormLabel>Status</FormLabel>
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          form.setValue("status", value as ProjectStatus)
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            {status.map((statusItem) => (
                              <SelectItem key={statusItem} value={statusItem}>
                                {statusItem.replace(/_/g, " ")}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Descrição do Projeto..."
                        className="min-h-[218px] resize-none"
                        // onInput={handleTextareaResize}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Tecnologias</FormLabel>
                  <div className="grid grid-cols-3 gap-2">
                    {technologies.map((tech) => (
                      <div key={tech.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedTechnologies.includes(tech.id)}
                          onCheckedChange={() =>
                            handleTechnologyChange(tech.id)
                          }
                          id={tech.id.toString()}
                          {...field}
                        />
                        <Label
                          htmlFor={tech.id.toString()}
                          className="flex items-center gap-2"
                        >
                          <Image
                            alt={tech.name}
                            src={tech.iconURL}
                            width={18}
                            height={18}
                          />
                          {tech.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="basis-1/2 space-y-5">
              <FormField
                control={form.control}
                name="liveURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vercel</FormLabel>
                    <FormControl>
                      <Input placeholder="Link da vercel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repositoryURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github</FormLabel>
                    <FormControl>
                      <Input placeholder="Link da Github" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex items-end justify-end gap-3">
                <DialogClose asChild>
                  <Button
                    type="reset"
                    disabled={form.formState.isSubmitting}
                    variant={"secondary"}
                    className="gap-1.5"
                  >
                    <PanelLeftCloseIcon size={18} />
                    Cancelar
                  </Button>
                </DialogClose>

                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="gap-1.5 text-secondary"
                >
                  {form.formState.isSubmitting ? (
                    <Loader2Icon className="animate-spin" size={16} />
                  ) : (
                    <FilePlus2 size={16} />
                  )}
                  Salvar Projeto
                </Button>
              </DialogFooter>
            </div>
          </div>
        </form>
      </FormProvider>
    </DialogContent>
  )
}

export default UpsertProductDialogContent
