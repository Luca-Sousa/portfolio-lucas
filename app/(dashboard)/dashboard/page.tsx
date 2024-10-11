import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../../_lib/auth"

const Dashboard = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return notFound()

  return <div className="w-full bg-accent">Dashboard Page</div>
}

export default Dashboard
