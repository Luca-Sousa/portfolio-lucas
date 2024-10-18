import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/app/_components/ui/button"

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
      <div
        className={`absolute top-1/2 -translate-y-1/2 transform ${
          direction === "left" ? "-left-5" : "-right-5"
        } z-10`}
      >
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button
            onClick={onClick}
            size={"icon"}
            variant="secondary"
            className="rounded-full p-2 text-white shadow-lg ring-2 ring-primary"
          >
            <Icon size={24} />
          </Button>
        </motion.div>
      </div>
    )
  )
}

export default CarrouselNavigationButton
