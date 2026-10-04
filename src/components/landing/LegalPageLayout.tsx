import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { PageSeo } from "@/components/seo/PageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import type { PublicPageSeoConfig } from "@/content/public-page-seo";
import { CONTACT_EMAIL, LANDING_PROSE_LINK_CLASS } from "@/content/landing-site";

type LegalPageLayoutProps = {
  seo: PublicPageSeoConfig;
  /** Grafo JSON-LD exclusivo desta URL. */
  jsonLd: Record<string, unknown>;
  title: string;
  subtitle?: string;
  updatedAt?: string;
  /** Conteúdo full-bleed abaixo do artigo (ex.: CTA final da home). */
  afterContent?: React.ReactNode;
  children: React.ReactNode;
};

export function LegalPageLayout({
  seo,
  jsonLd,
  title,
  subtitle,
  updatedAt,
  afterContent,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-landing-canvas text-landing-ink antialiased">
      <PageSeo {...seo} />
      <JsonLdScript routeKey={seo.path} graph={jsonLd} />
      <Navbar />
      <main
        id="conteudo-principal"
        tabIndex={-1}
        className={afterContent ? "pt-24 md:pt-28" : "pt-24 pb-16 md:pt-28"}
      >
        <div className={`container mx-auto px-4 max-w-3xl${afterContent ? " pb-16" : ""}`}>
          <LandingSectionHeader title={title} subtitle={subtitle} align="left" compact />
          {updatedAt ? (
            <p className="text-xs text-landing-muted mb-8 -mt-2">Última atualização: {updatedAt}</p>
          ) : null}
          <article className="rounded-xl border border-landing-ink/10 bg-white px-6 py-8 md:px-10 md:py-10 shadow-sm space-y-8 text-[15px] leading-relaxed text-landing-muted legal-content">
            {children}
          </article>
          <p className="mt-8 text-sm text-landing-muted text-center">
            Dúvidas?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={LANDING_PROSE_LINK_CLASS}>
              {CONTACT_EMAIL}
            </a>
            {" · "}
            <Link to="/cadastro" className={LANDING_PROSE_LINK_CLASS}>
              Contratar
            </Link>
          </p>
        </div>
        {afterContent}
      </main>
      <Footer />
    </div>
  );
}
