"use client";

import { SingleImageDropzone } from "@/app/(dashboard)/_components/single-image-dropzone";
import { upsertProject } from "@/app/_actions/project/upsert-project";
import {
  upsertProjectSchema,
  UpsertProjectSchema,
} from "@/app/_actions/project/upsert-project/schema";
import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Textarea } from "@/app/_components/ui/textarea";
import { getTechnologies } from "@/app/_data_access/get-technologies";
import { useEdgeStore } from "@/app/_lib/edgestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectStatus, Technology } from "@prisma/client";
import { PanelLeftCloseIcon, Loader2Icon, FilePlus2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MultiFileDropzoneUsage } from "./MultiFileDropzoneUsage";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

interface UpsertProductDialogContentProps {
  defaultValues?: UpsertProjectSchema;
  onSuccess?: () => void;
}

const UpsertProductDialogContent = ({
  defaultValues,
  onSuccess,
}: UpsertProductDialogContentProps) => {
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<string>();
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [status, setStatus] = useState<ProjectStatus[]>([]);

  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(upsertProjectSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      startDate: new Date(),
      features: [],
      imagesUrl: [],
      thumbnailUrl: "",
      repositoryUrl: "",
      deployUrl: "",
      status: "" as ProjectStatus,
      technologies: [],
    },
  });

  const isEditing = !!defaultValues;

  useEffect(() => {
    const fetchTechnologies = async () => {
      const techs = await getTechnologies();
      setTechnologies(techs);
    };

    fetchTechnologies();
  }, []);

  useEffect(() => {
    setStatus(Object.values(ProjectStatus));
  }, []);

  // const handleFilesChange = async (file: File) => {
  //   if (isEditing) {
  //     console.log("Substituindo imagem:", defaultValues.imagesUrl);
  //     const res = await edgestore.publicFiles.upload({
  //       file,
  //       options: {
  //         replaceTargetUrl: form.getValues("imagesUrl"),
  //       },
  //     });

  //     setFile(file);
  //     form.setValue("imagesUrl", res.url);
  //     toast.success("Imagem alterada com sucesso!");
  //   } else {
  //     setFile(file);

  //     if (file) {
  //       if (url === undefined) {
  //         const res = await edgestore.publicFiles.upload({
  //           file,
  //         });

  //         toast.success("Imagem adicionada com sucesso!");
  //         setUrl(res.url);
  //         form.setValue("imagesUrl", res.url);
  //       } else {
  //         const res = await edgestore.publicFiles.upload({
  //           file,
  //           options: {
  //             replaceTargetUrl: form.getValues("imagesUrl"),
  //           },
  //         });

  //         toast.success("Imagem alterada com sucesso!");
  //         setUrl(res.url);
  //         form.setValue("imagesUrl", res.url);
  //       }
  //     }
  //   }
  // };

  const handleFileChange = async (file: File) => {
    setFile(file);

    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          temporary: true,
        },
      });

      setUrl(res.url);
      form.setValue("thumbnailUrl", res.url);
    }
  };

  const handleSubmitProject = async (data: UpsertProjectSchema) => {
    try {
      await upsertProject({
        ...data,
        id: defaultValues?.id,
      });

      // setUrl(undefined);
      // setFile(undefined);
      onSuccess?.();
      toast.success(
        `Projeto ${isEditing ? "atualizado" : "criado"} com sucesso!`,
      );
    } catch (error) {
      toast.error(
        `Ocorreu um erro ao ${isEditing ? "atualizar" : "criar"} o projeto!`,
      );
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <DialogContent className="flex h-full max-h-[90%] w-full max-w-screen-lg flex-col overflow-hidden pl-2">
        <ScrollArea className="-right-6 h-full pr-6">
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
              <div className="flex gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="thumbnailUrl"
                    render={({ field }) => (
                      <FormItem className="h-fit w-full max-w-md">
                        <FormLabel>Imagem do Projeto</FormLabel>
                        <FormControl className="relative mx-auto my-2">
                          <SingleImageDropzone
                            width={350}
                            height={350}
                            value={url || field.value}
                            onChange={(file) => handleFileChange(file as File)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imagesUrl"
                    render={({ field }) => (
                      <FormItem className="h-fit w-full max-w-md">
                        <FormLabel>Imagem do Projeto</FormLabel>
                        <FormControl className="relative mx-auto my-2">
                          <MultiFileDropzoneUsage />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-2 flex flex-1 flex-col justify-between">
                  <div className="flex gap-3">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="h-fit flex-1">
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
                                  <SelectItem
                                    key={statusItem}
                                    value={statusItem}
                                  >
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
                            className="min-h-40 resize-none"
                            // onInput={handleTextareaResize}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="technologies"
                  render={() => (
                    <FormItem className="w-full max-w-md">
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
                                        checked={field.value?.includes(tech.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                tech.id,
                                              ])
                                            : field.onChange(
                                                field.value.filter(
                                                  (value) => value !== tech.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="flex items-center gap-2">
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
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex-1 space-y-2">
                  <FormField
                    control={form.control}
                    name="deployUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vercel</FormLabel>
                        <FormControl>
                          <Input placeholder="Link do Deploy" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="repositoryUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Github</FormLabel>
                        <FormControl>
                          <Input placeholder="Link do Repositório" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="flex items-end justify-end gap-3 pt-4">
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
        </ScrollArea>
      </DialogContent>
    </div>
  );
};

export default UpsertProductDialogContent;
