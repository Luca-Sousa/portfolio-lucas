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
import { TableCell, TableRow } from "./ui/table"
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
import { useState } from "react"
import Image from "next/image"
import { Textarea } from "./ui/textarea"

const ModalCreateNewProjetc = () => {
  const form = useForm()
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const handleTextareaResize = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const textarea = event.target
    textarea.style.height = "auto" // Redefine a altura para auto para calcular o scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px` // Define a altura com base no scrollHeight
  }

  return (
    <TableRow>
      <TableCell colSpan={6} />
      <TableCell colSpan={2} className="w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size={"lg"}
              className="flex items-center gap-2 text-secondary"
            >
              <FilePlus2 size={14} />
              Novo Projeto
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Projeto</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="size-fit">
                    <FormLabel>Imagem do Projeto</FormLabel>
                    <FormControl>
                      {!imagePreview ? (
                        <Input
                          className="h-52 w-80"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleImageChange(e) // para pré-visualizar a imagem
                            field.onChange(e.target.files?.[0]) // para capturar o arquivo no form
                          }}
                        />
                      ) : (
                        <div
                          className="relative my-4 h-52 w-80 cursor-pointer"
                          onClick={() => {
                            // Ao clicar na imagem, resetar a pré-visualização e permitir nova seleção
                            setImagePreview(null)
                            field.onChange(null) // Reseta o valor do form
                          }}
                        >
                          <Image
                            src={imagePreview}
                            alt="Pré-visualização da imagem"
                            fill
                            className="object-cover"
                          />
                        </div>
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
            </Form>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  )
}

export default ModalCreateNewProjetc
