"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import SideBar from "../_components/side-bar"

const Dashboard = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/api/auth/login")
    }
  }, [session, status, router])

  if (!session) return null

  return (
    <div className="mx-4 flex h-full flex-col gap-4 py-4 sm:mx-auto sm:max-w-xl sm:gap-8 sm:py-8 md:max-w-2xl lg:max-w-4xl xl:max-w-[1440px] xl:flex-row xl:gap-10">
      <SideBar />
    </div>
  )
}

export default Dashboard
