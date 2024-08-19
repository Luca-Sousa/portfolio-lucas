import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"

interface CarrouselNavigationButtonProps {
  direction: "left" | "right"
  onClick: () => void
  show: boolean
}

const CarrouselNavigationButton = ({
  direction,
  onClick,
  show,
}: CarrouselNavigationButtonProps) => {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight

  return (
    show && (
      <Button
        onClick={onClick}
        size={"icon"}
        variant="secondary"
        className={`absolute top-1/2 -translate-y-1/2 transform rounded-full p-2 text-white shadow-lg ring-2 ring-primary ${
          direction === "left" ? "-left-5" : "-right-5"
        }`}
      >
        <Icon size={24} />
      </Button>
    )
  )
}

export default CarrouselNavigationButton
