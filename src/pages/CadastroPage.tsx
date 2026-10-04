import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CadastroContratacaoForm } from "@/components/landing/CadastroContratacaoForm";
import { PageSeo } from "@/components/seo/PageSeo";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import { parseTipoAssinaturaId } from "@/constants/tipoAssinatura";

const CadastroPage = () => {
  const [searchParams] = useSearchParams();
  const initialPlanoId = useMemo(
    () => parseTipoAssinaturaId(searchParams.get("plano")) ?? undefined,
    [searchParams],
  );

  return (
    <div className="min-h-screen bg-landing-canvas text-landing-ink antialiased">
      <PageSeo {...PUBLIC_PAGE_SEO.cadastro} />
      <Navbar />
      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="container mx-auto max-w-6xl px-4 pb-16 pt-24 md:pb-20 md:pt-28"
      >
        <CadastroContratacaoForm initialPlanoId={initialPlanoId} />
      </main>
      <Footer />
    </div>
  );
};

export default CadastroPage;
