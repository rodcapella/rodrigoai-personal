import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import PrivacyConsent from "@/components/PrivacyConsent";
import { trackPageView } from "@/lib/analytics";

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") setTheme(stored);
    setThemeReady(true);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme, themeReady]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      trackPageView(`${location.pathname}${location.search}`);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <Outlet context={{ theme, onToggleTheme: handleToggleTheme }} />
      <Footer />
      <PrivacyConsent />
    </>
  );
}
