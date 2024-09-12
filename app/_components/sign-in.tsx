import { signIn } from "next-auth/react"
import { Button } from "@/app/_components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

const SignIn = () => {
  const handleLoginWithGoogleClick = () => signIn("google")

  return (
    <DialogContent className="w-fit">
      <DialogHeader className="w-96 space-y-3">
        <DialogTitle className="text-center">Login Administrador</DialogTitle>

        <DialogDescription>
          Dashboard Admistrativa do Portfólio!
        </DialogDescription>
      </DialogHeader>

      <Button
        variant="outline"
        className="gap-1 font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        Google
      </Button>
    </DialogContent>
  )
}

export default SignIn
