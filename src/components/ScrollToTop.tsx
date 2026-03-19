import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // Tentamos obter o location. Se falhar aqui, o erro 'go' faz sentido
  const location = useLocation();

  useEffect(() => {
    // Usamos requestAnimationFrame para garantir que o scroll 
    // só acontece após o browser terminar de renderizar a nova rota
    const canScroll = typeof window !== "undefined";
    
    if (canScroll) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // "smooth" pode causar "jumping" em rotas longas
      });
    }
  }, [location.pathname]);

  return null;
}