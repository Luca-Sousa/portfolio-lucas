import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SidebarDashboard from "./_components/sidebar-dashboard";
import { EdgeStoreProvider } from "../_lib/edgestore";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../_components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

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
          <div className="flex h-full flex-col">
            <SidebarProvider className="h-full bg-muted">
              <SidebarDashboard />

              <SidebarInset className="flex flex-col overflow-y-auto bg-muted">
                <header className="flex h-16 shrink-0 items-center gap-2">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1 bg-muted" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                  </div>
                </header>

                {children}
              </SidebarInset>
            </SidebarProvider>
          </div>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
