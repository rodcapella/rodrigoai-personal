import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

export default function App() {
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

  return (
    <>
      <Outlet context={{ theme, onToggleTheme: handleToggleTheme }} />
      <Footer />
    </>
  );
}