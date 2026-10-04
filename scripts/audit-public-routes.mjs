#!/usr/bin/env node
/**
 * Auditoria de rotas públicas do SegPonto (SEO + redirects + checagens básicas).
 *
 * Uso:
 *   node scripts/audit-public-routes.mjs
 *   node scripts/audit-public-routes.mjs --origin https://segponto.com
 *   node scripts/audit-public-routes.mjs --psi          # PageSpeed Insights (precisa de GOOGLE_PSI_API_KEY)
 *   node scripts/audit-public-routes.mjs --psi --strategy mobile
 *   node scripts/audit-public-routes.mjs --json report.json
 *
 * O script valida o site inteiro (sitemap), não só a home — e reproduz o
 * padrão "Página com redirecionamento" do Search Console.
 */

import { writeFileSync } from "node:fs";
import { parseArgs } from "node:util";

const { values: args } = parseArgs({
  options: {
    origin: { type: "string", default: "https://segponto.com" },
    psi: { type: "boolean", default: false },
    strategy: { type: "string", default: "mobile" },
    json: { type: "string" },
    "max-psi": { type: "string", default: "0" }, // 0 = todas as URLs canônicas
    help: { type: "boolean", default: false },
  },
});

if (args.help) {
  console.log(`audit-public-routes.mjs — auditoria de rotas públicas SegPonto

Opções:
  --origin URL     Origem canônica (default: https://segponto.com)
  --psi            Rodar PageSpeed Insights em cada URL canônica
  --strategy       mobile|desktop (default: mobile)
  --max-psi N      Limitar quantas URLs vão ao PSI (0 = todas)
  --json FILE      Salvar relatório JSON
`);
  process.exit(0);
}

const ORIGIN = args.origin.replace(/\/$/, "");
const APEX_HOST = new URL(ORIGIN).host;
const PSI_KEY = process.env.GOOGLE_PSI_API_KEY || process.env.PSI_API_KEY || "";

/** URLs públicas fora do sitemap (ex.: signup noindex) que ainda devem responder 200. */
const EXTRA_PATHS = ["/cadastro"];

const SEVERITY = { error: "ERROR", warn: "WARN", info: "INFO" };

function stripTrailingSlash(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

async function fetchSitemapPaths(origin) {
  const res = await fetch(`${origin}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml HTTP ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
  const paths = [];
  for (const loc of locs) {
    try {
      const u = new URL(loc);
      if (u.host === APEX_HOST || u.host === `www.${APEX_HOST}`) {
        paths.push(u.pathname === "/" ? "/" : stripTrailingSlash(u.pathname));
      }
    } catch {
      /* ignore */
    }
  }
  return [...new Set(paths)].sort((a, b) => a.localeCompare(b));
}

/**
 * Segue redirects manualmente (sem auto-upgrade HSTS do curl -L).
 * Detecta downgrade https→http e cadeias longas.
 */
async function probeUrl(url, { maxRedirects = 8, retries429 = 3 } = {}) {
  const chain = [];
  let current = url;
  for (let i = 0; i <= maxRedirects; i++) {
    let res;
    let attempt = 0;
    for (;;) {
      try {
        res = await fetch(current, {
          method: "GET",
          redirect: "manual",
          headers: {
            "User-Agent":
              "SegPontoRouteAudit/1.0 (+https://segponto.com; SEO redirect audit)",
            Accept: "text/html,application/xhtml+xml",
          },
        });
      } catch (err) {
        return {
          ok: false,
          finalUrl: current,
          status: 0,
          chain,
          error: String(err?.message || err),
          html: null,
        };
      }
      if (res.status !== 429 || attempt >= retries429) break;
      attempt += 1;
      await sleep(800 * attempt);
    }

    const location = res.headers.get("location");
    chain.push({
      url: current,
      status: res.status,
      location: location || undefined,
    });

    if (res.status >= 300 && res.status < 400 && location) {
      current = new URL(location, current).href;
      await sleep(120);
      continue;
    }

    const contentType = res.headers.get("content-type") || "";
    const html = contentType.includes("text/html") ? await res.text() : null;
    return {
      ok: res.status >= 200 && res.status < 300,
      finalUrl: current,
      status: res.status,
      chain,
      error: null,
      html,
      contentType,
    };
  }
  return {
    ok: false,
    finalUrl: current,
    status: chain.at(-1)?.status ?? 0,
    chain,
    error: "max redirects exceeded",
    html: null,
  };
}

function analyzeChain(chain, expectedCanonicalHref) {
  const issues = [];
  for (let i = 0; i < chain.length; i++) {
    const step = chain[i];
    if (step.location) {
      try {
        const from = new URL(step.url);
        const to = new URL(step.location, step.url);
        if (from.protocol === "https:" && to.protocol === "http:") {
          issues.push({
            severity: SEVERITY.error,
            code: "HTTPS_TO_HTTP",
            message: `Redirect downgrade HTTPS→HTTP: ${step.url} → ${to.href}`,
          });
        }
        if (to.host.startsWith("www.") && expectedCanonicalHref) {
          const expectedHost = new URL(expectedCanonicalHref).host;
          if (to.host !== expectedHost && i === 0) {
            /* www→apex is ok if apex is canonical */
          }
        }
      } catch {
        issues.push({
          severity: SEVERITY.error,
          code: "BAD_LOCATION",
          message: `Location inválida: ${step.location}`,
        });
      }
    }
  }
  if (chain.length > 1) {
    issues.push({
      severity: SEVERITY.warn,
      code: "HAS_REDIRECT",
      message: `Cadeia com ${chain.length - 1} redirect(s) — Google classifica como "Página com redirecionamento" se esta URL estiver no sitemap/indexação.`,
    });
  }
  if (chain.length > 3) {
    issues.push({
      severity: SEVERITY.error,
      code: "LONG_CHAIN",
      message: `Cadeia longa (${chain.length} hops)`,
    });
  }
  return issues;
}

function extractSeo(html) {
  if (!html) return null;
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || null;
  const robots =
    html.match(
      /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    )?.[1] ||
    html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["'][^>]*>/i,
    )?.[1] ||
    null;
  const canonicals = [
    ...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi),
  ].map((m) => {
    const tag = m[0];
    return tag.match(/href=["']([^"']+)["']/i)?.[1] || null;
  }).filter(Boolean);
  const description =
    html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i,
    )?.[1] ||
    html.match(
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i,
    )?.[1] ||
    null;
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() || null;
  return { title, robots, canonicals, description, h1 };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runPsi(url, strategy) {
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", strategy);
  for (const cat of ["performance", "accessibility", "best-practices", "seo"]) {
    endpoint.searchParams.append("category", cat);
  }
  if (PSI_KEY) endpoint.searchParams.set("key", PSI_KEY);

  const res = await fetch(endpoint);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PSI HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const cats = data.lighthouseResult?.categories || {};
  const audits = data.lighthouseResult?.audits || {};
  return {
    performance: Math.round((cats.performance?.score ?? 0) * 100),
    accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
    bestPractices: Math.round((cats["best-practices"]?.score ?? 0) * 100),
    seo: Math.round((cats.seo?.score ?? 0) * 100),
    fcp: audits["first-contentful-paint"]?.displayValue,
    lcp: audits["largest-contentful-paint"]?.displayValue,
    tbt: audits["total-blocking-time"]?.displayValue,
    cls: audits["cumulative-layout-shift"]?.displayValue,
  };
}

function variantUrls(path) {
  const bare = path === "/" ? "/" : stripTrailingSlash(path);
  const withSlash = bare === "/" ? "/" : `${bare}/`;
  const urls = {
    canonicalHttps: `${ORIGIN}${bare === "/" ? "/" : bare}`,
    trailingHttps: bare === "/" ? null : `${ORIGIN}${withSlash}`,
    httpBare: `http://${APEX_HOST}${bare === "/" ? "/" : bare}`,
    httpSlash: bare === "/" ? `http://${APEX_HOST}/` : `http://${APEX_HOST}${withSlash}`,
    wwwHttps: `https://www.${APEX_HOST}${bare === "/" ? "/" : bare}`,
  };
  return urls;
}

function dedupeFindings(findings) {
  const seen = new Set();
  return findings.filter((f) => {
    const key = `${f.severity}|${f.code}|${f.variant || ""}|${f.message}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function auditPath(path) {
  const expectedCanonical = `${ORIGIN}${path === "/" ? "/" : path}`;
  const variants = variantUrls(path);
  const findings = [];
  const probes = {};

  for (const [name, url] of Object.entries(variants)) {
    if (!url) continue;
    await sleep(250);
    const probe = await probeUrl(url);
    probes[name] = {
      url,
      status: probe.status,
      finalUrl: probe.finalUrl,
      chain: probe.chain,
      error: probe.error,
    };
    findings.push(...analyzeChain(probe.chain, expectedCanonical).map((f) => ({ ...f, variant: name })));

    if (name === "canonicalHttps") {
      if (probe.status === 429) {
        findings.push({
          severity: SEVERITY.warn,
          code: "RATE_LIMITED",
          variant: name,
          message: "HTTP 429 — rode de novo com mais intervalo; resultado desta URL incompleto.",
        });
      } else if (!probe.ok) {
        findings.push({
          severity: SEVERITY.error,
          code: "CANONICAL_NOT_200",
          variant: name,
          message: `URL canônica (sitemap) não retorna 200: HTTP ${probe.status} → ${probe.finalUrl}`,
        });
      } else if (path !== "/") {
        const finalNorm = stripTrailingSlash(new URL(probe.finalUrl).pathname);
        if (finalNorm !== stripTrailingSlash(path)) {
          findings.push({
            severity: SEVERITY.error,
            code: "CANONICAL_DRIFT",
            variant: name,
            message: `Canônica terminou em outra rota: ${probe.finalUrl}`,
          });
        }
      }

      const seo = extractSeo(probe.html);
      probes[name].seo = seo;
      if (seo) {
        if (!seo.title) {
          findings.push({
            severity: SEVERITY.error,
            code: "NO_TITLE",
            variant: name,
            message: "Sem <title>",
          });
        }
        if (!seo.description) {
          findings.push({
            severity: SEVERITY.warn,
            code: "NO_DESCRIPTION",
            variant: name,
            message: "Sem meta description",
          });
        }
        if (seo.canonicals.length === 0) {
          findings.push({
            severity: SEVERITY.error,
            code: "NO_CANONICAL",
            variant: name,
            message: "Sem link rel=canonical",
          });
        } else {
          const unique = [...new Set(seo.canonicals)];
          if (unique.length > 1) {
            findings.push({
              severity: SEVERITY.error,
              code: "MULTI_CANONICAL",
              variant: name,
              message: `Múltiplos canonicals conflitantes: ${unique.join(" | ")}`,
            });
          } else if (seo.canonicals.length > 1) {
            findings.push({
              severity: SEVERITY.warn,
              code: "DUP_CANONICAL_TAG",
              variant: name,
              message: `Canonical duplicado no HTML (${seo.canonicals.length} tags iguais)`,
            });
          }
          const primaryCanon = unique.at(-1);
          if (primaryCanon) {
            const canonPath = stripTrailingSlash(new URL(primaryCanon, ORIGIN).pathname);
            if (path === "/") {
              if (primaryCanon.replace(/\/$/, "") !== ORIGIN) {
                findings.push({
                  severity: SEVERITY.warn,
                  code: "CANONICAL_MISMATCH",
                  variant: name,
                  message: `Home canonical inesperado: ${primaryCanon}`,
                });
              }
            } else if (canonPath !== stripTrailingSlash(path)) {
              findings.push({
                severity: SEVERITY.warn,
                code: "CANONICAL_MISMATCH",
                variant: name,
                message: `Canonical aponta para ${primaryCanon}, esperado ${expectedCanonical}`,
              });
            }
          }
        }
      }
    }
  }

  const canonProbe = probes.canonicalHttps;
  if (canonProbe?.status !== 429 && (canonProbe?.chain?.length || 0) > 1) {
    findings.push({
      severity: SEVERITY.error,
      code: "SITEMAP_URL_REDIRECTS",
      variant: "canonicalHttps",
      message:
        "URL listada no sitemap redireciona — Search Console → \"Página com redirecionamento\" (não indexa).",
    });
  }

  return { path, expectedCanonical, probes, findings: dedupeFindings(findings) };
}

async function auditExtra(pathOrUrl) {
  // Tratar como rota canônica (ex.: /cadastro noindex fora do sitemap).
  if (pathOrUrl.startsWith("/") && !pathOrUrl.includes("?")) {
    return auditPath(pathOrUrl);
  }
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${ORIGIN}${pathOrUrl}`;
  const probe = await probeUrl(url);
  const findings = analyzeChain(probe.chain, ORIGIN + "/");
  return {
    path: pathOrUrl,
    expectedCanonical: null,
    probes: { entry: { url, status: probe.status, finalUrl: probe.finalUrl, chain: probe.chain, error: probe.error } },
    findings: dedupeFindings(findings),
  };
}

function printReport(results, psiResults) {
  const errors = results.flatMap((r) => r.findings.filter((f) => f.severity === SEVERITY.error));
  const warns = results.flatMap((r) => r.findings.filter((f) => f.severity === SEVERITY.warn));

  console.log("\n========== AUDITORIA SEGPOINTO ==========");
  console.log(`Origem: ${ORIGIN}`);
  console.log(`Rotas: ${results.length}`);
  console.log(`Erros: ${errors.length} | Avisos: ${warns.length}`);
  console.log("=========================================\n");

  for (const r of results) {
    const errs = r.findings.filter((f) => f.severity === SEVERITY.error);
    const ws = r.findings.filter((f) => f.severity === SEVERITY.warn);
    const mark = errs.length ? "✗" : ws.length ? "!" : "✓";
    const canon = r.probes.canonicalHttps || r.probes.entry;
    const chainStr = (canon?.chain || [])
      .map((s) => `${s.status}${s.location ? "→" : ""}`)
      .join(" ");
    console.log(`${mark} ${r.path || r.expectedCanonical}`);
    if (canon) {
      console.log(`    status=${canon.status} final=${canon.finalUrl || ""} chain=[${chainStr}]`);
    }
    for (const f of [...errs, ...ws]) {
      console.log(`    ${f.severity} ${f.code}: ${f.message}`);
    }
    if (psiResults?.[r.path]) {
      const p = psiResults[r.path];
      console.log(
        `    PSI(${args.strategy}): perf=${p.performance} a11y=${p.accessibility} bp=${p.bestPractices} seo=${p.seo} | FCP=${p.fcp} LCP=${p.lcp} TBT=${p.tbt} CLS=${p.cls}`,
      );
    }
  }

  console.log("\n----- RESUMO DO PROBLEMA GSC -----");
  console.log(
    "Se a URL canônica (sem barra) 301 para http://…/com-barra, o Google NÃO indexa a URL do sitemap.",
  );
  console.log(
    "Correção: nginx servir $uri/index.html sem redirect de diretório, e Location sempre em HTTPS.",
  );
  console.log("----------------------------------\n");

  return { errorCount: errors.length, warnCount: warns.length };
}

async function main() {
  console.log(`Carregando sitemap de ${ORIGIN}/sitemap.xml …`);
  const paths = await fetchSitemapPaths(ORIGIN);
  console.log(`Sitemap: ${paths.length} URLs. Extras GSC: ${EXTRA_PATHS.join(", ")}`);

  const results = [];
  for (const path of paths) {
    process.stdout.write(`  audit ${path} …\r`);
    results.push(await auditPath(path));
  }
  for (const extra of EXTRA_PATHS) {
    process.stdout.write(`  audit ${extra} …\r`);
    results.push(await auditExtra(extra));
  }
  process.stdout.write(" ".repeat(40) + "\r");

  const psiResults = {};
  if (args.psi) {
    if (!PSI_KEY) {
      console.warn(
        "\nAviso: GOOGLE_PSI_API_KEY não definida — a API pública tem cota baixa; pode falhar.\n",
      );
    }
    const maxPsi = Number(args["max-psi"]) || 0;
    const psiPaths = paths.filter((p) => !EXTRA_PATHS.includes(p));
    const list = maxPsi > 0 ? psiPaths.slice(0, maxPsi) : psiPaths;
    console.log(`\nPageSpeed Insights (${args.strategy}) em ${list.length} URLs…`);
    for (const path of list) {
      const url = `${ORIGIN}${path === "/" ? "/" : path}`;
      process.stdout.write(`  PSI ${path} …\r`);
      try {
        psiResults[path] = await runPsi(url, args.strategy);
      } catch (err) {
        psiResults[path] = { error: String(err?.message || err) };
        console.warn(`\n  PSI falhou em ${path}: ${err.message}`);
      }
      await sleep(1500); // evita rate limit
    }
    process.stdout.write(" ".repeat(40) + "\r");
  }

  const summary = printReport(results, psiResults);

  if (args.json) {
    writeFileSync(
      args.json,
      JSON.stringify({ origin: ORIGIN, generatedAt: new Date().toISOString(), results, psiResults, summary }, null, 2),
    );
    console.log(`JSON salvo em ${args.json}`);
  }

  process.exit(summary.errorCount > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
