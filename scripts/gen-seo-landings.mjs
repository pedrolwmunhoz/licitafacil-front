#!/usr/bin/env node
/**
 * Gera landings SEO a partir de defs compactas.
 * Uso: node scripts/gen-seo-landings.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const contentDir = path.join(root, "src/content/seo-landings");
const pagesDir = path.join(root, "src/pages/marketing");

function toComponent(file) {
  return (
    file
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join("") + "Page"
  );
}

function toExport(file) {
  const parts = file.split("-");
  return (
    parts[0] +
    parts
      .slice(1)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join("") +
    "Content"
  );
}

function pageWrapper(componentName, file, exportName) {
  return `import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { ${exportName} } from "@/content/seo-landings/${file}";

const ${componentName} = () => <SeoLandingPageView content={${exportName}} />;

export default ${componentName};
`;
}

function renderLanding(d, exportName) {
  const icons = [
    ...new Set([...(d.cards || []).map((c) => c.icon), ...(d.steps || []).map((s) => s.icon)]),
  ];
  const iconImport = icons.length ? `import { ${icons.join(", ")} } from "lucide-react";\n` : "";
  const sections = d.sections
    .map((s) => {
      const bullets = s.bullets ? `,\n      bullets: ${JSON.stringify(s.bullets)}` : "";
      const subtitle = s.subtitle ? `,\n      subtitle: ${JSON.stringify(s.subtitle)}` : "";
      return `    {
      eyebrow: ${JSON.stringify(s.eyebrow || "")},
      title: ${JSON.stringify(s.title)}${subtitle},
      variant: ${JSON.stringify(s.variant || "white")},
      paragraphs: ${JSON.stringify(s.paragraphs)}${bullets},
    }`;
    })
    .join(",\n");

  const cards = d.cards
    ? `{
    eyebrow: "Na prática",
    title: ${JSON.stringify(d.cardsTitle || "O que você resolve")},
    items: [
${d.cards.map((c) => `      { icon: ${c.icon}, title: ${JSON.stringify(c.title)}, desc: ${JSON.stringify(c.desc)} },`).join("\n")}
    ],
  }`
    : "undefined";

  const steps = d.steps
    ? `{
    eyebrow: "Passo a passo",
    title: ${JSON.stringify(d.stepsTitle || "Como começar")},
    items: [
${d.steps.map((s) => `      { icon: ${s.icon}, title: ${JSON.stringify(s.title)}, desc: ${JSON.stringify(s.desc)} },`).join("\n")}
    ],
  }`
    : "undefined";

  const faqs = `{
    eyebrow: "FAQ",
    title: "Perguntas frequentes",
    items: [
${d.faqs.map((f) => `      { q: ${JSON.stringify(f.q)}, a: ${JSON.stringify(f.a)} },`).join("\n")}
    ],
  }`;

  const related = `[\n${d.related.map((r) => `    { label: ${JSON.stringify(r.label)}, to: ${JSON.stringify(r.to)} },`).join("\n")}\n  ]`;

  return `// intent: ${d.intent}
${iconImport}import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const ${exportName}: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.${d.seoKey},
  hero: {
    eyebrow: ${JSON.stringify(d.eyebrow)},
    titleBefore: ${JSON.stringify(d.titleBefore)},
    highlight: ${JSON.stringify(d.highlight)},
    subtitle: ${JSON.stringify(d.subtitle)},
  },
  sections: [
${sections}
  ],
  cards: ${cards},
  steps: ${steps},
  faqs: ${faqs},
  related: ${related},
};
`;
}

/** @type {any[]} */
const defs = JSON.parse(fs.readFileSync(path.join(__dirname, "seo-landing-defs.json"), "utf8"));

let n = 0;
for (const d of defs) {
  const exportName = d.exportName || toExport(d.file);
  const component = d.component || toComponent(d.file);
  fs.writeFileSync(path.join(contentDir, `${d.file}.ts`), renderLanding(d, exportName));
  if (!d.skipPage) {
    fs.writeFileSync(path.join(pagesDir, `${component}.tsx`), pageWrapper(component, d.file, exportName));
  }
  n++;
}
console.log(`Wrote ${n} landing contents (+ pages)`);
