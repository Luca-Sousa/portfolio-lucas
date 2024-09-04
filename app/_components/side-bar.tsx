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
import { useEffect, useState } from "react"
import SkeletonSidebar from "./skeleton-sidebar"
import { MdOutlineDashboardCustomize } from "react-icons/md"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import SignIn from "./sign-in"

const SideBar = () => {
  const [detailsSideBar, setDetailsSideBar] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setDetailsSideBar(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleCopyItemsClick = (item: string) => {
    navigator.clipboard.writeText(item)
    if (item === "lucas.sousa.dev@gmail.com")
      toast.success("Email copiado com sucesso!")

    if (item === "88994545892") toast.success("Telefone copiado com sucesso!")
  }

  return (
    <Card className="rounded-2xl xl:h-fit xl:w-full xl:max-w-96">
      <CardContent className="relative px-6 py-4">
        {detailsSideBar ? (
          <Button
            variant="outline"
            className="group absolute right-0 top-0 rounded-bl-3xl rounded-tr-2xl border xl:hidden"
            onClick={() => setDetailsSideBar(false)}
          >
            <ChevronUp
              className="text-primary group-hover:scale-125 sm:hidden"
              size={16}
            />
            <p className="hidden text-xs text-primary sm:block">
              Esconder Contatos
            </p>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="group absolute right-0 top-0 rounded-bl-3xl rounded-tr-2xl border xl:hidden"
            onClick={() => setDetailsSideBar(true)}
          >
            <ChevronDown
              className="text-primary group-hover:scale-125 sm:hidden"
              size={16}
            />
            <p className="hidden text-xs text-primary sm:block">
              Mostrar Contatos
            </p>
          </Button>
        )}

        <div className="flex items-center gap-4 sm:py-4 xl:flex-col">
          <div className="relative size-24 overflow-hidden rounded-full bg-zinc-800 ring-2 ring-primary xl:h-72 xl:w-48">
            <Image
              alt="perfil"
              src="/perfil.png"
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="flex flex-col gap-3 xl:items-center xl:gap-5">
            <h2 className="text-xl font-bold xl:text-2xl">Lucas Sousa</h2>

            <div className="rounded-xl bg-zinc-800">
              <p className="px-2 py-0.5 text-sm text-zinc-300 xl:px-3 xl:py-1.5">
                Desenvolvedor FrontEnd
              </p>
            </div>

            <Button
              className="hidden gap-1.5 font-semibold text-secondary xl:flex"
              asChild
            >
              <Link href={"/login"}>
                <MdOutlineDashboardCustomize size={18} />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {detailsSideBar ? (
          <div className="mt-4 space-y-4 sm:mt-6 sm:space-y-6">
            <div className="h-px w-full bg-zinc-800"></div>

            <div className="flex flex-col gap-4 sm:flex-row lg:items-center lg:gap-8 xl:flex-col xl:gap-4">
              <div className="flex gap-4 sm:basis-1/2 sm:flex-col lg:flex-1 lg:basis-0 lg:flex-row">
                <div className="flex flex-1 items-center gap-4">
                  <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
                    <MailIcon className="text-primary" size={20} />
                  </div>

                  <div className="space-y-1 text-sm">
                    <h3 className="uppercase text-zinc-400">email</h3>

                    <Link
                      className="hover:text-primary"
                      href="mailto:lucas.sousa.dev@gmail.com"
                    >
                      lucas.sousa.dev@gmail.com
                    </Link>
                  </div>
                </div>

                <Button
                  className="hidden min-[450px]:block sm:ml-[52px] sm:block sm:w-1/2 lg:ml-0 lg:w-auto"
                  variant={"outline"}
                  onClick={() =>
                    handleCopyItemsClick("lucas.sousa.dev@gmail.com")
                  }
                >
                  Copiar
                </Button>
              </div>

              <div className="flex gap-4 sm:basis-1/2 sm:flex-col lg:flex-1 lg:basis-0 lg:flex-row xl:w-full">
                <div className="flex flex-1 items-center gap-4">
                  <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
                    <SmartphoneIcon className="text-primary" size={20} />
                  </div>

                  <div className="space-y-1 text-sm">
                    <h3 className="uppercase text-zinc-400">Telefone</h3>

                    <Link className="hover:text-primary" href="tel:88994545892">
                      (88) 99454-5892
                    </Link>
                  </div>
                </div>

                <Button
                  className="hidden min-[450px]:block sm:ml-[52px] sm:block sm:w-1/2 lg:ml-0 lg:w-auto"
                  variant={"outline"}
                  onClick={() => handleCopyItemsClick("88994545892")}
                >
                  Copiar
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:gap-8 xl:flex-col xl:gap-4">
              <div className="flex items-center gap-4 sm:basis-1/2 lg:flex-1 lg:basis-0">
                <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
                  <CalendarDaysIcon className="text-primary" size={20} />
                </div>

                <div className="flex-1 space-y-1 text-sm">
                  <h3 className="uppercase text-zinc-400">
                    Data de Nascimento
                  </h3>
                  <p>27/09/1999</p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:basis-1/2 lg:flex-1 lg:basis-0">
                <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
                  <IoLocationOutline className="text-primary" size={20} />
                </div>

                <div className="flex-1 space-y-1 text-sm">
                  <h3 className="uppercase text-zinc-400">Endereço</h3>
                  <p>Ubajara, Ceará</p>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-zinc-800"></div>

            <div className="space-x-3 xl:flex xl:justify-center">
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
        ) : (
          <SkeletonSidebar />
        )}
      </CardContent>
    </Card>
  )
}

export default SideBar
