import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import Container from "@/components/layout/Container";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/professional", label: "Professional" },
  { to: "/personal", label: "Personal" },
  { to: "/why-me", label: "Why Me?" },
  { to: "/blog", label: "Blog" },
  { to: "/side-projects", label: "Innovation Hub" },
];

const Footer = () => {
  return (
    <footer className="site-footer border-t border-primary/10 bg-card/20 py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div>
            <img
              src="/logo_fundo_transparente.webp"
              alt="Rodrigo Póvoa Logo"
              className="h-11 opacity-70"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Data Analytics Engineer, Technical Data Leader e fundador da Sapiente.AI.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.linkedin.com/in/rodrigocspovoa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Rodrigo Póvoa"
                className="rounded-lg border border-primary/15 p-2 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/rodcapella"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Rodrigo Póvoa"
                className="rounded-lg border border-primary/15 p-2 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Navegação do footer">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Navegação</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-muted-foreground transition hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Informação</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/contact" className="text-muted-foreground transition hover:text-primary">Contacto</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground transition hover:text-primary">Política de Privacidade</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary/10 pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rodrigo Póvoa — Data Analytics Engineer & Team Leader
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
