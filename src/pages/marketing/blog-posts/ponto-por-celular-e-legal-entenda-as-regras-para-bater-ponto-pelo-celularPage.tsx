import { BlogPostView } from "@/components/marketing/BlogPostView";
import { pontoPorCelularELegal as post } from "@/content/blog/posts/ponto-por-celular-e-legal";
import { jsonLd } from "@/content/jsonld/blog__ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular";

const ponto_por_celular_e_legal_entenda_as_regras_para_bater_ponto_pelo_celularPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default ponto_por_celular_e_legal_entenda_as_regras_para_bater_ponto_pelo_celularPage;
