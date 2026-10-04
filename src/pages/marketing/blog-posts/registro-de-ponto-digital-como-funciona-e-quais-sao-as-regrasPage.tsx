import { BlogPostView } from "@/components/marketing/BlogPostView";
import { registroDePontoDigitalComoFuncionaEQuaisSaoAsRegras as post } from "@/content/blog/posts/registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras";
import { jsonLd } from "@/content/jsonld/blog__registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras";

const registro_de_ponto_digital_como_funciona_e_quais_sao_as_regrasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default registro_de_ponto_digital_como_funciona_e_quais_sao_as_regrasPage;
