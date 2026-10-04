import { BlogPostView } from "@/components/marketing/BlogPostView";
import { oQueEUmSistemaDePontoEletronico as post } from "@/content/blog/posts/o-que-e-um-sistema-de-ponto-eletronico";
import { jsonLd } from "@/content/jsonld/blog__o-que-e-um-sistema-de-ponto-eletronico";

const o_que_e_um_sistema_de_ponto_eletronicoPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default o_que_e_um_sistema_de_ponto_eletronicoPage;
