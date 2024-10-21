import CarouselNavigationButton from "./carousel-navigation-button"

interface CarouselNavigationProps {
  refElement: React.RefObject<HTMLDivElement>
  scroll: (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right",
    setShowLeftArrow: React.Dispatch<React.SetStateAction<boolean>>,
    setShowRightArrow: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void
  showLeftArrow: boolean
  showRightArrow: boolean
  setShowLeftArrow: React.Dispatch<React.SetStateAction<boolean>>
  setShowRightArrow: React.Dispatch<React.SetStateAction<boolean>>
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  refElement,
  scroll,
  showLeftArrow,
  showRightArrow,
  setShowLeftArrow,
  setShowRightArrow,
}) => (
  <>
    <CarouselNavigationButton
      direction="left"
      onClick={() =>
        scroll(refElement, "left", setShowLeftArrow, setShowRightArrow)
      }
      show={showLeftArrow}
    />

    <CarouselNavigationButton
      direction="right"
      onClick={() =>
        scroll(refElement, "right", setShowLeftArrow, setShowRightArrow)
      }
      show={showRightArrow}
    />
  </>
)

export default CarouselNavigation
