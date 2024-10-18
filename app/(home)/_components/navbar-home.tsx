import NavbarHomeButton from "./navbar-home-button"
import ContactButton from "./contact-button"

const NavbarHome = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full max-w-full items-center justify-center rounded-t-3xl border-t-4 border-gray-600 bg-secondary py-4 sm:absolute sm:inset-0 sm:left-full sm:h-16 sm:max-w-sm sm:-translate-x-full sm:rounded-bl-2xl sm:rounded-tl-none sm:rounded-tr-2xl sm:border-0 md:max-w-md lg:max-w-lg">
      <div className="flex gap-6 md:gap-6 lg:gap-8">
        <NavbarHomeButton href="/">Sobre</NavbarHomeButton>

        <NavbarHomeButton href="/summary">Resumo</NavbarHomeButton>

        <NavbarHomeButton href="/projects">Projetos</NavbarHomeButton>

        <ContactButton />
      </div>
    </div>
  )
}

export default NavbarHome
