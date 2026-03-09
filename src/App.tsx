import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { PersonSchema } from "@/components/seo/PersonSchema";
import { WebSiteSchema } from "@/components/seo/WebSiteSchema";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Index = lazy(() => import("./pages/Index"));
const Professional = lazy(() => import("./pages/Professional"));
const Personal = lazy(() => import("./pages/Personal"));
const Contact = lazy(() => import("./pages/Contact"));
const SideProjects = lazy(() => import("./pages/SideProjects"));

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
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
    
        <div className="theme-provider" data-theme={theme}>
          <Suspense
                fallback={
                  <div className="min-h-screen flex items-center justify-center text-muted-foreground">
                    Loading...
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Index theme={theme} onToggleTheme={toggleTheme} />} />
                  <Route path="/professional" element={<Professional theme={theme} onToggleTheme={toggleTheme} />} />
                  <Route path="/personal" element={<Personal theme={theme} onToggleTheme={toggleTheme} />} />
                  <Route path="/contact" element={<Contact theme={theme} onToggleTheme={toggleTheme} />} />
                  <Route path="/side-projects" element={<SideProjects theme={theme} onToggleTheme={toggleTheme} />} />
                </Routes>
          </Suspense>
        </div>
    
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
