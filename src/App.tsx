import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { LazyMotion, domAnimation } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "@/components/ScrollToTop";
import React from "react";

// 1. Definição dos Lazy Components (Fora do componente App)
const Index = lazy(() => import("./pages/Index"));
const Professional = lazy(() => import("./pages/Professional"));
const Personal = lazy(() => import("./pages/Personal"));
const WhyMe = lazy(() => import("./pages/WhyMe"));
const SideProjects = lazy(() => import("./pages/SideProjects"));
const Contact = lazy(() => import("./pages/Contact"));

const queryClient = new QueryClient();

const App = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "dark" | "light") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <TooltipProvider>
          <Toaster />
          <div className="theme-provider" data-theme={theme}>
            <ScrollToTop />
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center text-muted-foreground">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index theme={theme} onToggleTheme={toggleTheme} />} />
                <Route path="/professional" element={<Professional theme={theme} onToggleTheme={toggleTheme} />} />
                <Route path="/personal" element={<Personal theme={theme} onToggleTheme={toggleTheme} />} />
                <Route path="/contact" element={<Contact theme={theme} onToggleTheme={toggleTheme} />} />
                <Route path="/side-projects" element={<SideProjects theme={theme} onToggleTheme={toggleTheme} />} />
                <Route path="/why-me" element={<WhyMe theme={theme} onToggleTheme={toggleTheme} />} />
              </Routes>
            </Suspense>
          </div>
          {import.meta.env.PROD && <Analytics />}
        </TooltipProvider>
      </LazyMotion>
    </QueryClientProvider>
  );
};

export default App;