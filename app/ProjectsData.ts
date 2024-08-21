import projectArticlePreviewComponent from "../public/Project-Article-Preview-Component-Master-Desktop-Preview.jpg"
import projectBaseApparel from "../public/Project-Base-Apparel-Coming-Soon-Master-Desktop-Preview.jpg"
import projectSunnysideAgency from "../public/Project-Sunnyside-Agency-Landing-Page-Main-Desktop-Preview.jpg"
import projectIntroSectionDropdown from "../public/Project-Intro-Section-With-Dropdown-Navigation-Main-Desktop-Preview.jpg"
import projectIntroComponent from "../public/Project-Intro-Component-With-Signup-Form-Master-Preview.jpg"
import projectProductList from "../public/Project-Product-List-With-Cart-Main.jpg"
import ProjectEcommerceProduct from "../public/Project-Ecommerce-Product-Page-Main.jpg"
import ReactIcon from "../public/react-icon.svg"
import TailwindIcon from "../public/tailwind-icon.svg"
import ViteIcon from "../public/vite-icon.svg"
import TypescriptIcon from "../public/typescript-icon.svg"
import JavascriptIcon from "../public/javascript-icon.svg"
import FramerMotionIcon from "../public/framer-motion-icon.svg"
import JqueryIcon from "../public/jquery-icon.svg"

const ProjectsData = [
  {
    id: 1,
    image: ProjectEcommerceProduct,
    linkGithub:
      "https://github.com/Luca-Sousa/Project-Ecommerce-Product-Page-Main",
    linkVercel: "https://project-ecommerce-product-page-main.vercel.app/",
    title: "Ecommerce Product Page Main",
    description:
      "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de criar uma página de produto de comércio eletrônico, com implementações de Galeria lightbox, Carrinho de compra, Slide de imagens e etc.",
    status: "Finalizado",
    technologies: [
      { label: "React", icon: ReactIcon },
      { label: "Tailwind", icon: TailwindIcon },
      { label: "Vite", icon: ViteIcon },
      { label: "Framer Motion", icon: FramerMotionIcon },
      { label: "TypeScript", icon: TypescriptIcon },
    ],
  },
  {
    id: 2,
    image: projectProductList,
    linkGithub:
      "https://github.com/Luca-Sousa/Project-Product-List-With-Cart-Main",
    linkVercel: "https://project-product-list-with-cart-main.vercel.app/",
    title: "Product List With Cart Main",
    description:
      "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de criar uma lista de produtos que inclua um carrinho funcional e adicionar todos os dados de cada produto.",

    status: "Finalizado",
    technologies: [
      { label: "React", icon: ReactIcon },
      { label: "Tailwind", icon: TailwindIcon },
      { label: "Vite", icon: ViteIcon },
      { label: "TypeScript", icon: TypescriptIcon },
    ],
  },
  {
    id: 3,
    image: projectBaseApparel,
    linkGithub:
      "https://github.com/Luca-Sousa/Project-Base-Apparel-Coming-Soon-Master",
    linkVercel: "https://project-base-apparel-coming-soon-master.vercel.app/",
    title: "Base Apparel Coming Soon Page",
    description:
      "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de Criar um layout simples, mas com detalhes para testar as habilidades em CSS, e praticar validação básica de formulários.",
    status: "Finalizado",
    technologies: [
      { label: "Tailwind", icon: TailwindIcon },
      { label: "Jquery", icon: JqueryIcon },
    ],
  },
  {
    id: 4,
    image: projectSunnysideAgency,
    linkGithub:
      "https://github.com/Luca-Sousa/Project-Sunnyside-Agency-Landing-Page-Main",
    linkVercel:
      "https://project-sunnyside-agency-landing-page-main.vercel.app/",
    title: "Sunnyside Agency Landing Page",
    description:
      "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de Criar uma landing page, com foco principalmente em HTML e CSS.",
    status: "Em Dev",
    technologies: [
      { label: "Tailwind", icon: TailwindIcon },
      { label: "JavaScript", icon: JavascriptIcon },
    ],
  },
  {
    id: 5,
    image: projectIntroSectionDropdown,
    linkGithub:
      "https://github.com/Luca-Sousa/Project-Intro-Section-With-Dropdown-Navigation-Main",
    linkVercel:
      "https://project-intro-section-with-dropdown-navigation-main.vercel.app/",
    title: "Intro Section With Dropdown Navigation",
    description:
      "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de Criar uma seção de introdução com navegação suspensa.",
    status: "Em Dev",
    technologies: [
      { label: "Tailwind", icon: TailwindIcon },
      { label: "Jquery", icon: JqueryIcon },
    ],
  },
  {
    id: 6,
    image: projectIntroComponent,
    linkGithub:
      "https://github.com/Luca-Sousa/Project-Intro-Component-With-Signup-Form-Master",
    linkVercel:
      "https://project-intro-component-with-signup-form-master.vercel.app/",
    title: "Intro Component With Signup Form",
    description:
      "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de Criar uma landing page, e praticar validação básica de formulários.",
    status: "Em Dev",
    technologies: [
      { label: "Tailwind", icon: TailwindIcon },
      { label: "Jquery", icon: JqueryIcon },
    ],
  },
  {
    id: 7,
    image: projectArticlePreviewComponent,
    linkGithub:
      "https://github.com/Luca-Sousa/Project-Article-Preview-Component-Master",
    linkVercel: "https://project-article-preview-component-master.vercel.app/",
    title: "Article Preview Component",
    description:
      "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de praticar as habilidades de layout com a criação de um componente de pré-visualização de artigo.",
    status: "Em Att",
    technologies: [
      { label: "Tailwind", icon: TailwindIcon },
      { label: "Jquery", icon: JqueryIcon },
    ],
  },
]

export default ProjectsData
