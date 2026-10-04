import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoCalcularHoraExtra as post } from "@/content/blog/posts/como-calcular-hora-extra";
import { jsonLd } from "@/content/jsonld/blog__como-calcular-hora-extra";

const como_calcular_hora_extraPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_calcular_hora_extraPage;
