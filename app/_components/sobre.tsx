import Link from "next/link"
import { CardDescription, CardHeader, CardTitle } from "./ui/card"

const Sobre = () => {
  return (
    <>
      <CardHeader className="space-y-3">
        <div className="space-y-1 sm:space-y-3">
          <CardTitle className="sm:text-3xl">Sobre</CardTitle>
          <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
        </div>

        <CardDescription>
          Sou um desenvolvedor FrontEnd com a missão de criar experiências
          digitais agradáveis e intuitivas. Estou sempre me desafiando com novos
          projetos e buscando feedback na comunidade de programação, além de
          compartilhar meus conhecimentos. Atualmente, estou em busca do meu
          primeiro trabalho como desenvolvedor FrontEnd. Meu objetivo é se
          tornar desenvolvedor Full-Stack.
        </CardDescription>

        <CardDescription>
          Atualmente sou graduando de Ciências da Computação, no{" "}
          <Link
            className="text-primary"
            target="_blank"
            href={"https://ifce.edu.br/"}
          >
            Instituto Federal do Ceará (IFCE)
          </Link>{" "}
          e estou me aprofundando em fundamentos de computação e programação.
          Paralelamente aos estudos acadêmicos, tenho procurado expandir meus
          conhecimentos online nas plataformas Full Stack Club, RocketSeat,
          Danki Code, e canais de programação e tecnologias no YouTube, dentre
          outras.
        </CardDescription>
      </CardHeader>
    </>
  )
}

export default Sobre
