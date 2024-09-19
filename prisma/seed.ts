const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // Adicione um usuário administrador
  const adminEmail = process.env.ADMIN_EMAIL

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not defined in environment variables")
  }

  // Verifica se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        // Não é necessário fornecer password ou role
      },
    })
    console.log(`Usuário administrador com email ${adminEmail} criado.`)
  } else {
    console.log(`Usuário administrador com email ${adminEmail} já existe.`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
