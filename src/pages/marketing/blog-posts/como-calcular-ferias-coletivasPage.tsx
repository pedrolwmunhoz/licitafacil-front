import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoCalcularFeriasColetivas as post } from "@/content/blog/posts/como-calcular-ferias-coletivas";
import { jsonLd } from "@/content/jsonld/blog__como-calcular-ferias-coletivas";

const como_calcular_ferias_coletivasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_calcular_ferias_coletivasPage;
