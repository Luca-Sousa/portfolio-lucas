"use client"

import { useForm } from "react-hook-form"
import { CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useEffect, useRef } from "react"
import { Send } from "lucide-react"
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"

const Contact = () => {
  const form = useForm()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current

      const resizeTextarea = () => {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
      }

      textarea.addEventListener("input", resizeTextarea)

      return () => {
        textarea.removeEventListener("input", resizeTextarea)
      }
    }
  }, [])

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you are done.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <CardHeader className="space-y-3">
          <div className="space-y-3">
            <CardTitle className="sm:text-3xl">Contato</CardTitle>
            <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            <FormField
              control={form.control}
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
              control={form.control}
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
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensagem</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    ref={(el) => {
                      field.ref(el) // Passa a referência do react-hook-form
                      textareaRef.current = el // Passa a referência local
                    }}
                    placeholder="Escreva sua mensagem aqui..."
                    className="resize-none [&::-webkit-scrollbar]:hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant={"secondary"}
            type="submit"
            className="ml-auto flex w-full items-center gap-2 py-6 text-primary-foreground ring-primary hover:ring-1 sm:max-w-52"
          >
            <Send size={18} />
            Enviar Mensagem
          </Button>
        </CardContent>
      </Form>

      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}

export default Contact
