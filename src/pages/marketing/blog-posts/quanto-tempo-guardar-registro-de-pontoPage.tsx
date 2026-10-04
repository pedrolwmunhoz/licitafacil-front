import { BlogPostView } from "@/components/marketing/BlogPostView";
import { quantoTempoGuardarRegistroDePonto as post } from "@/content/blog/posts/quanto-tempo-guardar-registro-de-ponto";
import { jsonLd } from "@/content/jsonld/blog__quanto-tempo-guardar-registro-de-ponto";

const quanto_tempo_guardar_registro_de_pontoPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default quanto_tempo_guardar_registro_de_pontoPage;
