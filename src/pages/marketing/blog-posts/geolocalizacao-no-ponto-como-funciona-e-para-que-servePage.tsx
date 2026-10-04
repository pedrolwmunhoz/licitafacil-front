import { BlogPostView } from "@/components/marketing/BlogPostView";
import { geolocalizacaoNoPontoComoFuncionaEParaQueServe as post } from "@/content/blog/posts/geolocalizacao-no-ponto-como-funciona-e-para-que-serve";
import { jsonLd } from "@/content/jsonld/blog__geolocalizacao-no-ponto-como-funciona-e-para-que-serve";

const geolocalizacao_no_ponto_como_funciona_e_para_que_servePage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default geolocalizacao_no_ponto_como_funciona_e_para_que_servePage;
