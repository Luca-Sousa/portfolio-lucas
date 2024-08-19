import { IoLocationOutline } from "react-icons/io5"
import { Skeleton } from "./ui/skeleton"
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"
import { CalendarDaysIcon, MailIcon, SmartphoneIcon } from "lucide-react"

const SkeletonSidebar = () => {
  return (
    <div className="mt-6 hidden space-y-6 xl:block">
      <Skeleton className="h-px w-full bg-zinc-800" />

      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-1 items-center gap-4">
            <Skeleton className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-800 p-2">
              <MailIcon className="text-primary" size={20} />
            </Skeleton>

            <div className="flex-1 space-y-1 text-sm">
              <Skeleton className="h-4 w-24 bg-zinc-700" />
              <Skeleton className="h-4 w-48 bg-zinc-700" />
            </div>
          </div>

          <Skeleton className="h-8 bg-zinc-700" />
        </div>

        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-1 items-center gap-4">
            <Skeleton className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-800 p-2">
              <SmartphoneIcon className="text-primary" size={20} />
            </Skeleton>

            <div className="flex-1 space-y-1 text-sm">
              <Skeleton className="h-4 w-24 bg-zinc-700" />
              <Skeleton className="h-4 w-32 bg-zinc-700" />
            </div>
          </div>

          <Skeleton className="h-8 bg-zinc-700" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-1 items-center gap-4">
          <Skeleton className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-800 p-2">
            <CalendarDaysIcon className="text-primary" size={20} />
          </Skeleton>

          <div className="flex-1 space-y-1 text-sm">
            <Skeleton className="h-4 w-24 bg-zinc-700" />
            <Skeleton className="h-4 w-32 bg-zinc-700" />
          </div>
        </div>

        <div className="flex flex-1 items-center gap-4">
          <Skeleton className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-800 p-2">
            <IoLocationOutline className="text-primary" size={20} />
          </Skeleton>

          <div className="flex-1 space-y-1 text-sm">
            <Skeleton className="h-4 w-24 bg-zinc-700" />
            <Skeleton className="h-4 w-32 bg-zinc-700" />
          </div>
        </div>
      </div>

      <Skeleton className="h-px w-full bg-zinc-800" />

      <div className="flex justify-center space-x-3">
        <Skeleton className="flex size-8 h-8 w-8 items-center justify-center rounded-full bg-zinc-700 ring-primary">
          <FaGithub className="size-6 fill-zinc-300" />
        </Skeleton>
        <Skeleton className="flex size-8 h-8 w-8 items-center justify-center rounded-full bg-zinc-700 ring-primary">
          <FaLinkedin className="size-6 fill-zinc-300" />
        </Skeleton>
        <Skeleton className="flex size-8 h-8 w-8 items-center justify-center rounded-full bg-zinc-700 ring-primary">
          <FaFacebook className="size-6 fill-zinc-300" />
        </Skeleton>
        <Skeleton className="flex size-8 h-8 w-8 items-center justify-center rounded-full bg-zinc-700 ring-primary">
          <RiInstagramFill className="size-6 fill-zinc-300" />
        </Skeleton>
      </div>
    </div>
  )
}

export default SkeletonSidebar
