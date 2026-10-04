import { BlogPostView } from "@/components/marketing/BlogPostView";
import { controleDeJornadaOQueEComoFuncionaEComoRegistrarAJornadaDosFuncionarios as post } from "@/content/blog/posts/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios";
import { jsonLd } from "@/content/jsonld/blog__controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios";

const controle_de_jornada_o_que_e_como_funciona_e_como_registrar_a_jornada_dos_funcionariosPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default controle_de_jornada_o_que_e_como_funciona_e_como_registrar_a_jornada_dos_funcionariosPage;
