import { BlogPostView } from "@/components/marketing/BlogPostView";
import { pontoPorExcecaoComoFuncionaQuemPodeUsarEQuaisSaoAsRegras as post } from "@/content/blog/posts/ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras";
import { jsonLd } from "@/content/jsonld/blog__ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras";

const ponto_por_excecao_como_funciona_quem_pode_usar_e_quais_sao_as_regrasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default ponto_por_excecao_como_funciona_quem_pode_usar_e_quais_sao_as_regrasPage;
