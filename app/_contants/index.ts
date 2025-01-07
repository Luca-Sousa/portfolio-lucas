import { CalendarDaysIcon, MailIcon, SmartphoneIcon } from "lucide-react"
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"
import { IoLocationOutline } from "react-icons/io5"
import { RiInstagramFill } from "react-icons/ri"

export const itemsMailTel = [
  {
    label: "email",
    value: "lucas.sousa.dev@gmail.com",
    icon: MailIcon,
  },
  {
    label: "telefone",
    value: "+55 (88) 99454-5892",
    icon: SmartphoneIcon,
  },
]

export const itemsNiverAddress = [
  {
    label: "Data de Nascimento",
    value: "27/09/1999",
    icon: CalendarDaysIcon,
  },
  {
    label: "Endereço",
    value: "Ubajara, Ceará",
    icon: IoLocationOutline,
  },
]

export const itemsNetworks = [
  {
    title: "Github",
    link: "https://github.com/Luca-Sousa",
    icon: FaGithub,
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/lucas-silva-0b79a72a7/",
    icon: FaLinkedin,
  },
  {
    title: "Facebook",
    link: "https://www.facebook.com/LukeSousa21/",
    icon: FaFacebook,
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/lk._dev/",
    icon: RiInstagramFill,
  },
]
