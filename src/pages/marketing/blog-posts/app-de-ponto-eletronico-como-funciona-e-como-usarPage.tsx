import { BlogPostView } from "@/components/marketing/BlogPostView";
import { appDePontoEletronicoComoFuncionaEComoUsar as post } from "@/content/blog/posts/app-de-ponto-eletronico-como-funciona-e-como-usar";
import { jsonLd } from "@/content/jsonld/blog__app-de-ponto-eletronico-como-funciona-e-como-usar";

const app_de_ponto_eletronico_como_funciona_e_como_usarPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default app_de_ponto_eletronico_como_funciona_e_como_usarPage;
