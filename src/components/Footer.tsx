const Footer = () => (
  <footer className="py-10 border-t border-border relative">
    <div className="container px-4 text-center flex flex-col items-center gap-4">

      {/* Logo com glow sutil */}
      <div className="relative">
        <img
          src="/public/logo_fundo_transparente.png"
          alt="Rodrigo Póvoa Logo"
          className="h-16 md:h-20 w-auto opacity-90 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />
      </div>

      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Rodrigo Póvoa — Data Analytics Engineer & Team Leader.
      </p>

    </div>
  </footer>
);

export default Footer;
