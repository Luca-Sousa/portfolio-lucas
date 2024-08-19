"use client"

import SideBar from "./_components/side-bar"
import { Card } from "./_components/ui/card"
import About from "./_components/about"
import Projects from "./_components/projects"
import Resume from "./_components/resume"
import Contact from "./_components/contact"
import { useState } from "react"
import NavigationMenuItems from "./_components/navigation-menu"

const Home = () => {
  const [active, setActive] = useState<string>("about")

  const handleClick = (page: string) => {
    setActive(page)
  }

  return (
    <div className="mx-4 h-full space-y-4 py-4 sm:mx-auto sm:max-w-xl sm:space-y-8 sm:py-8 md:max-w-2xl lg:max-w-4xl xl:flex xl:max-w-7xl xl:gap-10 xl:space-y-0">
      <SideBar />

      <div className="sm:hidden">
        <NavigationMenuItems active={active} handleClick={handleClick} />
      </div>

      <Card className="w-full rounded-2xl sm:relative xl:overflow-y-auto xl:[&&::-webkit-scrollbar]:hidden">
        <div className="hidden sm:block">
          <NavigationMenuItems active={active} handleClick={handleClick} />
        </div>

        {active === "about" ? (
          <About />
        ) : active === "resume" ? (
          <Resume />
        ) : active === "project" ? (
          <Projects />
        ) : active === "contact" ? (
          <Contact />
        ) : null}
      </Card>
    </div>
  )
}

export default Home
