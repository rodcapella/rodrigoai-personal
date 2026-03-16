import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Github, Linkedin, Sun, Moon, Menu, X } from "@/lib/icons"
import { motion, AnimatePresence } from "framer-motion"
import Container from "@/components/layout/Container"

const links = [
  { href: "/", label: "Home" },
  { href: "/why-me", label: "Why Me?" },
  { href: "/professional", label: "Professional" },
  { href: "/personal", label: "Personal" },
  { href: "/side-projects", label: "Side Projects" },
]

const preloadMap: Record<string, () => Promise<any>> = {
  "/professional": () => import("../pages/Professional"),
  "/personal": () => import("../pages/Personal"),
  "/why-me": () => import("../pages/WhyMe"),
  "/side-projects": () => import("../pages/SideProjects"),
  "/contact": () => import("../pages/Contact"),
}

interface NavbarProps {
  theme?: "dark" | "light"
  onToggleTheme?: () => void
}

const Navbar = ({ theme = "dark", onToggleTheme }: NavbarProps) => {

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
  }, [mobileMenuOpen])

  useEffect(() => {
    const closeMenu = () => setMobileMenuOpen(false)
    window.addEventListener("scroll", closeMenu)
    return () => window.removeEventListener("scroll", closeMenu)
  }, [])

  return (

    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass py-3 border-b border-primary/20 backdrop-blur-md"
          : "py-5"
      }`}
    >

      <Container>

        <div className="flex items-center justify-between">

          {/* LEFT — Navigation */}
          <div className="hidden md:flex items-center gap-8">

            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onMouseEnter={() => preloadMap[link.href]?.()}
                onTouchStart={() => preloadMap[link.href]?.()}
                className="relative text-sm font-medium transition-colors duration-300"
              >
                {({ isActive }) => (

                  <div className="relative px-2 py-1">

                    <span
                      className={`transition-all duration-300 ${
                        isActive
                          ? "text-primary drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary shadow-[0_0_8px_rgba(59,130,246,0.9)]"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}

                  </div>

                )}
              </NavLink>
            ))}

            {/* Contact Button */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 8px rgba(59,130,246,0.4)",
                  "0 0 18px rgba(59,130,246,0.9)",
                  "0 0 8px rgba(59,130,246,0.4)",
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="ml-4 rounded-lg"
            >
              <NavLink
                to="/contact"
                onMouseEnter={() => preloadMap["/contact"]?.()}
                onTouchStart={() => preloadMap["/contact"]?.()}
                className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
              >
                Contact
              </NavLink>
            </motion.div>

          </div>

          {/* RIGHT — Social + Theme + Mobile */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === "dark"
                ? <Sun className="w-5 h-5" />
                : <Moon className="w-5 h-5" />
              }
            </button>

            {/* Linkedin */}
            <a
              href="https://www.linkedin.com/in/rodrigocspovoa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            {/* Github */}
            <a
              href="https://github.com/rodcapella"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen
                ? <X className="w-6 h-6" />
                : <Menu className="w-6 h-6" />
              }
            </button>

          </div>

        </div>

      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>

        {mobileMenuOpen && (

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-primary/20 md:hidden"
          >

            <Container>

              <div className="flex flex-col gap-6 py-6">

                {links.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `font-medium text-lg transition-all duration-300 ${
                        isActive
                          ? "text-primary border-l-4 border-primary pl-3"
                          : "text-muted-foreground hover:text-primary"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                <NavLink
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-center font-medium"
                >
                  Contact
                </NavLink>

              </div>

            </Container>

          </motion.div>

        )}

      </AnimatePresence>

    </nav>
  )
}

export default Navbar