import { db } from "@/app/_lib/prisma"
import { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email

      // Verifique se o e-mail está definido e é o e-mail do admin
      if (email && email === process.env.ADMIN_EMAIL) {
        // Verifica se o usuário já existe no banco de dados
        const user = await db.user.findUnique({
          where: { email },
        })

        if (!user) {
          // Cria um novo usuário no banco de dados se não existir
          await db.user.create({
            data: {
              email: email, // Garantido que email é uma string
              // Adicione outros campos necessários aqui
            },
          })
        }
        return true // Permite o login
      } else {
        return false // Bloqueia o login para outros e-mails
      }
    },
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      } as any
      return session
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
}
