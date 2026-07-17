import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import PrivacyConsent from "@/components/PrivacyConsent";
import { trackPageView } from "@/lib/analytics";

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      trackPageView(`${location.pathname}${location.search}`);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  return (
    <>
      <Outlet context={{ theme, onToggleTheme: handleToggleTheme }} />
      <Footer />
      <PrivacyConsent />
    </>
  );
}
