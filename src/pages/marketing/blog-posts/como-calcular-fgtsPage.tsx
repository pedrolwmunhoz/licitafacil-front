import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoCalcularFgts as post } from "@/content/blog/posts/como-calcular-fgts";
import { jsonLd } from "@/content/jsonld/blog__como-calcular-fgts";

const como_calcular_fgtsPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_calcular_fgtsPage;
