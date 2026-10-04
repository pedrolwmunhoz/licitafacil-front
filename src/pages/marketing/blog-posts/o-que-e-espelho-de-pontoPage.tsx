import { BlogPostView } from "@/components/marketing/BlogPostView";
import { oQueEEspelhoDePonto as post } from "@/content/blog/posts/o-que-e-espelho-de-ponto";
import { jsonLd } from "@/content/jsonld/blog__o-que-e-espelho-de-ponto";

const o_que_e_espelho_de_pontoPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default o_que_e_espelho_de_pontoPage;
