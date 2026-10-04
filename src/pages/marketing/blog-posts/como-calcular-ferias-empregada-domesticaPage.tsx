import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoCalcularFeriasEmpregadaDomestica as post } from "@/content/blog/posts/como-calcular-ferias-empregada-domestica";
import { jsonLd } from "@/content/jsonld/blog__como-calcular-ferias-empregada-domestica";

const como_calcular_ferias_empregada_domesticaPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_calcular_ferias_empregada_domesticaPage;
