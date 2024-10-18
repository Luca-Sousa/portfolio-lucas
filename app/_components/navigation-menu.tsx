import { Contact2Icon } from "lucide-react"
import Contact from "../(home)/_components/contact"
import { Button } from "./ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { useState } from "react"

interface NavigationMenuItemsProps {
  active: string
  handleClick: (page: string) => void
}

const NavigationMenuItems = ({
  active,
  handleClick,
}: NavigationMenuItemsProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false)

  const MenuItems = [
    { label: "sobre" },
    { label: "resumo" },
    { label: "projetos" },
  ]

  return (
    <NavigationMenu className="fixed bottom-0 left-0 z-50 flex w-full max-w-full items-center justify-center rounded-t-3xl border-t-4 border-gray-600 bg-secondary py-4 sm:absolute sm:inset-0 sm:left-full sm:h-16 sm:max-w-sm sm:-translate-x-full sm:rounded-bl-2xl sm:rounded-tl-none sm:rounded-tr-2xl sm:border-0 md:max-w-md lg:max-w-lg">
      <NavigationMenuList className="flex gap-4 md:gap-6 lg:gap-8">
        {MenuItems.map((item) => (
          <NavigationMenuItem
            key={item.label}
            onClick={() => handleClick(item.label.toLowerCase())}
            className={`${
              active === item.label.toLowerCase()
                ? "items-center border-primary text-primary sm:relative sm:top-0.5 sm:flex sm:h-16 sm:border-b-4"
                : "text-secondary-foreground"
            } text-primary`}
          >
            <NavigationMenuLink className="cursor-pointer capitalize">
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant={"default"}
              className="flex items-center gap-1 px-3 font-semibold text-secondary"
            >
              <Contact2Icon size={20} />
              Contato
            </Button>
          </SheetTrigger>
          <Contact onSuccess={() => setSheetIsOpen(false)} />
        </Sheet>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavigationMenuItems
