import { BlogPostView } from "@/components/marketing/BlogPostView";
import { excecoesAoControleDeJornadaOQueDizOArtigo62DaClt as post } from "@/content/blog/posts/excecoes-ao-controle-de-jornada-o-que-diz-o-artigo-62-da-clt";
import { jsonLd } from "@/content/jsonld/blog__excecoes-ao-controle-de-jornada-o-que-diz-o-artigo-62-da-clt";

const excecoes_ao_controle_de_jornada_o_que_diz_o_artigo_62_da_cltPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default excecoes_ao_controle_de_jornada_o_que_diz_o_artigo_62_da_cltPage;
