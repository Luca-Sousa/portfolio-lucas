"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../_components/ui/dialog";
import { Button } from "../../../../_components/ui/button";
import { CirclePlusIcon, Loader2Icon, SaveIcon } from "lucide-react";
import { Input } from "../../../../_components/ui/input";
import { createTechnology } from "../../../../_actions/technology/create-technology";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../_components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEdgeStore } from "@/app/_lib/edgestore";
import { useState } from "react";
import { SingleImageDropzone } from "../../../_components/single-image-dropzone";
import {
  CreateTechnologySchema,
  createTechnologySchema,
} from "@/app/_actions/technology/create-technology/schema";

const ModalCreateNewTechnology = () => {
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<string>();
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(createTechnologySchema),
    defaultValues: {
      name: "",
      iconURL: "",
    },
  });

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
      form.setValue("iconURL", res.url);
    }
  };

  const handleCreateTechnology = async (data: CreateTechnologySchema) => {
    await createTechnology({
      name: data.name,
      iconURL: data.iconURL,
    });

    if (url) {
      await edgestore.publicFiles.confirmUpload({ url });
    }

    setFile(undefined);
    setDialogIsOpen(false);
    toast.success("Tecnologia criada com sucesso!");
  };

  return (
    <Dialog
      open={dialogIsOpen}
      onOpenChange={(isOpen) => {
        setDialogIsOpen(isOpen);
        if (!isOpen) {
          setFile(undefined);
          if (url) {
            (async () => {
              try {
                await edgestore.publicFiles.delete({ url });
                setUrl(undefined);
              } catch (error) {
                console.error("Erro ao deletar o arquivo: ", error);
              }
            })();
          }
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="flex h-8 items-center gap-2 font-medium text-secondary">
          <CirclePlusIcon size={16} />
          Nova Tecnologia
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle className="text-center">
            Criar nova Tecnologia
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTechnology)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da tecnologia..." {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="iconURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ícone da Tecnologia</FormLabel>
                  <FormControl className="mx-auto bg-accent">
                    <SingleImageDropzone
                      width={80}
                      height={80}
                      value={file}
                      onChange={(file) => handleFileChange(file as File)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="reset"
                  variant="secondary"
                  className="flex-1 gap-1.5"
                  disabled={form.formState.isSubmitting}
                >
                  Cancelar
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="flex items-center gap-2 text-secondary"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2Icon className="animate-spin" size={16} />
                ) : (
                  <SaveIcon size={16} />
                )}
                Salvar Tecnologia
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateNewTechnology;
