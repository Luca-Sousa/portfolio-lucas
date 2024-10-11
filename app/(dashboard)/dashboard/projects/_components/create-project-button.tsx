"use client"

import { FilePlus2, PanelLeftCloseIcon } from "lucide-react"
import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Textarea } from "@/app/_components/ui/textarea"
import { Label } from "@/app/_components/ui/label"
import { Checkbox } from "@/app/_components/ui/checkbox"
import { ProjectStatus, Technology } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEdgeStore } from "@/app/_lib/edgestore"
import {
  CreateProjectSchema,
  createProjectSchema,
} from "@/app/_actions/project/create-project/schema"
import { getTechnologies } from "@/app/_data_access/get-technologies"
import { createProject } from "@/app/_actions/project/create-project"
import { MultiImageDropzoneUsage } from "@/app/(dashboard)/_components/MultiImageDropzoneUsage"

const CreateProjectButton = () => {
  const { edgestore } = useEdgeStore()
  const [url, setUrl] = useState<string>()
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [status, setStatus] = useState<ProjectStatus[]>([])

  const form = useForm({
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

  // const handleTextareaResize = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>,
  // ) => {
  //   const textarea = event.target
  //   textarea.style.height = "auto"
  //   textarea.style.height = `${textarea.scrollHeight}px`
  // }

  const handleTechnologyChange = (techId: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId],
    )

    form.setValue("technologies", selectedTechnologies)
  }

  const handleSubmitProject = async (data: CreateProjectSchema) => {
    if (!url) {
      toast.error("Selecione uma imagem para o projeto.")
      return
    }

    data.imageUrl = url

    try {
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

      toast.success("Projeto criado com sucesso")
    } catch (error) {
      toast.error("Ocorreu um erro ao criar o projeto.")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 font-medium text-secondary">
          <FilePlus2 size={14} />
          Novo Projeto
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>
        </DialogHeader>

        <Form {...form}>
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

                <div className="flex items-end justify-end gap-3">
                  <Button variant={"secondary"} className="gap-1.5">
                    <PanelLeftCloseIcon size={18} />
                    Cancelar
                  </Button>

                  <Button type="submit" className="gap-1.5 text-secondary">
                    <FilePlus2 size={18} />
                    Salvar Projeto
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectButton
