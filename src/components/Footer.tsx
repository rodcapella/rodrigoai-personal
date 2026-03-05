const Footer = () => (
  <footer className="py-10 border-t border-border">
    <div className="container px-4 text-center flex flex-col items-center gap-4">

      {/* Logo */}
      <img
        src="/logo_fundo_transparente.png"
        alt="Rodrigo Póvoa Logo"
        className="h-8 w-auto opacity-80"
      />

      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Rodrigo Póvoa - Data Analytics Engineer & Team Leader.
      </p>

    </div>
  </footer>
);

export default Footer;
