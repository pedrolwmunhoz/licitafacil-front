import { BlogPostView } from "@/components/marketing/BlogPostView";
import { escalasDeTrabalhoEPontoTiposDeEscalaEComoControlarAJornada as post } from "@/content/blog/posts/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada";
import { jsonLd } from "@/content/jsonld/blog__escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada";

const escalas_de_trabalho_e_ponto_tipos_de_escala_e_como_controlar_a_jornadaPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default escalas_de_trabalho_e_ponto_tipos_de_escala_e_como_controlar_a_jornadaPage;
