import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Sobe o scroll ao trocar de rota (pathname).
 * Com âncora (#) na mesma página ou na home, não interfere — o destino trata o hash.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    window.scrollTo(0, 0);
    document.getElementById("conteudo-principal")?.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
