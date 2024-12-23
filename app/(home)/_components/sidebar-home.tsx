"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "../../_components/ui/card"
import { Button } from "../../_components/ui/button"
import { RiInstagramFill } from "react-icons/ri"
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import SkeletonSidebar from "./sidebar-home-skeleton"
import { MdOutlineDashboardCustomize } from "react-icons/md"
import { Dialog, DialogTrigger } from "../../_components/ui/dialog"
import SignIn from "../../_components/sign-in"
import SidebarHomeInfo from "./sidebar-home-info"

const SidebarHome = () => {
  const [detailsSidebar, setDetailsSidebar] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setDetailsSidebar(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const itemsNetworks = [
    {
      title: "Github",
      link: "https://github.com/Luca-Sousa",
      icon: FaGithub,
    },
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/lucas-silva-0b79a72a7/",
      icon: FaLinkedin,
    },
    {
      title: "Facebook",
      link: "https://www.facebook.com/LukeSousa21/",
      icon: FaFacebook,
    },
    {
      title: "Instagram",
      link: "https://www.instagram.com/lk._dev/",
      icon: RiInstagramFill,
    },
  ]

  return (
    <Card className="rounded-2xl xl:h-full xl:w-full xl:min-w-96 xl:max-w-96">
      <CardContent className="relative px-6 py-4">
        <Button
          variant="outline"
          className="group absolute right-0 top-0 rounded-bl-3xl rounded-tr-2xl border sm:w-36 xl:hidden"
          onClick={
            detailsSidebar
              ? () => setDetailsSidebar(false)
              : () => setDetailsSidebar(true)
          }
        >
          {detailsSidebar ? (
            <ChevronUp
              className="text-primary group-hover:scale-125 sm:hidden"
              size={16}
            />
          ) : (
            <ChevronDown
              className="text-primary group-hover:scale-125 sm:hidden"
              size={16}
            />
          )}

          <p className="hidden text-xs text-primary sm:block">
            {detailsSidebar ? "Esconder Contatos" : "Mostrar Contatos"}
          </p>
        </Button>

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
                Desenvolvedor Web
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="hidden gap-1.5 font-semibold text-secondary xl:flex">
                  <MdOutlineDashboardCustomize size={18} />
                  Dashboard
                </Button>
              </DialogTrigger>

              <SignIn />
            </Dialog>
          </div>
        </div>

        {detailsSidebar ? <SidebarHomeInfo /> : <SkeletonSidebar />}
      </CardContent>

      {detailsSidebar && (
        <CardFooter className="space-x-3 xl:flex xl:justify-center">
          {itemsNetworks.map(({ title, link, icon: Icon }) => (
            <Button
              key={title}
              size={"icon"}
              variant={"link"}
              className="size-8 rounded-full ring-primary hover:scale-110 hover:ring-2"
              asChild
            >
              <Link href={link} target="_blank">
                <Icon className="size-6 fill-zinc-300" />
              </Link>
            </Button>
          ))}
        </CardFooter>
      )}
    </Card>
  )
}

export default SidebarHome
