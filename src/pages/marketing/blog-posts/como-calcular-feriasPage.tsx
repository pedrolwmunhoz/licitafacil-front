import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoCalcularFerias as post } from "@/content/blog/posts/como-calcular-ferias";
import { jsonLd } from "@/content/jsonld/blog__como-calcular-ferias";

const como_calcular_feriasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_calcular_feriasPage;
