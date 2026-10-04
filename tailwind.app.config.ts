import type { Config } from "tailwindcss";
import baseConfig from "./tailwind.config";

/**
 * Tailwind content for the authenticated app graph (/empresa|/funcionario).
 */
export default {
  presets: [baseConfig],
  content: [
    "./app.html",
    "./src/main-app.tsx",
    "./src/apps/AuthenticatedApp.tsx",
    "./src/apps/AppProviders.tsx",
    "./src/pages/NotFound.tsx",
    "./src/pages/empresa/**/*.{ts,tsx}",
    "./src/pages/funcionario/**/*.{ts,tsx}",
    "./src/components/layouts/**/*.{ts,tsx}",
    "./src/components/empresa/**/*.{ts,tsx}",
    "./src/components/funcionarios/**/*.{ts,tsx}",
    "./src/components/landing/RevealOnScroll.tsx",
    "./src/components/ListPagination.tsx",
    "./src/components/banco-horas/**/*.{ts,tsx}",
    "./src/components/ponto/**/*.{ts,tsx}",
    "./src/components/charts/**/*.{ts,tsx}",
    "./src/components/ProtectedRoute.tsx",
    "./src/components/GtagRouteTracker.tsx",
    "./src/components/ScrollToTop.tsx",
    "./src/components/RouteFallback.tsx",
    "./src/components/AppFooter.tsx",
    "./src/components/ui/**/*.{ts,tsx}",
    "./src/contexts/AuthContext.tsx",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/constants/**/*.{ts,tsx}",
    "./src/content/landing-site.ts",
    "./src/types/**/*.{ts,tsx}",
  ],
} satisfies Config;
