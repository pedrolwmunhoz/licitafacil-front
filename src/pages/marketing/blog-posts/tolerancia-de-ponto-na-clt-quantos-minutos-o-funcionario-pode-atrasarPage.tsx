import { BlogPostView } from "@/components/marketing/BlogPostView";
import { toleranciaDePontoNaClt as post } from "@/content/blog/posts/tolerancia-de-ponto-na-clt";
import { jsonLd } from "@/content/jsonld/blog__tolerancia-de-ponto-na-clt-quantos-minutos-o-funcionario-pode-atrasar";

const tolerancia_de_ponto_na_clt_quantos_minutos_o_funcionario_pode_atrasarPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default tolerancia_de_ponto_na_clt_quantos_minutos_o_funcionario_pode_atrasarPage;
