import { BlogPostView } from "@/components/marketing/BlogPostView";
import { quantoCustaPontoEletronico as post } from "@/content/blog/posts/quanto-custa-ponto-eletronico";
import { jsonLd } from "@/content/jsonld/blog__quanto-custa-um-sistema-de-ponto-eletronico";

const quanto_custa_um_sistema_de_ponto_eletronicoPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default quanto_custa_um_sistema_de_ponto_eletronicoPage;
