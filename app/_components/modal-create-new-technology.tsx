"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { CirclePlusIcon, ImageUp, SaveIcon } from "lucide-react"
import { Input } from "./ui/input"
import { createTechnology } from "../_actions/create-technology"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Image from "next/image"
import { UploadButton } from "../utils/uploadthing"
import { useState } from "react"

const ModalCreateNewTechnology = () => {
  const form = useForm()
  const [iconURL, setIconURL] = useState<string>("")

  const handleCreateTechnology = async (data: any) => {
    await createTechnology({
      name: data.name,
      iconURL: data.iconURL,
    })

    form.reset()
    setIconURL("")
    toast.success("Tecnologia criada com sucesso!")
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
                    <FormControl>
                      {iconURL ? (
                        <div className="w-10">
                          <Image
                            src={iconURL}
                            alt="Pré-visualização"
                            width={30}
                            height={30}
                          />
                        </div>
                      ) : (
                        <UploadButton
                          content={{
                            button({ ready }) {
                              if (ready) return <ImageUp size={28} />
                            },
                          }}
                          appearance={{
                            button: "w-full bg-accent hover:bg-muted",
                            container: "w-10",
                            allowedContent: "hidden",
                          }}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            const uploadedURL = res[0].url
                            setIconURL(uploadedURL)
                            form.setValue("iconURL", uploadedURL)
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
