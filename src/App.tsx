import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Personal from "./pages/Personal";
import Professional from "./pages/Professional";

import SideProjects from "./pages/SideProjects";
import Contact from "./pages/Contact";

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

              <Route path="/side-projects" element={<SideProjects theme={theme} onToggleTheme={toggleTheme} />} />
              <Route path="/contact" element={<Contact theme={theme} onToggleTheme={toggleTheme} />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
