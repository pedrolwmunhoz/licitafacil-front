import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoCalcularDomingoTrabalhado as post } from "@/content/blog/posts/como-calcular-domingo-trabalhado";
import { jsonLd } from "@/content/jsonld/blog__como-calcular-domingo-trabalhado";

const como_calcular_domingo_trabalhadoPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_calcular_domingo_trabalhadoPage;
