"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../_components/ui/dialog"
import { Button } from "../../_components/ui/button"
import { CirclePlusIcon, SaveIcon } from "lucide-react"
import { Input } from "../../_components/ui/input"
import { createTechnology } from "../../_actions/technology/create-technology"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../_components/ui/form"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const ModalCreateNewTechnology = () => {
  const formSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    iconURL: z.string().url("*"),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      iconURL: "",
    },
  })

  const handleCreateTechnology = async (data: any) => {
    await createTechnology({
      name: data.name,
      iconURL: data.iconURL,
    })

    form.reset()
    toast.success("Tecnologia criada com sucesso!")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 font-medium text-secondary">
          <CirclePlusIcon size={16} />
          Criar uma Nova Tecnologia
        </Button>
      </DialogTrigger>

      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Criar Nova Tecnologia</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTechnology)}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-[90%]">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da tecnologia..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="iconURL"
                render={() => (
                  <FormItem className="w-[10%]">
                    <FormLabel>Ícone</FormLabel>
                    <FormControl>{/* Aréa do Dropzone */}</FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                type="submit"
                className="flex items-center gap-2 text-secondary"
              >
                <SaveIcon size={16} />
                Salvar Tecnologia
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalCreateNewTechnology
