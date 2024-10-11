import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import SidebarDashboard from "./_components/sidebar-dashboard"
import { EdgeStoreProvider } from "../_lib/edgestore"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio - Lucas",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ptBr" className="dark">
      <body className={inter.className}>
        <EdgeStoreProvider>
          <div className="flex h-full">
            <SidebarDashboard />
            {children}
          </div>
          <Toaster />
        </EdgeStoreProvider>
      </body>
    </html>
  )
}
