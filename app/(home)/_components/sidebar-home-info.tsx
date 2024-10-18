import { Button } from "@/app/_components/ui/button"
import { MailIcon, SmartphoneIcon, CalendarDaysIcon } from "lucide-react"
import Link from "next/link"
import { IoLocationOutline } from "react-icons/io5"
import { toast } from "sonner"

const SidebarHomeInfo = () => {
  const handleCopyItemsClick = (label: string, value: string) => {
    navigator.clipboard.writeText(value)
    toast.success(
      `${label.charAt(0).toUpperCase() + label.slice(1)} copiado com sucesso!`,
    )
  }

  const itemsMailTel = [
    {
      label: "email",
      value: "lucas.sousa.dev@gmail.com",
      icon: MailIcon,
    },
    {
      label: "telefone",
      value: "+55 (88) 99454-5892",
      icon: SmartphoneIcon,
    },
  ]

  const itemsNiverAddress = [
    {
      label: "Data de Nascimento",
      value: "27/09/1999",
      icon: CalendarDaysIcon,
    },
    {
      label: "Endereço",
      value: "Ubajara, Ceará",
      icon: IoLocationOutline,
    },
  ]

  return (
    <div className="mt-4 space-y-4 sm:mt-6 sm:space-y-6">
      <div className="h-px w-full bg-zinc-800"></div>

      <div className="flex flex-col gap-4 sm:flex-row lg:items-center lg:gap-8 xl:flex-col xl:gap-4">
        {itemsMailTel.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex gap-4 sm:basis-1/2 sm:flex-col lg:flex-1 lg:basis-0 lg:flex-row xl:w-full"
          >
            <div className="flex flex-1 items-center gap-4">
              <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
                <Icon className="text-primary" size={20} />
              </div>

              <div className="space-y-1 text-sm">
                <h3 className="uppercase text-zinc-400">{label}</h3>
                <Link
                  className="hover:text-primary"
                  href={`${label === "email" ? "mailto" : "tel"}:${value}`}
                >
                  {value}
                </Link>
              </div>
            </div>

            <Button
              className="hidden min-[450px]:block sm:ml-[52px] sm:block sm:w-1/2 lg:ml-0 lg:w-auto"
              variant="outline"
              onClick={() => handleCopyItemsClick(label, value)}
            >
              Copiar
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row lg:gap-8 xl:flex-col xl:gap-4">
        {itemsNiverAddress.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 sm:basis-1/2 lg:flex-1 lg:basis-0"
          >
            <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
              <Icon className="text-primary" size={20} />
            </div>

            <div className="flex-1 space-y-1 text-sm">
              <h3 className="uppercase text-zinc-400">{label}</h3>
              <p>{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-zinc-800"></div>
    </div>
  )
}

export default SidebarHomeInfo
