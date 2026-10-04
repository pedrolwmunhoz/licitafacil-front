import { BlogPostView } from "@/components/marketing/BlogPostView";
import { folhaDePontoOnlineComoFuncionaEComoFazerOControleDaJornada as post } from "@/content/blog/posts/folha-de-ponto-online-como-funciona-e-como-fazer-o-controle-da-jornada";
import { jsonLd } from "@/content/jsonld/blog__folha-de-ponto-online-como-funciona-e-como-fazer-o-controle-da-jornada";

const folha_de_ponto_online_como_funciona_e_como_fazer_o_controle_da_jornadaPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default folha_de_ponto_online_como_funciona_e_como_fazer_o_controle_da_jornadaPage;
