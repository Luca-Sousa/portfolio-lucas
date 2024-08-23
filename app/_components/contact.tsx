"use client"

import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import Link from "next/link"
import { toast } from "sonner"
import emailjs from "emailjs-com"
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const contactSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  message: z.string().min(1, { message: "Mensagem não pode estar vazia" }),
})

const Contact = () => {
  const methods = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onBlur", // Ativa a validação ao perder o foco
  })
  const [isLoading, setIsLoading] = useState(false) // Estado para controlar o carregamento

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
        methods.setValue("name", "")
        methods.setValue("email", "")
        methods.setValue("message", "")
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
    <FormProvider {...methods}>
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

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mt-6 space-y-6">
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem className="lg:basis-1/2">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Escreva sua mensagem aqui..."
                      className="min-h-32 resize-none [&::-webkit-scrollbar]:hidden"
                      onInput={handleTextareaResize} // Chama a função para redimensionar ao digitar
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className={`flex w-full items-center gap-2 py-6 text-secondary ${
                isLoading ? "animate-pulse cursor-wait" : ""
              }`}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters
                  size={18}
                  className={`animate-spin ${isLoading ? "animate-spin" : ""}`}
                />
              ) : (
                <Send size={18} />
              )}
              {isLoading ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </FormProvider>
  )
}

export default Contact
