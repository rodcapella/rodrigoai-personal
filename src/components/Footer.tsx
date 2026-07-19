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

const scrollToPageTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

const Footer = () => {
  return (
    <footer className="site-footer border-t border-primary/10 bg-card/20 py-8">
      <Container>
        <div className="grid gap-6 md:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div>
            <img
              src="/logo_fundo_transparente.webp"
              alt="Rodrigo Póvoa Logo"
              className="h-9 opacity-70"
            />
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Data Analytics Engineer, Technical Data Leader and founder of Sapiente.AI.
            </p>
            <div className="mt-3 flex gap-3">
              <a
                href="https://www.linkedin.com/in/rodrigocspovoa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rodrigo Póvoa on LinkedIn"
                className="rounded-lg border border-primary/15 p-2 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/rodcapella"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rodrigo Póvoa on GitHub"
                className="rounded-lg border border-primary/15 p-2 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Navigation</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} onClick={scrollToPageTop} className="text-muted-foreground transition hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Information</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/contact" onClick={scrollToPageTop} className="text-muted-foreground transition hover:text-primary">Contact</Link></li>
              <li><Link to="/privacy" onClick={scrollToPageTop} className="text-muted-foreground transition hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-primary/10 pt-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rodrigo Póvoa — Data Analytics Engineer & Team Leader
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
