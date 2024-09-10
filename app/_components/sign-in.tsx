"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import { toast } from "sonner"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Label } from "./ui/label"

type FormData = {
  email: string
  password: string
}

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>()
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (res?.ok) {
      router.push("/dashboard")
      toast.success("Bem Vindo Luke!")
    } else {
      toast.error("Credenciais Inválidas")
    }
  }

  return (
    <DialogContent className="w-fit">
      <DialogHeader className="w-96 space-y-3">
        <DialogTitle className="text-center">Login Administrador</DialogTitle>

        <DialogDescription>
          Dashboard Admistrativa do Portfólio!
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-5"
      >
        <div className="space-y-3">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-secondary-foreground"
          >
            Email
          </Label>

          <Input
            id="email"
            type="email"
            placeholder="Email..."
            {...register("email", { required: "Email Obrigatório" })}
          />

          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-secondary-foreground"
          >
            Senha
          </Label>

          <Input
            id="password"
            type="password"
            placeholder="Senha..."
            {...register("password", { required: "Senha Obrigatória" })}
          />

          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          Login
        </Button>
      </form>
    </DialogContent>
  )
}

export default SignIn
