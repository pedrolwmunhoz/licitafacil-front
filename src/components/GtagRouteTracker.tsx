import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gtagSendPagePath } from "@/lib/gtag";

/**
 * Disparo de gtag('config', AW, { page_path }) por rota.
 * Tag carregada via ensureGtagLoaded (idle no boot; urgente no page_path).
 */
export function GtagRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    gtagSendPagePath(pagePath);
  }, [location]);

  return null;
}
