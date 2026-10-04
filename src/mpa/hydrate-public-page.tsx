import { type ComponentType, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { PublicRouteShell } from "@/mpa/public-routes";
import { obterDeviceId } from "@/lib/device-id";
import { scheduleGtagIdleLoad } from "@/lib/gtag";
import { OtherRouteFullLoad } from "@/mpa/OtherRouteFullLoad";

const AuthAdjacentShell = lazy(() => import("@/apps/AuthAdjacentShell"));

/**
 * Hidrata UMA página. Não monta árvore de todas as rotas públicas.
 */
export function hydratePublicPage(options: {
  Page: ComponentType;
  path: string;
  shell: PublicRouteShell;
}) {
  const { Page, path, shell } = options;
  const root = document.getElementById("root");
  if (!root) throw new Error("#root ausente");

  obterDeviceId();

  // Fora do critical path: gtag só após load + idle.
  scheduleGtagIdleLoad();

  // /404 é servido pelo nginx em qualquer path inexistente (error_page);
  // a URL do browser continua a do 404 — precisa casar com *.
  const isNotFoundPage = path === "/404";

  let pageRoute;
  if (isNotFoundPage) {
    pageRoute = <Route path="*" element={<Page />} />;
  } else if (shell === "auth") {
    pageRoute = (
      <Route
        element={
          <Suspense fallback={null}>
            <AuthAdjacentShell />
          </Suspense>
        }
      >
        <Route path={path} element={<Page />} />
      </Route>
    );
  } else {
    pageRoute = <Route path={path} element={<Page />} />;
  }

  createRoot(root).render(
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {pageRoute}
          {!isNotFoundPage ? <Route path="*" element={<OtherRouteFullLoad />} /> : null}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>,
  );
}
