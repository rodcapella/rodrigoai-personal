import Container from "@/components/layout/Container"

const Footer = () => {
  return (

    <footer className="border-t border-primary/10 py-10">

      <Container>

        <div className="flex flex-col items-center justify-center gap-4 text-center">

          {/* Logo */}
          <img
            src="/logo_fundo_transparente.png"
            alt="Rodrigo Póvoa Logo"
            className="h-10 opacity-60"
          />

          {/* Texto */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rodrigo Póvoa — Data Analytics Engineer & Team Leader
          </p>

        </div>

      </Container>

    </footer>

  )
}

export default Footer