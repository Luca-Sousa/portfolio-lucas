import Link from "next/link"
import NavigationMenuItems from "../_components/navigation-menu"
import SideBar from "../_components/side-bar"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card"

const About = () => {
  return (
    <div>
      <SideBar />
      <NavigationMenuItems />

      <Card className="m-4 rounded-2xl sm:mx-auto sm:max-w-xl">
        <CardHeader className="space-y-3">
          <div className="space-y-1">
            <CardTitle>Sobre</CardTitle>
            <div className="h-1 w-8 rounded-2xl bg-primary"></div>
          </div>

          <CardDescription className="">
            Sou um desenvolvedor FrontEnd com a missão de criar experiências
            digitais agradáveis e intuitivas. Estou sempre me desafiando com
            novos projetos e buscando feedback na comunidade de programação,
            além de compartilhar meus conhecimentos. Atualmente, estou em busca
            do meu primeiro trabalho como desenvolvedor FrontEnd. Meu objetivo é
            se tornar desenvolvedor Full-Stack.
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
      </Card>
    </div>
  )
}

export default About
