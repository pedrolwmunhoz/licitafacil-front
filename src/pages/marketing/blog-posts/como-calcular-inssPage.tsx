import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoCalcularInss as post } from "@/content/blog/posts/como-calcular-inss";
import { jsonLd } from "@/content/jsonld/blog__como-calcular-inss";

const como_calcular_inssPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_calcular_inssPage;
