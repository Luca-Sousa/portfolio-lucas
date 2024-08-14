"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { RiInstagramFill } from "react-icons/ri"
import { IoLocationOutline } from "react-icons/io5"
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"
import {
  CalendarDaysIcon,
  ChevronDown,
  ChevronUp,
  MailIcon,
  SmartphoneIcon,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useState } from "react"

const SideBar = () => {
  const [detailsSideBar, setDetailsSideBar] = useState<boolean>(false)

  const handleCopyItemsClick = (item: string) => {
    navigator.clipboard.writeText(item)
    if (item === "lucas.sousa.dev@gmail.com")
      toast.success("Email copiado com sucesso!")

    if (item === "88994545892") toast.success("Telefone copiado com sucesso!")
  }

  return (
    <Card className="m-4 rounded-3xl">
      <CardContent className="relative space-y-4 px-6 py-3">
        {detailsSideBar ? (
          <Button
            variant="outline"
            className="group absolute right-0 top-0 rounded-bl-3xl rounded-tr-3xl border"
            onClick={() => setDetailsSideBar(false)}
          >
            <ChevronUp
              className="text-primary group-hover:scale-125"
              size={16}
            />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="group absolute right-0 top-0 rounded-bl-3xl rounded-tr-3xl border"
            onClick={() => setDetailsSideBar(true)}
          >
            <ChevronDown
              className="text-primary group-hover:scale-125"
              size={16}
            />
          </Button>
        )}

        <div className="flex items-center gap-4">
          <div className="relative size-24 overflow-hidden rounded-full bg-zinc-800 ring-2 ring-primary">
            <Image
              alt="perfil"
              src="/perfil.png"
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Lucas Sousa</h2>

            <div className="rounded-xl bg-zinc-800">
              <p className="px-2 py-0.5 text-sm text-zinc-300">
                Desenvolvedor Front-End
              </p>
            </div>
          </div>
        </div>

        {detailsSideBar && (
          <div className="space-y-4">
            <div className="h-px w-full bg-zinc-800"></div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
                <MailIcon className="text-primary" size={20} />
              </div>

              <div className="flex-1 space-y-1 text-sm">
                <h3 className="uppercase text-zinc-400">email</h3>

                <Link href="mailto:lucas.sousa.dev@gmail.com">
                  lucas.sousa.dev@gmail.com
                </Link>
              </div>

              <Button
                variant={"outline"}
                onClick={() =>
                  handleCopyItemsClick("lucas.sousa.dev@gmail.com")
                }
              >
                Copiar
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
                <SmartphoneIcon className="text-primary" size={20} />
              </div>

              <div className="flex-1 space-y-1 text-sm">
                <h3 className="uppercase text-zinc-400">Telefone</h3>

                <Link href="tel:88994545892">(88) 99454-5892</Link>
              </div>

              <Button
                variant={"outline"}
                onClick={() => handleCopyItemsClick("88994545892")}
              >
                Copiar
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
                <CalendarDaysIcon className="text-primary" size={20} />
              </div>

              <div className="flex-1 space-y-1 text-sm">
                <h3 className="uppercase text-zinc-400">Data de Nascimento</h3>
                <p>27/09/1999</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
                <IoLocationOutline className="text-primary" size={20} />
              </div>

              <div className="flex-1 space-y-1 text-sm">
                <h3 className="uppercase text-zinc-400">Endereço</h3>
                <p>Ubajara, Ceará</p>
              </div>
            </div>

            <div className="h-px w-full bg-zinc-800"></div>

            <div className="space-x-3">
              <Button
                size={"icon"}
                variant={"link"}
                className="size-8 rounded-full ring-primary hover:scale-110 hover:ring-2"
                asChild
              >
                <Link href="https://github.com/Luca-Sousa" target="_blank">
                  <FaGithub className="size-6 fill-zinc-300" />
                </Link>
              </Button>

              <Button
                size={"icon"}
                variant={"link"}
                className="size-8 rounded-full ring-primary hover:scale-110 hover:ring-2"
                asChild
              >
                <Link href="#" target="_blank">
                  <FaLinkedin className="size-6 fill-zinc-300" />
                </Link>
              </Button>

              <Button
                size={"icon"}
                variant={"link"}
                className="size-8 rounded-full ring-primary hover:scale-110 hover:ring-2"
                asChild
              >
                <Link
                  href="https://www.facebook.com/LukeSousa21/"
                  target="_blank"
                >
                  <FaFacebook className="size-6 fill-zinc-300" />
                </Link>
              </Button>

              <Button
                size={"icon"}
                variant={"link"}
                className="size-8 rounded-full ring-primary hover:scale-110 hover:ring-2"
                asChild
              >
                <Link href="https://www.instagram.com/lk._dev/" target="_blank">
                  <RiInstagramFill className="size-6 fill-zinc-300" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SideBar
