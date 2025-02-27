import { BookOpenText, CodeSquare, SectionIcon } from "lucide-react"
import { FaDatabase, FaJava, FaProjectDiagram } from "react-icons/fa"
import Link from "next/link"
import { MdWebhook } from "react-icons/md"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { ScrollArea } from "@/app/_components/ui/scroll-area"

const Summary = () => {
  return (
    <>
      <CardHeader className="space-y-4">
        <div className="space-y-3">
          <CardTitle className="sm:text-3xl">Resumo</CardTitle>
          <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
        </div>
      </CardHeader>

      <ScrollArea>
        <div className="space-y-6">
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <BookOpenText size={24} />
              <h3 className="font-semibold">Educação Acadêmica</h3>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
              <Card className="basis-1/2">
                <CardHeader className="space-y-3">
                  <div className="text-center">
                    <CardTitle className="text-base">
                      Formação em Desenvolvimento Web
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      EAD noturno | Abril de 2023 - Julho de 2023 (120 Horas)
                      <br />
                      <Link
                        target="_blank"
                        className="underline hover:text-primary"
                        href={
                          "https://www.linkedin.com/showcase/saper-dot-edu/"
                        }
                      >
                        Saper.edu
                      </Link>{" "}
                      |{" "}
                      <Link
                        target="_blank"
                        className="underline hover:text-primary"
                        href={
                          "https://drive.google.com/file/d/19ENEfiVVTEJJNjmUSJhrbI_oUCe4UdMY/view?usp=sharing"
                        }
                      >
                        Declaração de participação
                      </Link>
                    </p>
                  </div>

                  <CardDescription className="text-center text-sm text-gray-200">
                    O curso tem como objetivo a formação de profissionais em
                    desenvolvimento WEB, utilizando Java e ReactJS.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                  <h2 className="flex items-center gap-0.5">
                    <SectionIcon size={16} />
                    Módulos:
                  </h2>

                  <ul className="ml-6 space-y-2">
                    <li className="flex items-center gap-1">
                      <span className="inline-flex items-center gap-2 fill-primary">
                        <FaJava className="fill-primary" size={16} />
                        Lógica de programação
                      </span>
                      ( JAVA )
                    </li>

                    <li className="flex items-center gap-1">
                      <span className="inline-flex items-center gap-2 fill-primary">
                        <FaDatabase className="fill-primary" size={16} /> Banco
                        de Dados
                      </span>
                      ( Oracle )
                    </li>

                    <li className="flex items-center gap-1">
                      <span className="inline-flex items-center gap-2 fill-primary">
                        <CodeSquare className="text-primary" size={16} />{" "}
                        Backend
                      </span>
                      (Spring Boot)
                    </li>

                    <li className="flex items-center gap-1">
                      <span className="inline-flex items-center gap-2 fill-primary">
                        <MdWebhook className="fill-primary" size={16} />{" "}
                        Frontend
                      </span>
                      (React, Typescript e Bootstrap)
                    </li>

                    <li className="flex items-center gap-1">
                      <span className="itemsbasitems-center inline-flex gap-2 fill-primary">
                        <FaProjectDiagram className="fill-primary" size={16} />{" "}
                        Projeto Final
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="lg:basis-1/2">
                <CardHeader className="space-y-3">
                  <div className="text-center">
                    <CardTitle className="text-base">
                      Bacharelado em Ciência da Computação
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Graduação | AGO 2022 - ATUAL
                      <br />
                      <Link
                        target="_blank"
                        className="underline hover:text-primary"
                        href={"https://ifce.edu.br/tiangua/campus_tiangua"}
                      >
                        Instituto Federal do Ceará (IFCE) - Tianguá
                      </Link>
                    </p>
                  </div>

                  <CardDescription className="text-center text-sm text-gray-200">
                    O curso visa a formação de profissionais em bases
                    científica, técnica, ética e humanista, condizentes com a
                    especificidade da área de Ciência da Computação, aliado à
                    formação prática, através do desenvolvimento de projetos e
                    do domínio de tecnologias computacionais.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </CardContent>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <BookOpenText size={24} />
              <h3 className="font-semibold">Experiências Profissionais</h3>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base text-muted-foreground">
                  Em busca da minha primeira experiência como Desenvolvedor
                  Web...
                </CardTitle>
              </CardHeader>
            </Card>
          </CardContent>
        </div>
      </ScrollArea>
    </>
  )
}

export default Summary
