import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Personal from "./pages/Personal";
import Professional from "./pages/Professional";
import Curiosities from "./pages/Curiosities";
import SideProjects from "./pages/SideProjects";

const queryClient = new QueryClient();

const App = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="theme-provider" data-theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index theme={theme} onToggleTheme={toggleTheme} />} />
              <Route path="/personal" element={<Personal theme={theme} onToggleTheme={toggleTheme} />} />
              <Route path="/professional" element={<Professional theme={theme} onToggleTheme={toggleTheme} />} />
              <Route path="/curiosities" element={<Curiosities theme={theme} onToggleTheme={toggleTheme} />} />
              <Route path="/side-projects" element={<SideProjects theme={theme} onToggleTheme={toggleTheme} />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
