"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../../_components/ui/form"
import { Input } from "../../_components/ui/input"
import { Textarea } from "../../_components/ui/textarea"
import { Button } from "../../_components/ui/button"
import { Send } from "lucide-react"
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../_components/ui/sheet"
import Link from "next/link"
import { toast } from "sonner"
import emailjs from "emailjs-com"
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const contactSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  message: z.string().min(1, "Mensagem é obrigatório"),
})

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false) // Estado para controlar o carregamento
  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const handleTextareaResize = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const textarea = event.target
    textarea.style.height = "auto" // Redefine a altura para auto para calcular o scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px` // Define a altura com base no scrollHeight
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true) // Ativa o estado de carregamento
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!,
      )

      if (response.status === 200) {
        toast.success("Mensagem enviada com sucesso!")
        form.setValue("name", "")
        form.setValue("email", "")
        form.setValue("message", "")
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar a mensagem.")
    } finally {
      setIsLoading(false) // Desativa o estado de carregamento
    }
  }

  return (
    <SheetContent>
      <SheetHeader className="space-y-3 text-left">
        <div className="space-y-3">
          <SheetTitle className="text-3xl">Contato</SheetTitle>
          <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
        </div>
        <SheetDescription>
          Entre em contato ou envie-me um e-mail diretamente para{" "}
          <Link
            className="text-primary hover:underline"
            href={"mailto:luke.sousa.dev@gmail.com"}
          >
            luke.sousa.dev@gmail.com
          </Link>
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="lg:basis-1/2">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    type="text"
                    placeholder="Seu nome"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    type="email"
                    placeholder="Seu email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensagem</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value}
                    placeholder="Escreva sua mensagem aqui..."
                    className="min-h-32 resize-none [&::-webkit-scrollbar]:hidden"
                    onInput={handleTextareaResize} // Chama a função para redimensionar ao digitar
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SheetFooter className="flex-row gap-3">
            <SheetClose asChild className="basis-2/5">
              <Button
                variant="destructive"
                type="reset"
                disabled={form.formState.isSubmitting}
              >
                Cancelar
              </Button>
            </SheetClose>

            <Button
              type="submit"
              className="flex w-full basis-3/5 items-center gap-2 text-secondary"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <AiOutlineLoading3Quarters
                  size={18}
                  className={`animate-spin ${isLoading ? "animate-spin" : ""}`}
                />
              ) : (
                <Send size={18} />
              )}
              {form.formState.isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  )
}

export default Contact
