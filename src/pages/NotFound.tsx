import { PageSeo } from "@/components/seo/PageSeo";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

const NotFound = () => (
  <>
    <PageSeo {...PUBLIC_PAGE_SEO.notFound} />
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <main id="conteudo-principal" tabIndex={-1} className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Página não encontrada</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Voltar ao início
        </a>
      </main>
    </div>
  </>
);

export default NotFound;
