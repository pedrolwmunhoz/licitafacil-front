import { BlogPostView } from "@/components/marketing/BlogPostView";
import { controleDeJornadaEObrigatorioEntendaQuandoAEmpresaPrecisaRegistrarOPonto as post } from "@/content/blog/posts/controle-de-jornada-e-obrigatorio-entenda-quando-a-empresa-precisa-registrar-o-ponto";
import { jsonLd } from "@/content/jsonld/blog__controle-de-jornada-e-obrigatorio-entenda-quando-a-empresa-precisa-registrar-o-ponto";

const controle_de_jornada_e_obrigatorio_entenda_quando_a_empresa_precisa_registrar_o_pontoPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default controle_de_jornada_e_obrigatorio_entenda_quando_a_empresa_precisa_registrar_o_pontoPage;
