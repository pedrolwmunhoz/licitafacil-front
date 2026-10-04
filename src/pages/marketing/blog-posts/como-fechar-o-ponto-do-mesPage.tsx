import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoFecharOPontoDoMes as post } from "@/content/blog/posts/como-fechar-o-ponto-do-mes";
import { jsonLd } from "@/content/jsonld/blog__como-fechar-o-ponto-do-mes";

const como_fechar_o_ponto_do_mesPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_fechar_o_ponto_do_mesPage;
