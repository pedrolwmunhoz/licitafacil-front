import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoCalcularHorasNoturnas as post } from "@/content/blog/posts/como-calcular-horas-noturnas";
import { jsonLd } from "@/content/jsonld/blog__como-calcular-horas-noturnas";

const como_calcular_horas_noturnasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_calcular_horas_noturnasPage;
