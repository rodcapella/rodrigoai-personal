import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

import { lazy, Suspense } from "react";
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
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="theme-provider" data-theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">
              Loading...
            </div>}>
             </Suspense>  
          </BrowserRouter>
        </div>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
