"use client"

import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { getProjects } from "@/app/_data_access/get-projects"
import { ProjectStatus } from "@prisma/client"
import React, { useEffect, useRef, useState } from "react"
import CarouselNavigationButton from "./_components/carousel-navigation-button"
import ProjectItem from "./_components/project-item"
import { Project } from "@/app/_types/types"

const Projects = () => {
  const finalizadoRef = useRef<HTMLDivElement | null>(null)
  const attRef = useRef<HTMLDivElement | null>(null)
  const devRef = useRef<HTMLDivElement | null>(null)
  const [showLeftArrowFinalizado, setShowLeftArrowFinalizado] = useState(false)
  const [showRightArrowFinalizado, setShowRightArrowFinalizado] =
    useState(false)
  const [showLeftArrowAtt, setShowLeftArrowAtt] = useState(false)
  const [showRightArrowAtt, setShowRightArrowAtt] = useState(false)
  const [showLeftArrowDev, setShowLeftArrowDev] = useState(false)
  const [showRightArrowDev, setShowRightArrowDev] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const checkOverflow = (
      ref: React.RefObject<HTMLDivElement>,
      setShowLeftArrow: React.Dispatch<React.SetStateAction<boolean>>,
      setShowRightArrow: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      if (ref.current) {
        const { scrollWidth, clientWidth, scrollLeft } = ref.current
        setShowLeftArrow(scrollLeft > 0)
        setShowRightArrow(scrollWidth - scrollLeft > clientWidth)
      }
    }

    const updateArrows = () => {
      if (dataLoaded) {
        if (finalizadoRef.current) {
          checkOverflow(
            finalizadoRef,
            setShowLeftArrowFinalizado,
            setShowRightArrowFinalizado,
          )
        }
        if (attRef.current) {
          checkOverflow(attRef, setShowLeftArrowAtt, setShowRightArrowAtt)
        }
        if (devRef.current) {
          checkOverflow(devRef, setShowLeftArrowDev, setShowRightArrowDev)
        }
      }
    }

    updateArrows() // Chamada inicial para verificar
    const resizeObserver = new ResizeObserver(updateArrows)
    resizeObserver.observe(document.body) // Pode observar elementos específicos
    return () => resizeObserver.disconnect()
  }, [dataLoaded]) // Dependência em dataLoaded para atualizar quando os dados forem carregados

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right",
    setShowLeftArrow: React.Dispatch<React.SetStateAction<boolean>>,
    setShowRightArrow: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (ref.current) {
      const scrollAmount = 300 // Ajuste o valor conforme necessário
      ref.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      })

      setTimeout(() => {
        // Atualizar visibilidade das setas após a rolagem
        if (ref.current) {
          const { scrollWidth, clientWidth, scrollLeft } = ref.current
          setShowLeftArrow(scrollLeft > 0)
          setShowRightArrow(scrollWidth - scrollLeft > clientWidth)
        }
      }, 300) // Tempo de atraso para garantir que o scroll foi completado
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getProjects({})
      setProjects(fetchedProjects)
      setDataLoaded(true)
    }

    fetchProjects()
  }, [])

  const filteredProjects = {
    finalizado: projects.filter(
      (project) => project.status === ProjectStatus.Finalizado,
    ),
    emAtt: projects.filter(
      (project) => project.status === ProjectStatus.Em_Att,
    ),
    emDev: projects.filter(
      (project) => project.status === ProjectStatus.Em_Dev,
    ),
  }

  return (
    <>
      <CardHeader className="space-y-3">
        <div className="space-y-1 sm:space-y-3">
          <CardTitle className="sm:text-3xl">Projetos</CardTitle>
          <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {filteredProjects.finalizado.length > 0 && (
          <div className="relative space-y-3">
            <h2 className="text-sm font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            <div
              ref={finalizadoRef}
              className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
            >
              {filteredProjects.finalizado.map((project) => (
                <ProjectItem
                  key={project.id}
                  setDataLoaded={setDataLoaded}
                  project={project}
                />
              ))}
            </div>

            {dataLoaded && (
              <>
                <CarouselNavigationButton
                  direction="left"
                  onClick={() =>
                    scroll(
                      finalizadoRef,
                      "left",
                      setShowLeftArrowFinalizado,
                      setShowRightArrowFinalizado,
                    )
                  }
                  show={showLeftArrowFinalizado}
                />

                <CarouselNavigationButton
                  direction="right"
                  onClick={() =>
                    scroll(
                      finalizadoRef,
                      "right",
                      setShowLeftArrowFinalizado,
                      setShowRightArrowFinalizado,
                    )
                  }
                  show={showRightArrowFinalizado}
                />
              </>
            )}
          </div>
        )}

        {filteredProjects.emAtt.length > 0 && (
          <div className="relative space-y-3">
            <h2 className="text-sm font-bold uppercase text-gray-400">
              Em Atualização
            </h2>
            <div
              ref={attRef}
              className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
            >
              {filteredProjects.emAtt.map((project) => (
                <ProjectItem
                  key={project.id}
                  setDataLoaded={setDataLoaded}
                  project={project}
                />
              ))}
            </div>

            {dataLoaded && (
              <>
                <CarouselNavigationButton
                  direction="left"
                  onClick={() =>
                    scroll(
                      attRef,
                      "left",
                      setShowLeftArrowAtt,
                      setShowRightArrowAtt,
                    )
                  }
                  show={showLeftArrowAtt}
                />

                <CarouselNavigationButton
                  direction="right"
                  onClick={() =>
                    scroll(
                      attRef,
                      "right",
                      setShowLeftArrowAtt,
                      setShowRightArrowAtt,
                    )
                  }
                  show={showRightArrowAtt}
                />
              </>
            )}
          </div>
        )}

        {filteredProjects.emDev.length > 0 && (
          <div className="relative space-y-3">
            <h2 className="text-sm font-bold uppercase text-gray-400">
              Em Desenvolvimento
            </h2>
            <div
              ref={devRef}
              className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
            >
              {filteredProjects.emDev.map((project) => (
                <ProjectItem
                  key={project.id}
                  setDataLoaded={setDataLoaded}
                  project={project}
                />
              ))}
            </div>

            {dataLoaded && (
              <>
                <CarouselNavigationButton
                  direction="left"
                  onClick={() =>
                    scroll(
                      devRef,
                      "left",
                      setShowLeftArrowDev,
                      setShowRightArrowDev,
                    )
                  }
                  show={showLeftArrowDev}
                />

                <CarouselNavigationButton
                  direction="right"
                  onClick={() =>
                    scroll(
                      devRef,
                      "right",
                      setShowLeftArrowDev,
                      setShowRightArrowDev,
                    )
                  }
                  show={showRightArrowDev}
                />
              </>
            )}
          </div>
        )}
      </CardContent>
    </>
  )
}

export default Projects