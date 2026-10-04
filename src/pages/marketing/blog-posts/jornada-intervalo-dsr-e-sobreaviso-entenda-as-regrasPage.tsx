import { BlogPostView } from "@/components/marketing/BlogPostView";
import { jornadaIntervaloDsrESobreavisoEntendaAsRegras as post } from "@/content/blog/posts/jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras";
import { jsonLd } from "@/content/jsonld/blog__jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras";

const jornada_intervalo_dsr_e_sobreaviso_entenda_as_regrasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default jornada_intervalo_dsr_e_sobreaviso_entenda_as_regrasPage;
