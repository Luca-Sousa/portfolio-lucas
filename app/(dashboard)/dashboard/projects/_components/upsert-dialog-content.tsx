"use client"

import { SingleImageDropzone } from "@/app/(dashboard)/_components/single-image-dropzone"
import { upsertProject } from "@/app/_actions/project/upsert-project"
import {
  upsertProjectSchema,
  UpsertProjectSchema,
} from "@/app/_actions/project/upsert-project/schema"
import { Button } from "@/app/_components/ui/button"
import { Checkbox } from "@/app/_components/ui/checkbox"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
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
  Form,
  FormDescription,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
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
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface UpsertProductDialogContentProps {
  defaultValues?: UpsertProjectSchema
  onSuccess?: () => void
}

const UpsertProductDialogContent = ({
  defaultValues,
  onSuccess,
}: UpsertProductDialogContentProps) => {
  const { edgestore } = useEdgeStore()
  const [file, setFile] = useState<File>()
  const [url, setUrl] = useState<string>()
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [status, setStatus] = useState<ProjectStatus[]>([])

  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(upsertProjectSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      imageURL: "",
      repositoryURL: "",
      liveURL: "",
      status: "" as ProjectStatus,
      technologies: [],
    },
  })

  const isEditing = !!defaultValues

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

  const handleFileChange = async (file: File) => {
    if (isEditing) {
      console.log("Substituindo imagem:", defaultValues.imageURL)
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: form.getValues("imageURL"),
        },
      })

      setFile(file)
      form.setValue("imageURL", res.url)
      toast.success("Imagem alterada com sucesso!")
    } else {
      setFile(file)

      if (file) {
        if (url === undefined) {
          const res = await edgestore.publicFiles.upload({
            file,
          })

          toast.success("Imagem adicionada com sucesso!")
          setUrl(res.url)
          form.setValue("imageURL", res.url)
        } else {
          const res = await edgestore.publicFiles.upload({
            file,
            options: {
              replaceTargetUrl: form.getValues("imageURL"),
            },
          })

          toast.success("Imagem alterada com sucesso!")
          setUrl(res.url)
          form.setValue("imageURL", res.url)
        }
      }
    }
  }

  const handleSubmitProject = async (data: UpsertProjectSchema) => {
    try {
      await upsertProject({
        ...data,
        id: defaultValues?.id,
        technologies: selectedTechnologies,
      })

      setUrl(undefined)
      setFile(undefined)
      onSuccess?.()
      toast.success(
        `Projeto ${isEditing ? "atualizado" : "criado"} com sucesso!`,
      )
    } catch (error) {
      toast.error(
        `Ocorreu um erro ao ${isEditing ? "atualizar" : "criar"} o projeto!`,
      )
    }
  }

  return (
    <DialogContent className="w-full max-w-screen-lg">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar" : "Criar Novo"} Projeto
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmitProject)}
          className="space-y-2"
        >
          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="imageURL"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel>Imagem do Projeto</FormLabel>
                  <FormControl className="relative my-4 h-64 w-96">
                    <SingleImageDropzone
                      width={300}
                      height={300}
                      value={file || field.value}
                      onChange={(file) => handleFileChange(file as File)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full px-2">
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex-1">
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
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent align="end">
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
                        className="min-h-56 resize-none"
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
              render={() => (
                <FormItem className="basis-1/2">
                  <div className="mb-4">
                    <FormLabel className="text-base">Tecnologias</FormLabel>
                    <FormDescription>
                      selecione as tecnologias para o projeto.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {technologies.map((tech) => (
                      <FormField
                        key={tech.id}
                        control={form.control}
                        name="technologies"
                        render={({ field }) => {
                          return (
                            <FormItem key={tech.id}>
                              <div className="flex items-center gap-3">
                                <FormControl>
                                  <Checkbox
                                    className="data-[state=checked]:text-black"
                                    checked={
                                      field.value?.includes(tech.id) || false
                                    }
                                    onCheckedChange={(checked) => {
                                      setSelectedTechnologies((prev) => {
                                        // Atualiza a lista de tecnologias selecionadas
                                        const updatedTechnologies = checked
                                          ? [...prev, tech.id] // Adiciona a tecnologia se marcada
                                          : prev.filter((id) => id !== tech.id) // Remove a tecnologia se desmarcada

                                        // Atualiza o valor no formulário via react-hook-form
                                        form.setValue(
                                          "technologies",
                                          updatedTechnologies,
                                        )
                                        // Notifica o formulário sobre a mudança para validação do Zod
                                        field.onChange(updatedTechnologies)

                                        return updatedTechnologies // Retorna o novo estado
                                      })
                                    }}
                                    id={tech.id.toString()}
                                    {...field}
                                  />
                                </FormControl>
                                <FormLabel
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
                                </FormLabel>
                              </div>
                            </FormItem>
                          )
                        }}
                      />
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
      </Form>
    </DialogContent>
  )
}

export default UpsertProductDialogContent
