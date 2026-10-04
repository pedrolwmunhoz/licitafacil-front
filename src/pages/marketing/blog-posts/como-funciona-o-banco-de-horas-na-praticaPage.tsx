import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoFuncionaOBancoDeHorasNaPratica as post } from "@/content/blog/posts/como-funciona-o-banco-de-horas-na-pratica";
import { jsonLd } from "@/content/jsonld/blog__como-funciona-o-banco-de-horas-na-pratica";

const como_funciona_o_banco_de_horas_na_praticaPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_funciona_o_banco_de_horas_na_praticaPage;
