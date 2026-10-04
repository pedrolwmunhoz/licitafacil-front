import { defineConfig, type Plugin, type Connect } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { SITEMAP_DYNAMIC_ROUTES } from "./src/content/public-page-seo";
import { BLOG_POST_SLUGS } from "./src/content/blog/post-slugs";
import { ALL_PUBLIC_ENTRIES, findPublicRouteByPath } from "./scripts/public-routes-data.mjs";

// Gera entries/HTML/CSS por rota antes de resolver o config.
execSync("node scripts/generate-mpa-entries.mjs", {
  cwd: path.resolve(__dirname),
  stdio: "inherit",
});

const apiDevProxy = {
  "/api": {
    target: "http://127.0.0.1:8082",
    changeOrigin: true,
  },
};

function publicHtmlForPath(pathname: string): string | null {
  if (/^\/(empresa|funcionario)(\/|$)/.test(pathname)) return "/app.html";
  const route = findPublicRouteByPath(pathname);
  if (!route) return null;
  if (route.id === "home") return "/index.html";
  return `/mpa-html/${route.id}.html`;
}

/** Dev/preview: cada path público serve o HTML entry daquela rota. */
function perRouteHtmlFallback(): Plugin {
  const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
    const url = req.url?.split("?")[0] ?? "";
    if (url.includes(".") && !url.endsWith(".html")) return next();
    const target = publicHtmlForPath(url);
    if (target) req.url = target;
    next();
  };
  return {
    name: "per-route-html-fallback",
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

function extractViteAssetTags(html: string): string {
  const tags: string[] = [];
  const re =
    /<link[^>]+href="\/assets\/[^"]+"[^>]*>|<script[^>]+type="module"[^>]*src="\/assets\/[^"]+"[^>]*><\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    // Nunca reaproveitar CSS do entry de prerender (monólito antigo).
    if (/prerenderEntry[^"]*\.css/.test(m[0])) continue;
    tags.push(m[0]);
  }
  return tags.join("\n    ");
}

function stripViteAssetTags(html: string): string {
  return html
    .replace(/<link[^>]+href="\/assets\/[^"]+"[^>]*>\s*/g, "")
    .replace(/<script[^>]+type="module"[^>]*src="\/assets\/[^"]+"[^>]*><\/script>\s*/g, "");
}

/**
 * Prerender clona assets do index (home) em todas as pastas.
 * Troca CSS/JS de cada HTML prerenderizado pelos assets do entry daquela rota.
 */
function stitchPerRouteAssets(): Plugin {
  return {
    name: "stitch-per-route-assets",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const donorForId = (id: string) => {
        if (id === "home") return path.join(dist, "index.html");
        return path.join(dist, "mpa-html", `${id}.html`);
      };

      const donors = new Map<string, string>();
      for (const route of ALL_PUBLIC_ENTRIES) {
        const donorPath = donorForId(route.id);
        if (!fs.existsSync(donorPath)) continue;
        donors.set(route.id, extractViteAssetTags(fs.readFileSync(donorPath, "utf8")));
      }

      const apply = (htmlPath: string, routeId: string) => {
        const assets = donors.get(routeId);
        if (!assets || !fs.existsSync(htmlPath)) return;
        let html = fs.readFileSync(htmlPath, "utf8");
        html = stripViteAssetTags(html);
        if (!html.includes("</head>")) return;
        html = html.replace("</head>", `    ${assets}\n  </head>`);
        fs.writeFileSync(htmlPath, html);
      };

      // Home já nasce do index entry; só garante stitch (idempotente).
      apply(path.join(dist, "index.html"), "home");

      for (const route of ALL_PUBLIC_ENTRIES) {
        if (route.id === "home") continue;
        const clean = route.path.replace(/^\//, "");
        const outPath = path.join(dist, clean, "index.html");
        // noindex (ex.: /cadastro) pode não ter sido prerenderizado — materializa a partir do donor MPA.
        if (!fs.existsSync(outPath)) {
          const donorPath = donorForId(route.id);
          if (!fs.existsSync(donorPath)) continue;
          fs.mkdirSync(path.dirname(outPath), { recursive: true });
          fs.copyFileSync(donorPath, outPath);
        }
        apply(outPath, route.id);
      }

      // app.html: só CSS/JS do app
      const appHtmlPath = path.join(dist, "app.html");
      if (fs.existsSync(appHtmlPath)) {
        let html = fs.readFileSync(appHtmlPath, "utf8");
        html = html.replace(/<link[^>]+href="\/assets\/(?!app-)[^"]+\.css"[^>]*>\s*/g, "");
        fs.writeFileSync(appHtmlPath, html);
      }
    },
  };
}

const SITE = "https://segponto.com";

type Changefreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface SitemapOptions {
  routes: string[];
  priority: Record<string, number>;
  changefreq: Record<string, Changefreq>;
  disallow: string[];
}

/** Rotas fora dos mapas de prioridade/frequência (posts do blog, segmentos…). */
const SITEMAP_PADRAO = { priority: 1, changefreq: "daily" as Changefreq };

function blogCapaDoPath(route: string): string | null {
  const slug = route.startsWith("/blog/") ? route.slice("/blog/".length) : null;
  return slug && (BLOG_POST_SLUGS as readonly string[]).includes(slug) ? `${SITE}/blog/img/${slug}.jpg` : null;
}

/** sitemap.xml (com a capa de cada post em <image:image>) e robots.txt, gravados de forma síncrona em dist/. */
function sitemapPlugin({ routes, priority, changefreq, disallow }: SitemapOptions): Plugin {
  return {
    name: "segponto-sitemap",
    apply: "build",
    transformIndexHtml() {
      return [{ tag: "link", injectTo: "head", attrs: { rel: "sitemap", type: "application/xml", title: "Sitemap", href: "/sitemap.xml" } }];
    },
    closeBundle: {
      sequential: true,
      order: "post",
      handler() {
        const dist = path.resolve(__dirname, "dist");
        const lastmod = new Date().toISOString();
        const capasNoSitemap = new Set<string>();
        const urls = routes.map((route) => {
          const capa = blogCapaDoPath(route);
          if (capa) capasNoSitemap.add(route);
          return [
            `<url><loc>${new URL(route, SITE).href}</loc>`,
            `<lastmod>${lastmod}</lastmod>`,
            `<changefreq>${changefreq[route] ?? SITEMAP_PADRAO.changefreq}</changefreq>`,
            `<priority>${(priority[route] ?? SITEMAP_PADRAO.priority).toFixed(1)}</priority>`,
            capa ? `<image:image><image:loc>${capa}</image:loc></image:image>` : "",
            "</url>",
          ].join("");
        });
        const faltando = BLOG_POST_SLUGS.filter((slug) => !capasNoSitemap.has(`/blog/${slug}`));
        if (faltando.length) throw new Error(`Posts fora do sitemap: ${faltando.join(", ")}`);

        fs.mkdirSync(dist, { recursive: true });
        fs.writeFileSync(
          path.join(dist, "sitemap.xml"),
          '<?xml version="1.0" encoding="UTF-8"?>' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' +
            urls.join("") +
            "</urlset>",
        );
        fs.writeFileSync(
          path.join(dist, "robots.txt"),
          ["User-agent: *", "Allow: /", ...disallow.map((p) => `Disallow: ${p}`), "", `Sitemap: ${SITE}/sitemap.xml`].join("\n"),
        );
      },
    },
  };
}

const mpaInputs: Record<string, string> = {};
for (const route of ALL_PUBLIC_ENTRIES) {
  if (route.id === "home") continue;
  mpaInputs[route.id] = path.resolve(__dirname, "mpa-html", `${route.id}.html`);
}

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: apiDevProxy,
    hmr: { overlay: false },
  },
  preview: {
    proxy: apiDevProxy,
  },
  plugins: [
    perRouteHtmlFallback(),
    sitemapPlugin({
      routes: ["/", ...SITEMAP_DYNAMIC_ROUTES],
      priority: {
        "/": 1,
        "/login": 0.7,
        "/recuperar-senha": 0.5,
        "/sobre": 0.4,
        "/privacidade": 0.4,
        "/termos": 0.4,
        "/exclusao-conta": 0.4,
        "/precos": 0.8,
        "/perguntas-frequentes": 0.65,
        "/documentacao": 0.65,
        "/blog": 0.6,
        "/calculadoras": 0.65,
        "/calculadoras/hora-extra": 0.65,
        "/calculadoras/horas-noturnas": 0.65,
        "/calculadoras/ferias": 0.65,
        "/calculadoras/folha-de-pagamento": 0.65,
      },
      changefreq: {
        "/": "weekly",
        "/login": "monthly",
        "/recuperar-senha": "monthly",
        "/sobre": "monthly",
        "/privacidade": "monthly",
        "/termos": "monthly",
        "/exclusao-conta": "monthly",
        "/precos": "weekly",
        "/perguntas-frequentes": "monthly",
        "/documentacao": "monthly",
        "/blog": "weekly",
        "/calculadoras": "weekly",
        "/calculadoras/hora-extra": "monthly",
        "/calculadoras/horas-noturnas": "monthly",
        "/calculadoras/ferias": "monthly",
        "/calculadoras/folha-de-pagamento": "monthly",
      },
      // .md = espelho para LLMs (llms.txt); não indexar / não listar no sitemap
      disallow: ["/empresa", "/funcionario", "/*.md$"],
    }),
    react(),
    viteCompression({ algorithm: "gzip", ext: ".gz", threshold: 1024 }),
    viteCompression({ algorithm: "brotliCompress", ext: ".br", threshold: 1024 }),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: path.resolve(__dirname, "src/prerender.tsx"),
      // Só indexáveis — noindex (/cadastro etc.) vira HTML via stitchPerRouteAssets (cópia MPA).
      additionalPrerenderRoutes: ["/", "/404", ...SITEMAP_DYNAMIC_ROUTES],
    }),
    stitchPerRouteAssets(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        app: path.resolve(__dirname, "app.html"),
        ...mpaInputs,
      },
      output: {
        manualChunks(id) {
          // Só isola React. NÃO juntar todo node_modules num vendor:
          // isso misturava jspdf/html2canvas do painel na home.
          if (
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react/") ||
            id.includes("node_modules/scheduler") ||
            id.includes("node_modules/react-router")
          ) {
            return "vendor-react";
          }
        },
      },
    },
  },
});
