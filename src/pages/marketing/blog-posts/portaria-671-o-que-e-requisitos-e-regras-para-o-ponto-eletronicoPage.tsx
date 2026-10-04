import { BlogPostView } from "@/components/marketing/BlogPostView";
import { portaria671RegistroDePontoParaPme as post } from "@/content/blog/posts/portaria-671-registro-de-ponto-para-pme";
import { jsonLd } from "@/content/jsonld/blog__portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico";

const portaria_671_o_que_e_requisitos_e_regras_para_o_ponto_eletronicoPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default portaria_671_o_que_e_requisitos_e_regras_para_o_ponto_eletronicoPage;
