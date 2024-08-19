import { CardDescription, CardHeader, CardTitle } from "./ui/card"

const Contact = () => {
  return (
    <>
      <CardHeader className="space-y-3">
        <div className="space-y-1 sm:space-y-3">
          <CardTitle className="sm:text-3xl">Contato</CardTitle>
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
      </CardHeader>
    </>
  )
}

export default Contact
