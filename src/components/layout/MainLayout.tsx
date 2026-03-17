import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

const MainLayout = ({ children, theme, onToggleTheme }: any) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="flex-1 pt-32 pb-24">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
