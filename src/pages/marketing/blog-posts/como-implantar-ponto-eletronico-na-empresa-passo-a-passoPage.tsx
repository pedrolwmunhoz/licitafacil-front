import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoImplantarPontoEletronicoNaEmpresaPassoAPasso as post } from "@/content/blog/posts/como-implantar-ponto-eletronico-na-empresa-passo-a-passo";
import { jsonLd } from "@/content/jsonld/blog__como-implantar-ponto-eletronico-na-empresa-passo-a-passo";

const como_implantar_ponto_eletronico_na_empresa_passo_a_passoPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_implantar_ponto_eletronico_na_empresa_passo_a_passoPage;
