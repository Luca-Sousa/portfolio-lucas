"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import SideBar from "../_components/side-bar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../_components/ui/card"
import DashboardProjects from "../_components/dashboard-projects"

const Dashboard = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/")
    }
  }, [session, status, router])

  if (!session) return null

  return (
    <div className="mx-4 flex h-full flex-col gap-4 py-4 sm:mx-auto sm:max-w-xl sm:gap-8 sm:py-8 md:max-w-2xl lg:max-w-4xl xl:max-w-[1440px] xl:flex-row xl:gap-10">
      <SideBar />

      <Card className="w-full rounded-2xl sm:relative xl:overflow-y-auto xl:[&&::-webkit-scrollbar]:hidden">
        <CardHeader className="space-y-3">
          <div className="space-y-1 sm:space-y-3">
            <CardTitle className="sm:text-3xl">Projetos</CardTitle>
            <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
          </div>
        </CardHeader>

        <CardContent>
          <DashboardProjects status="" />
        </CardContent>
      </Card>

      <div className="min-h-16 w-full sm:min-h-0.5 xl:hidden"></div>
    </div>
  )
}

export default Dashboard