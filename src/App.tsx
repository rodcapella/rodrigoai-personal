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
    return "dark";
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
