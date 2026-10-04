import { BlogPostView } from "@/components/marketing/BlogPostView";
import { intervaloPreAssinaladoOQueEComoFuncionaEQuaisSaoAsRegras as post } from "@/content/blog/posts/intervalo-pre-assinalado-o-que-e-como-funciona-e-quais-sao-as-regras";
import { jsonLd } from "@/content/jsonld/blog__intervalo-pre-assinalado-o-que-e-como-funciona-e-quais-sao-as-regras";

const intervalo_pre_assinalado_o_que_e_como_funciona_e_quais_sao_as_regrasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default intervalo_pre_assinalado_o_que_e_como_funciona_e_quais_sao_as_regrasPage;
