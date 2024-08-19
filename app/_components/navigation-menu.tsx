import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu"

interface NavigationMenuItemsProps {
  active: string
  handleClick: (page: string) => void
}

const NavigationMenuItems = ({
  active,
  handleClick,
}: NavigationMenuItemsProps) => {
  const MenuItems = [
    { label: "about" },
    { label: "resume" },
    { label: "project" },
    { label: "contact" },
  ]

  return (
    <NavigationMenu className="fixed bottom-0 left-0 z-50 flex w-full max-w-full items-center justify-center rounded-t-3xl border-t-4 border-gray-600 bg-secondary py-4 sm:absolute sm:inset-0 sm:left-full sm:h-16 sm:max-w-xs sm:-translate-x-full sm:rounded-bl-2xl sm:rounded-tl-none sm:rounded-tr-2xl sm:border-0 md:max-w-sm lg:max-w-md">
      <NavigationMenuList className="flex gap-4">
        {MenuItems.map((item) => (
          <NavigationMenuItem
            key={item.label}
            onClick={() => handleClick(item.label.toLowerCase())}
            className={`${
              active === item.label.toLowerCase()
                ? "text-primary"
                : "text-secondary-foreground"
            } text-primary`}
          >
            <NavigationMenuLink className="cursor-pointer capitalize">
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavigationMenuItems
