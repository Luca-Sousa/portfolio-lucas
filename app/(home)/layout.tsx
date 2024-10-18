import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import SidebarHome from "./_components/sidebar-home"
import NavbarHome from "./_components/navbar-home"
import { Card } from "../_components/ui/card"

export const metadata: Metadata = {
  title: "Portfolio - Lucas",
  description: "Generated by create next app",
}

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ptBr">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col gap-4 p-4 pb-24 sm:mx-auto sm:max-w-xl sm:gap-8 sm:py-8 md:max-w-2xl lg:max-w-4xl xl:max-w-[1440px] xl:flex-row xl:gap-10 xl:px-8 2xl:px-0">
          <SidebarHome />

          <Card className="w-full rounded-2xl sm:relative xl:overflow-y-auto xl:[&&::-webkit-scrollbar]:hidden">
            <NavbarHome />
            {children}
          </Card>
        </div>
      </body>
    </html>
  )
}
