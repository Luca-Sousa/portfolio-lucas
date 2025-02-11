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
      if (profile?.email === process.env.ADMIN_EMAIL) {
        return true
      } else {
        return false
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
