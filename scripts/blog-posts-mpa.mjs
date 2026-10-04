/**
 * Descobre rotas MPA dos posts já existentes.
 * Não gera página, catálogo nem JSON-LD — tudo isso é arquivo na mão.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const postsDir = path.join(root, "src/content/blog/posts");
const pagesDir = path.join(root, "src/pages/marketing/blog-posts");

/** Lê slug de cada post em posts/ e exige a Page correspondente. */
export function blogPostRoutesFromDisk() {
  const routes = [];
  for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith(".ts"))) {
    const src = fs.readFileSync(path.join(postsDir, file), "utf8");
    const slug = src.match(/slug:\s*"([^"]+)"/)?.[1];
    if (!slug) {
      throw new Error(`Post sem slug: ${file}`);
    }
    const pageFile = `${slug}Page.tsx`;
    const pagePath = path.join(pagesDir, pageFile);
    if (!fs.existsSync(pagePath)) {
      throw new Error(
        `Falta a página MPA do post "${slug}". Crie src/pages/marketing/blog-posts/${pageFile} (importe 1 post + 1 jsonld + BlogPostView).`,
      );
    }
    routes.push({
      id: `blog--${slug}`,
      path: `/blog/${slug}`,
      pageModule: `pages/marketing/blog-posts/${pageFile}`,
      shell: "plain",
    });
  }
  return routes.sort((a, b) => a.path.localeCompare(b.path));
}
