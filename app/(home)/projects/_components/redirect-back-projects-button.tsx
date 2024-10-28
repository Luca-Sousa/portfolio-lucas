"use client"

import { Button } from "@/app/_components/ui/button"
import { motion } from "framer-motion"
import { CircleArrowLeft } from "lucide-react"
import Link from "next/link"

const RedirectBackProjectsButton = () => {
  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
      <Button size="icon" variant="ghost" className="rounded-full" asChild>
        <Link href="/projects" aria-label="Voltar para Projetos">
          <CircleArrowLeft size={36} className="text-primary" />
        </Link>
      </Button>
    </motion.button>
  )
}

export default RedirectBackProjectsButton
