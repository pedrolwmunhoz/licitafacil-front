import { BlogPostView } from "@/components/marketing/BlogPostView";
import { pontoPorAppVsRelogioDePontoQualADiferencaEComoEscolher as post } from "@/content/blog/posts/ponto-por-app-vs-relogio-de-ponto-qual-a-diferenca-e-como-escolher";
import { jsonLd } from "@/content/jsonld/blog__ponto-por-app-vs-relogio-de-ponto-qual-a-diferenca-e-como-escolher";

const ponto_por_app_vs_relogio_de_ponto_qual_a_diferenca_e_como_escolherPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default ponto_por_app_vs_relogio_de_ponto_qual_a_diferenca_e_como_escolherPage;
