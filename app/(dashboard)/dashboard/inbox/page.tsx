import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/_lib/auth"

const InboxPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return notFound()

  return <div className="w-full bg-accent">Inbox Page</div>
}

export default InboxPage
