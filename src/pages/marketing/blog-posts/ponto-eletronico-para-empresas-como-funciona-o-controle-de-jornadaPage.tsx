import { BlogPostView } from "@/components/marketing/BlogPostView";
import { pontoEletronicoParaEmpresasComoFuncionaOControleDeJornada as post } from "@/content/blog/posts/ponto-eletronico-para-empresas-como-funciona-o-controle-de-jornada";
import { jsonLd } from "@/content/jsonld/blog__ponto-eletronico-para-empresas-como-funciona-o-controle-de-jornada";

const ponto_eletronico_para_empresas_como_funciona_o_controle_de_jornadaPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default ponto_eletronico_para_empresas_como_funciona_o_controle_de_jornadaPage;
