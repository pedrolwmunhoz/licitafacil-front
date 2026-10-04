import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoEscolherSistemaDePontoEletronicoEm2026 as post } from "@/content/blog/posts/como-escolher-sistema-de-ponto-eletronico-em-2026";
import { jsonLd } from "@/content/jsonld/blog__como-escolher-um-sistema-de-ponto-eletronico-para-pequenas-empresas";

const como_escolher_um_sistema_de_ponto_eletronico_para_pequenas_empresasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_escolher_um_sistema_de_ponto_eletronico_para_pequenas_empresasPage;
