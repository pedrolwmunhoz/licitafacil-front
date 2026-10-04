import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoCalcularFeriadoTrabalhado as post } from "@/content/blog/posts/como-calcular-feriado-trabalhado";
import { jsonLd } from "@/content/jsonld/blog__como-calcular-feriado-trabalhado";

const como_calcular_feriado_trabalhadoPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_calcular_feriado_trabalhadoPage;
