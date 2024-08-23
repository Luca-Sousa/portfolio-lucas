const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function createTechnology(name: string, iconURL: string) {
  return prisma.technology.create({
    data: { name, iconURL },
  })
}

async function createProject(
  title: string,
  description: string,
  imageURL: string,
  repositoryURL: string,
  liveURL: string,
  status: string,
  techIds: string[],
) {
  return prisma.project.create({
    data: {
      title,
      description,
      imageURL,
      repositoryURL,
      liveURL,
      status,
      technologies: {
        connect: techIds.map((id) => ({ id })),
      },
    },
  })
}

async function seedDatabase() {
  try {
    // Criação das tecnologias
    const [
      react,
      tailwind,
      vite,
      framerMotion,
      typescript,
      javascript,
      jquery,
      docker,
      postgresql,
      prismaicon,
      neondb,
      node,
      nextjs,
      shadcnui,
    ] = await Promise.all([
      createTechnology(
        "React",
        "https://utfs.io/f/c7b47843-ccf9-43d4-980f-26ce7e76c83c-8ewyd5.svg",
      ),
      createTechnology(
        "Tailwind",
        "https://utfs.io/f/91c6e473-4f92-4272-a4ca-870536ca142d-3uli32.svg",
      ),
      createTechnology(
        "Vite",
        "https://utfs.io/f/371fc27a-34f3-4822-9c83-77e121dd5e40-s8f54u.svg",
      ),
      createTechnology(
        "Framer Motion",
        "https://utfs.io/f/2c647059-d60d-4c2e-a78d-9efc1f9478fa-uw0lxk.svg",
      ),
      createTechnology(
        "TypeScript",
        "https://utfs.io/f/83cf08d6-e0e4-41ee-8e73-8cc5849817b0-g3mh4v.svg",
      ),
      createTechnology(
        "JavaScript",
        "https://utfs.io/f/a4bb1cdb-919a-4c15-9633-cc6263c9f015-vdopbb.svg",
      ),
      createTechnology(
        "Jquery",
        "https://utfs.io/f/1dea104f-f3f5-49cf-b409-76bfbe739a26-sbuda0.svg",
      ),
      createTechnology(
        "Docker",
        "https://utfs.io/f/84159cab-ef67-4790-9482-8d6108fde378-y2kop2.svg",
      ),
      createTechnology(
        "Postgresql",
        "https://utfs.io/f/242a0c1b-f1ce-4bcc-ac28-cec52e31c48b-dlon8u.svg",
      ),
      createTechnology(
        "Prisma",
        "https://utfs.io/f/5f3d1f0f-a90d-43a0-805f-a12204257706-tmrlei.svg",
      ),
      createTechnology(
        "NeonDB",
        "https://utfs.io/f/33176cf0-9ec5-408e-b8a1-b2803d6e119f-qhebdc.svg",
      ),
      createTechnology(
        "Node",
        "https://utfs.io/f/f240705b-d977-4149-a5ed-d2ceade10357-6xn810.svg",
      ),
      createTechnology(
        "NextJS",
        "https://utfs.io/f/8316900b-9ee5-4978-9071-8c2e03e6b835-jd0hsj.svg",
      ),
      createTechnology(
        "ShadcnUI",
        "https://utfs.io/f/2e73a50b-779a-4305-867a-ecf57c8790c3-gxotg8.svg",
      ),
    ])

    // Criação dos projetos
    await Promise.all([
      createProject(
        "FSW Barber",
        "Projeto desenvolvido na Full Stack Week com o professor Felipe Rocha.",
        "https://utfs.io/f/10034130-0846-4360-b52e-c925f9eda911-orh5wn.png",
        "https://github.com/Luca-Sousa/fws-barber",
        "https://fws-barber-jade.vercel.app/",
        "Em Att",
        [
          react.id,
          tailwind.id,
          nextjs.id,
          typescript.id,
          neondb.id,
          shadcnui.id,
          prismaicon.id,
          postgresql.id,
        ],
      ),
      createProject(
        "Ecommerce Product Page Main",
        "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de criar uma página de produto de comércio eletrônico, com implementações de Galeria lightbox, Carrinho de compra, Slide de imagens e etc.",
        "https://utfs.io/f/f827a950-575c-455b-8215-ae30b320742c-6z4mt4.jpg",
        "https://github.com/Luca-Sousa/Project-Ecommerce-Product-Page-Main",
        "https://project-ecommerce-product-page-main.vercel.app/",
        "Finalizado",
        [react.id, tailwind.id, vite.id, framerMotion.id, typescript.id],
      ),
      createProject(
        "Product List With Cart Main",
        "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de criar uma lista de produtos que inclua um carrinho funcional e adicionar todos os dados de cada produto.",
        "https://utfs.io/f/6d47e80b-7743-41fd-8108-b10d8d959283-opzlqc.jpg",
        "https://github.com/Luca-Sousa/Project-Product-List-With-Cart-Main",
        "https://project-product-list-with-cart-main.vercel.app/",
        "Finalizado",
        [react.id, tailwind.id, vite.id, typescript.id],
      ),
      createProject(
        "Base Apparel Coming Soon Page",
        "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de Criar um layout simples, mas com detalhes para testar as habilidades em CSS, e praticar validação básica de formulários.",
        "https://utfs.io/f/e25d15cb-1965-4cce-8cd1-d221f6f3a434-6w9zbi.jpg",
        "https://github.com/Luca-Sousa/Project-Base-Apparel-Coming-Soon-Master",
        "https://project-base-apparel-coming-soon-master.vercel.app/",
        "Finalizado",
        [tailwind.id, jquery.id],
      ),
      createProject(
        "Sunnyside Agency Landing Page",
        "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de Criar uma landing page, com foco principalmente em HTML e CSS.",
        "https://utfs.io/f/cf881fca-4202-42d8-955f-77ce251d3769-ynv6pi.jpg",
        "https://github.com/Luca-Sousa/Project-Sunnyside-Agency-Landing-Page-Main",
        "https://project-sunnyside-agency-landing-page-main.vercel.app/",
        "Finalizado",
        [tailwind.id, javascript.id],
      ),
      createProject(
        "Intro Section With Dropdown Navigation",
        "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de Criar uma seção de introdução com navegação suspensa.",
        "https://utfs.io/f/9d83ea8a-3225-4243-a99c-8a60e6751042-a77e0a.jpg",
        "https://github.com/Luca-Sousa/Project-Intro-Section-With-Dropdown-Navigation-Main",
        "https://project-intro-section-with-dropdown-navigation-main.vercel.app/",
        "Finalizado",
        [tailwind.id, jquery.id],
      ),
      createProject(
        "Intro Component With Signup Form",
        "Projeto desenvolvido através do site Frontend Mentor. Com o objetivo de Criar uma landing page, e praticar validação básica de formulários.",
        "https://utfs.io/f/d55a7a5d-9237-4f00-ac31-0b9da7d93722-bgib8t.jpg",
        "https://github.com/Luca-Sousa/Project-Intro-Component-With-Signup-Form-Master",
        "https://project-intro-component-with-signup-form-master.vercel.app/",
        "Em Dev",
        [tailwind.id, jquery.id],
      ),
    ])
  } catch (error) {
    console.error("Erro ao criar os projetos:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDatabase()
