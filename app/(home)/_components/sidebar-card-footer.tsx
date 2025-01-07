import { Button } from "@/app/_components/ui/button"
import { CardFooter } from "@/app/_components/ui/card"
import { itemsNetworks } from "@/app/_contants"
import Link from "next/link"

const SidebarCardFooter = () => {
  return (
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
  )
}

export default SidebarCardFooter
