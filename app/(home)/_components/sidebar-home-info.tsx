import { Button } from "@/app/_components/ui/button"
import { MailIcon, SmartphoneIcon, CalendarDaysIcon } from "lucide-react"
import Link from "next/link"
import { IoLocationOutline } from "react-icons/io5"
import { toast } from "sonner"

const SidebarHomeInfo = () => {
  const handleCopyItemsClick = (item: string) => {
    navigator.clipboard.writeText(item)
    if (item === "lucas.sousa.dev@gmail.com")
      toast.success("Email copiado com sucesso!")

    if (item === "88994545892") toast.success("Telefone copiado com sucesso!")
  }

  return (
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
            onClick={() => handleCopyItemsClick("lucas.sousa.dev@gmail.com")}
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
            <h3 className="uppercase text-zinc-400">Data de Nascimento</h3>
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
    </div>
  )
}

export default SidebarHomeInfo
