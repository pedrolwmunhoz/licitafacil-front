import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comprovanteDeRegistroDePontoOQueEParaQueServeEQuaisSaoAsRegras as post } from "@/content/blog/posts/comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras";
import { jsonLd } from "@/content/jsonld/blog__comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras";

const comprovante_de_registro_de_ponto_o_que_e_para_que_serve_e_quais_sao_as_regrasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default comprovante_de_registro_de_ponto_o_que_e_para_que_serve_e_quais_sao_as_regrasPage;
