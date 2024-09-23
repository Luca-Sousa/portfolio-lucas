"use client"

import { FilePlus2 } from "lucide-react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { getTechnologies } from "../_actions/get-technologies"
import { Checkbox } from "./ui/checkbox"
import { ProjectStatus, Technology } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { createProject } from "../_actions/create-project"
import { UploadDropzone } from "../utils/uploadthing"
import { toast } from "sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const ModalCreateNewProjetc = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<ProjectStatus[]>([])

  const formSchema = z.object({
    imageUrl: z.string().url("URL da imagem inválida"),
    title: z.string().min(1, "O título é obrigatório"),
    description: z.string().min(1, "A descrição é obrigatória"),
    linkVercel: z.string().url("URL da Vercel inválida"),
    linkGithub: z.string().url("URL do Github inválida"),
    status: z.string().min(1, "O status é obrigatório"),
    technologies: z
      .array(z.string())
      .min(1, "Selecione pelo menos uma tecnologia"),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      title: "",
      description: "",
      linkVercel: "",
      linkGithub: "",
      status: "",
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

  const handleTextareaResize = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const textarea = event.target
    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleTechnologyChange = (techId: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId],
    )

    form.setValue("technologies", selectedTechnologies)
  }

  const handleSubmitProject = async (data: any) => {
    await createProject({
      title: data.title,
      description: data.description,
      imageURL: data.imageUrl,
      repositoryURL: data.linkGithub,
      liveURL: data.linkVercel,
      status: data.status,
      techIds: selectedTechnologies,
    })

    setImageUrl(null)
    form.reset()
    toast.success("Projeto criado com sucesso")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 font-medium text-secondary">
          <FilePlus2 size={14} />
          Novo Projeto
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-fit">
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex gap-5"
            onSubmit={form.handleSubmit(handleSubmitProject)}
          >
            <div>
              <FormField
                control={form.control}
                name="imageUrl"
                render={() => (
                  <FormItem className="size-fit">
                    <FormLabel>Imagem do Projeto</FormLabel>
                    <FormControl className="relative my-4 h-64 w-96">
                      {imageUrl ? (
                        <div>
                          <Image
                            src={imageUrl}
                            alt="Pré-visualização"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <UploadDropzone
                          content={{
                            label({ ready, isUploading, uploadProgress }) {
                              if (ready) return "Adicione uma Imagem!"
                              if (uploadProgress) return "Carregando..."
                              if (isUploading) return "Carregando..."
                            },
                            button({ ready }) {
                              if (ready) return "Upload"
                            },
                          }}
                          appearance={{
                            label: "Arraste ou clique aqui",
                            button: "bg-background px-5 font-bold",
                            allowedContent: "hidden",
                          }}
                          className="size-full cursor-pointer rounded-md bg-popover hover:bg-accent"
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            const uploadedURL = res[0].url
                            setImageUrl(uploadedURL)
                            form.setValue("imageUrl", uploadedURL)
                            toast.success("Upload Completed")
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(error.message)
                          }}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Descrição do Projeto..."
                        className="min-h-32 resize-none [&::-webkit-scrollbar]:hidden"
                        onInput={handleTextareaResize}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-5">
              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem>
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

              <FormField
                control={form.control}
                name="linkVercel"
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
                name="linkGithub"
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

              <div className="flex items-end justify-between">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          form.setValue("status", value)
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

                <Button
                  variant={"default"}
                  type="submit"
                  className="text-sm text-background"
                >
                  <FilePlus2 className="mr-2" />
                  Salvar Projeto
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalCreateNewProjetc
