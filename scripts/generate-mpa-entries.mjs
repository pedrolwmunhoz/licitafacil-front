#!/usr/bin/env node
/**
 * Gera HTML + entry TSX + CSS + Tailwind config por rota pública.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_PUBLIC_ENTRIES } from "./public-routes-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const entriesDir = path.join(root, "src/entries/public");
const stylesDir = path.join(root, "src/styles/routes");
const twDir = path.join(root, "tailwind.routes");
const htmlDir = path.join(root, "mpa-html");

for (const dir of [entriesDir, stylesDir, twDir, htmlDir]) {
  fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir)) {
    fs.unlinkSync(path.join(dir, f));
  }
}

const CORE = [
  "./src/mpa/hydrate-public-page.tsx",
  "./src/mpa/OtherRouteFullLoad.tsx",
  "./src/pages/NotFound.tsx",
  "./src/components/landing/Navbar.tsx",
  "./src/components/landing/Footer.tsx",
  "./src/components/landing/HomeNavLinks.tsx",
  "./src/components/landing/SegPontoWordmark.tsx",
  // CTAs/hero compartilhados com home — sem isto o Tailwind das rotas MPA purgeia bg-landing-cta.
  "./src/components/landing/LandingHireCta.tsx",
  "./src/components/landing/LandingHeroHighlight.tsx",
  "./src/components/landing/FinalCTASection.tsx",
  "./src/components/landing/LandingSectionHeader.tsx",
  "./src/components/landing/RevealOnScroll.tsx",
  "./src/components/landing/FAQSection.tsx",
  "./src/components/seo/**/*.{ts,tsx}",
  "./src/components/ui/**/*.{ts,tsx}",
  "./src/lib/utils.ts",
  "./src/lib/gtag.ts",
  "./src/content/**/*.{ts,tsx}",
];

function contentFor(route) {
  const files = [
    `./mpa-html/${route.id}.html`,
    `./src/entries/public/${route.id}.tsx`,
    `./src/${route.pageModule}`,
    ...CORE,
  ];
  if (route.shell === "auth") {
    files.push(
      "./src/apps/AuthAdjacentShell.tsx",
      "./src/contexts/AuthContext.tsx",
      "./src/hooks/**/*.{ts,tsx}",
      "./src/lib/**/*.{ts,tsx}",
      "./src/components/GtagRouteTracker.tsx",
    );
  }
  if (route.path === "/") {
    files.push(
      "./src/components/landing/**/*.{ts,tsx}",
      "./src/components/charts/native-lime-charts.tsx",
    );
  }
  if (route.pageModule.includes("/marketing/")) {
    files.push(
      "./src/components/marketing/**/*.{ts,tsx}",
      "./src/components/landing/PricingSection.tsx",
    );
  }
  if (route.pageModule.includes("Calculadora") || route.path.includes("calculadora")) {
    files.push(
      "./src/components/calculators/**/*.{ts,tsx}",
      "./src/components/marketing/**/*.{ts,tsx}",
    );
  }
  if (route.pageModule.includes("legal/")) {
    files.push(
      "./src/pages/legal/**/*.{ts,tsx}",
      "./src/components/landing/LegalPageLayout.tsx",
    );
  }
  if (route.path === "/cadastro") {
    files.push(
      "./src/components/landing/CadastroContratacaoForm.tsx",
      "./src/components/empresa/PlanosAssinaturaGrid.tsx",
    );
  }
  if (route.path === "/blog" || route.path.startsWith("/blog/")) {
    files.push(
      "./src/components/marketing/BlogPostView.tsx",
      "./src/components/marketing/BlogArticleBody.tsx",
      "./src/components/marketing/**/*.{ts,tsx}",
    );
  }
  return [...new Set(files)];
}

const fontPreload = `    <link
      rel="preload"
      href="/fonts/plus-jakarta-sans-latin-wght-normal.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />`;

const htmlTemplate = (entryId) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Permissions-Policy" content="geolocation=*" />
${fontPreload}
    <title>SegPonto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/entries/public/${entryId}.tsx"></script>
  </body>
</html>
`;

for (const route of ALL_PUBLIC_ENTRIES) {
  const pageImport = `@/${route.pageModule.replace(/\.tsx?$/, "")}`;

  fs.writeFileSync(
    path.join(entriesDir, `${route.id}.tsx`),
    `import "@/styles/routes/${route.id}.css";
import Page from "${pageImport}";
import { hydratePublicPage } from "@/mpa/hydrate-public-page";

hydratePublicPage({
  Page,
  path: ${JSON.stringify(route.path)},
  shell: ${JSON.stringify(route.shell)},
});
`,
  );

  const content = contentFor(route);
  fs.writeFileSync(
    path.join(twDir, `${route.id}.ts`),
    `import type { Config } from "tailwindcss";
import baseConfig from "../tailwind.config";

export default {
  presets: [baseConfig],
  content: [
${content.map((c) => `    ${JSON.stringify(c)},`).join("\n")}
  ],
} satisfies Config;
`,
  );

  fs.writeFileSync(
    path.join(stylesDir, `${route.id}.css`),
    `/* CSS somente da rota ${route.path} */
@import "../fonts-marketing.css";
@import "../marketing-tokens.css";
@config "../../../tailwind.routes/${route.id}.ts";

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
  h1, h2, h3, h4 {
    font-family: "Plus Jakarta Sans Variable", system-ui, sans-serif;
  }
}
`,
  );

  fs.writeFileSync(path.join(htmlDir, `${route.id}.html`), htmlTemplate(route.id));
}

const homeHtml = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Permissions-Policy" content="geolocation=*" />
    <!-- LCP: uma fonte, preload do latin (URL estável em /fonts). -->
    <link
      rel="preload"
      href="/fonts/plus-jakarta-sans-latin-wght-normal.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <title>SegPonto | Registro de ponto digital e gestão de RH</title>
    <meta name="description" content="Controle o ponto dos seus funcionários com segurança jurídica e geolocalização. SegPonto é o SaaS para PMEs reduzirem riscos trabalhistas e fiscalizações." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/entries/public/home.tsx"></script>
  </body>
</html>
`;
fs.writeFileSync(path.join(root, "index.html"), homeHtml);

const byPath = Object.fromEntries(ALL_PUBLIC_ENTRIES.map((r) => [r.path, r.id]));
fs.writeFileSync(
  path.join(root, "src/mpa/route-id-manifest.json"),
  JSON.stringify({ byPath, entries: ALL_PUBLIC_ENTRIES }, null, 2) + "\n",
);

fs.writeFileSync(
  path.join(root, "src/mpa/public-routes.generated.ts"),
  `/* GERADO por scripts/generate-mpa-entries.mjs — não editar */
export type PublicRouteShell = "plain" | "auth";
export type PublicRouteDef = {
  id: string;
  path: string;
  pageModule: string;
  shell: PublicRouteShell;
};
export const ALL_PUBLIC_ENTRIES = ${JSON.stringify(ALL_PUBLIC_ENTRIES, null, 2)} as const satisfies readonly PublicRouteDef[];
export const PUBLIC_ROUTES = ALL_PUBLIC_ENTRIES;
export function findPublicRouteByPath(pathname: string) {
  return ALL_PUBLIC_ENTRIES.find((r) => r.path === pathname);
}
`,
);

console.log(`MPA: ${ALL_PUBLIC_ENTRIES.length} entries geradas.`);
