import { BlogPostView } from "@/components/marketing/BlogPostView";
import { empresaComMenosDe20FuncionariosPrecisaDePonto as post } from "@/content/blog/posts/empresa-com-menos-de-20-funcionarios-precisa-de-ponto";
import { jsonLd } from "@/content/jsonld/blog__empresa-com-menos-de-20-funcionarios-precisa-de-ponto";

const empresa_com_menos_de_20_funcionarios_precisa_de_pontoPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default empresa_com_menos_de_20_funcionarios_precisa_de_pontoPage;
