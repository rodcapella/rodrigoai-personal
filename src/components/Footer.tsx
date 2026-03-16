import Container from "@/components/layout/Container"

const Footer = () => {
  return (

    <footer className="border-t border-primary/10 py-10">

      <Container>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rodrigo Póvoa — Data Analytics Engineer & Team Leader.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">

            <a
              href="https://github.com/rodcapella"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/rodrigocspovoa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              LinkedIn
            </a>

          </div>

        </div>

      </Container>

    </footer>

  )
}

export default Footer