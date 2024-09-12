"use client"

import { Form, useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { CirclePlusIcon, SaveIcon } from "lucide-react"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { createTechnology } from "../_actions/create-technology"
import { Technology } from "@prisma/client"

interface ModalCreateNewTechnologyProps {
  onTechnologyCreated: (newTechnology: Technology) => void
}

const ModalCreateNewTechnology = ({
  onTechnologyCreated,
}: ModalCreateNewTechnologyProps) => {
  const form = useForm({ defaultValues: { name: "", iconURL: "" } })
  const { handleSubmit, reset } = form

  const handleCreateTechnology = async () => {
    try {
      const newTechnology = await createTechnology({
        name: form.getValues().name,
        iconURL: form.getValues().iconURL,
      })

      onTechnologyCreated(newTechnology) // Atualize a lista de tecnologias
      reset() // Limpa o formulário
      toast.success("Tecnologia criada com sucesso") // Adiciona uma notificação de sucesso
    } catch (error) {
      toast.error("Erro ao criar a tecnologia") // Adiciona uma notificação de erro
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"default"}
          size={"sm"}
          className="flex items-center gap-2 text-secondary"
        >
          <CirclePlusIcon size={16} />
          Criar uma Nova Tecnologia
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Tecnologia</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(handleCreateTechnology)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Ícone</FormLabel>
                  <FormControl>
                    <Input placeholder="URL do Ícone..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
