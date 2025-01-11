import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EdgeStoreProvider } from "../_lib/edgestore";
import { SidebarProvider } from "../_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";

export const metadata: Metadata = {
  title: "Portfólio - Lucas",
  description: "Meu Portfólio",
};

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ptBr">
      <body className={`${inter.className} antialiased`}>
        <EdgeStoreProvider>
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
