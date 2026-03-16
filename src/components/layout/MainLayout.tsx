import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

interface MainLayoutProps {
  children: React.ReactNode
  theme?: "dark" | "light"
  onToggleTheme?: () => void
}

const MainLayout = ({
  children,
  theme = "dark",
  onToggleTheme
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="pt-36 pb-24">
        {children}
      </main>

      <Footer />

    </div>
  )
}

export default MainLayout