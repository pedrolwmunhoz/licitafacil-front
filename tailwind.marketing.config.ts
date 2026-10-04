import type { Config } from "tailwindcss";
import baseConfig from "./tailwind.config";

/**
 * Tailwind content for the public/marketing graph only.
 * Keep authenticated pages/layouts out so unused app utilities stay out of marketing CSS.
 */
export default {
  presets: [baseConfig],
  content: [
    "./index.html",
    "./app.html",
    "./src/apps/AuthAdjacentShell.tsx",
    "./src/apps/AppProviders.tsx",
    "./src/prerender.tsx",
    "./src/pages/Index.tsx",
    "./src/pages/NotFound.tsx",
    "./src/pages/CadastroPage.tsx",
    "./src/pages/CobrancaConcluidoPage.tsx",
    "./src/pages/auth/**/*.{ts,tsx}",
    "./src/pages/legal/**/*.{ts,tsx}",
    "./src/pages/marketing/**/*.{ts,tsx}",
    "./src/components/landing/**/*.{ts,tsx}",
    "./src/components/marketing/**/*.{ts,tsx}",
    "./src/components/seo/**/*.{ts,tsx}",
    "./src/components/calculators/**/*.{ts,tsx}",
    "./src/components/charts/native-lime-charts.tsx",
    "./src/components/GtagRouteTracker.tsx",
    "./src/components/ScrollToTop.tsx",
    "./src/components/RouteFallback.tsx",
    "./src/components/ui/**/*.{ts,tsx}",
    "./src/contexts/AuthContext.tsx",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/utils.ts",
    "./src/lib/gtag.ts",
    "./src/lib/sessao-hint.ts",
    "./src/lib/validations.ts",
    "./src/lib/format.ts",
    "./src/lib/useEstadosCidades.ts",
    "./src/content/**/*.{ts,tsx}",
  ],
} satisfies Config;
