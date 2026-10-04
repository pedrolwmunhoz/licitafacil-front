import { describe, expect, it } from "vitest";
import { BLOG_POST_SLUGS } from "@/content/blog/post-slugs";
import type { BlogPost } from "@/content/blog/types";

const POSTS = Object.values(
  import.meta.glob<Record<string, BlogPost>>("./posts/*.ts", { eager: true }),
).flatMap((modulo) => Object.values(modulo));

describe("posts do blog", () => {
  it("todo slug publicado tem arquivo de post", () => {
    expect(POSTS.map((p) => p.slug).sort()).toEqual([...BLOG_POST_SLUGS].sort());
  });

  describe.each(POSTS.map((p) => [p.slug, p] as const))("%s", (_slug, post) => {
    it("sumário aponta para H2 existentes, na ordem do texto, sem repetir", () => {
      const titulos = post.sections.map((s) => s.title);
      const posicoes = post.sumario.map((item) => titulos.indexOf(item.secao));
      expect(posicoes).not.toContain(-1);
      expect(posicoes).toEqual([...new Set(posicoes)].sort((a, b) => a - b));
    });

    it("sumário enxuto", () => {
      expect(post.sumario.length).toBeGreaterThanOrEqual(5);
      expect(post.sumario.length).toBeLessThanOrEqual(8);
    });

    it("tem título do CTA", () => {
      expect(post.ctaTitulo.trim().length).toBeGreaterThan(0);
    });
  });
});
