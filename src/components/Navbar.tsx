import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Github, Linkedin, Menu, X, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { href: "/personal", label: "Personal" },
  { href: "/professional", label: "Professional" },
  { href: "/side-projects", label: "Side Projects" },
];

interface NavbarProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const Navbar = ({ theme = 'dark', onToggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3 border-b border-primary/20" : "py-5"
      }`}
    >
      <div className="container flex items-center justify-between px-4">
        <a href="/" className="h-5 w-auto">
          <img
            src="/logo_fundo_transparente.png"
            alt="Rodrigo Póvoa Logo"
            className="h-10 w-auto transition-all duration-300 hover:scale-105"
          />
        </a>
        
        {/* Desktop Navigation */}
       <div className="hidden md:flex items-center gap-8 relative">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
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
        </div>

        {/* Social Links & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <a
            href="https://www.linkedin.com/in/rodrigocspovoa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/rodcapella"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 right-0 bg-background border-b border-primary/20 md:hidden transition-all duration-300 ${
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="container px-4 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `font-medium transition-all duration-300 ${
                    isActive
                      ? "text-primary border-l-4 border-primary pl-2"
                      : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-primary/20">
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
                title="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a
                href="https://www.linkedin.com/in/rodrigocspovoa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/rodcapella"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
