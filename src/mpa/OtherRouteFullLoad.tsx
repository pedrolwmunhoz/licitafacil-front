import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NotFound from "@/pages/NotFound";

const MPA_NAV_KEY = "mpa-full-nav";

/**
 * Link/navigate client-side pra outra rota MPA.
 * O React Router já fez pushState na URL alvo — location.replace(mesma URL) é no-op
 * e a página fica no bundle errado (ex.: home). Força load do HTML certo.
 * Se o servidor responder 404 (ou o mesmo HTML errado de novo), para e mostra 404.
 */
export function OtherRouteFullLoad() {
  const location = useLocation();
  const [stuck, setStuck] = useState(false);

  useLayoutEffect(() => {
    const dest = `${location.pathname}${location.search}${location.hash}`;
    if (sessionStorage.getItem(MPA_NAV_KEY) === dest) {
      sessionStorage.removeItem(MPA_NAV_KEY);
      setStuck(true);
      return;
    }
    sessionStorage.setItem(MPA_NAV_KEY, dest);
    window.location.assign(dest);
  }, [location.pathname, location.search, location.hash]);

  if (stuck) return <NotFound />;
  return null;
}
