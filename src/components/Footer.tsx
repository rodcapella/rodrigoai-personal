const Footer = () => (
  <footer className="py-10 border-t border-border relative">
    <div className="container px-4 text-center flex flex-col items-center gap-4">

      {/* Logo com glow sutil */}
      <div className="relative">
        <img
          src="/logo_fundo_transparente.png"
          alt="Rodrigo Póvoa Logo"
          className="h-8 w-auto opacity-90 transition-all duration-300 
                     drop-shadow-[0_0_8px_rgba(59,130,246,0.25)]
                     hover:drop-shadow-[0_0_14px_rgba(59,130,246,0.45)]"
        />
      </div>

      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Rodrigo Póvoa — Data Analytics Engineer & Team Leader.
      </p>

    </div>
  </footer>
);

export default Footer;
