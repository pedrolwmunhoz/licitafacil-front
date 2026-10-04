import { BlogPostView } from "@/components/marketing/BlogPostView";
import { pontoEletronicoComBiometriaComoFuncionaEQuaisSaoAsRegras as post } from "@/content/blog/posts/ponto-eletronico-com-biometria-como-funciona-e-quais-sao-as-regras";
import { jsonLd } from "@/content/jsonld/blog__ponto-eletronico-com-biometria-como-funciona-e-quais-sao-as-regras";

const ponto_eletronico_com_biometria_como_funciona_e_quais_sao_as_regrasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default ponto_eletronico_com_biometria_como_funciona_e_quais_sao_as_regrasPage;
