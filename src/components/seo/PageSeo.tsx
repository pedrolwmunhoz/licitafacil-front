import { Helmet } from "react-helmet-async";
import type { PublicPageSeoConfig } from "@/content/public-page-seo";
import { publicPageCanonicalUrl, SEO_OG_IMAGE } from "@/content/public-page-seo";

export type PageSeoImagem = { url: string; tipo: string; largura: number; altura: number };

const IMAGEM_PADRAO: PageSeoImagem = { url: SEO_OG_IMAGE, tipo: "image/png", largura: 1200, altura: 630 };

type PageSeoProps = PublicPageSeoConfig & {
  /** og:image/twitter:image da página (ex.: capa do post); sem ela vai a imagem padrão do site. */
  imagem?: PageSeoImagem;
  ogType?: "website" | "article";
};

/**
 * Título, descrição, canonical, Open Graph, Twitter e robots por rota.
 */
export function PageSeo({ title, description, path, noindex, imagem = IMAGEM_PADRAO, ogType = "website" }: PageSeoProps) {
  const canonical = publicPageCanonicalUrl(path);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imagem.url} />
      <meta property="og:image:type" content={imagem.tipo} />
      <meta property="og:image:width" content={String(imagem.largura)} />
      <meta property="og:image:height" content={String(imagem.altura)} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imagem.url} />
    </Helmet>
  );
}
