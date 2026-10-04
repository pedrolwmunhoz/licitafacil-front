import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { PageSeo } from "@/components/seo/PageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { SEGMENTOS_LINKS } from "@/content/segmentos-links";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import { jsonLd } from "@/content/jsonld/segmentos";

const linkClass =
  "text-sm text-landing-muted hover:text-landing-ink transition-colors leading-snug underline-offset-4 hover:underline";

/** Hub de landings por segmento — crawl path home → /segmentos → nichos. */
export default function SegmentosPage() {
  const seo = PUBLIC_PAGE_SEO.segmentos;

  return (
    <div className="min-h-screen bg-landing-canvas text-landing-ink antialiased">
      <PageSeo {...seo} />
      <JsonLdScript routeKey={seo.path} graph={jsonLd} />
      <Navbar />
      <main id="conteudo-principal" tabIndex={-1} className="pt-24 pb-16 md:pt-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <LandingSectionHeader
            title="Segmentos"
            subtitle="Ponto eletrônico por nicho — escolha o segmento da sua empresa."
            align="left"
            compact
          />

          <nav className="mt-10 flex flex-col gap-2.5 max-w-md" aria-label="Segmentos">
            {SEGMENTOS_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
}
