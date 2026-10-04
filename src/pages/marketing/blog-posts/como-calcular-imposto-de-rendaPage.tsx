import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoCalcularImpostoDeRenda as post } from "@/content/blog/posts/como-calcular-imposto-de-renda";
import { jsonLd } from "@/content/jsonld/blog__como-calcular-imposto-de-renda";

const como_calcular_imposto_de_rendaPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_calcular_imposto_de_rendaPage;
