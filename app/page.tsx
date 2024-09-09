"use client"

import SideBar from "./_components/side-bar"
import { Card } from "./_components/ui/card"
import About from "./_components/about"
import Projects from "./_components/projects"
import Resume from "./_components/resume"
import { useState } from "react"
import NavigationMenuItems from "./_components/navigation-menu"

const Home = () => {
  const [active, setActive] = useState<string>("sobre")

  const handleClick = (page: string) => {
    setActive(page)
  }

  return (
    <div className="mx-4 flex h-full flex-col gap-4 py-4 sm:mx-auto sm:max-w-xl sm:gap-8 sm:py-8 md:max-w-2xl lg:max-w-4xl xl:max-w-[1440px] xl:flex-row xl:gap-10">
      <SideBar />

      <div className="sm:hidden">
        <NavigationMenuItems active={active} handleClick={handleClick} />
      </div>

      <Card className="w-full rounded-2xl sm:relative xl:overflow-y-auto xl:[&&::-webkit-scrollbar]:hidden">
        <div className="hidden sm:block">
          <NavigationMenuItems active={active} handleClick={handleClick} />
        </div>

        {active === "sobre" ? (
          <About />
        ) : active === "resumo" ? (
          <Resume />
        ) : active === "projetos" ? (
          <Projects />
        ) : null}
      </Card>

      <div className="min-h-16 w-full sm:min-h-0.5 xl:hidden"></div>
    </div>
  )
}

export default Home
