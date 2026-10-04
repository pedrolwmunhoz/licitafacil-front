import { BlogPostView } from "@/components/marketing/BlogPostView";
import { pontoComReconhecimentoFacialComoFuncionaEQuaisSaoAsRegras as post } from "@/content/blog/posts/ponto-com-reconhecimento-facial-como-funciona-e-quais-sao-as-regras";
import { jsonLd } from "@/content/jsonld/blog__ponto-com-reconhecimento-facial-como-funciona-e-quais-sao-as-regras";

const ponto_com_reconhecimento_facial_como_funciona_e_quais_sao_as_regrasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default ponto_com_reconhecimento_facial_como_funciona_e_quais_sao_as_regrasPage;
