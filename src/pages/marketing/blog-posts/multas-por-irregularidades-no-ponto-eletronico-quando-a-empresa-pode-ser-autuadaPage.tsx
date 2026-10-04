import { BlogPostView } from "@/components/marketing/BlogPostView";
import { multasPorIrregularidadesNoPontoEletronicoQuandoAEmpresaPodeSerAutuada as post } from "@/content/blog/posts/multas-por-irregularidades-no-ponto-eletronico-quando-a-empresa-pode-ser-autuada";
import { jsonLd } from "@/content/jsonld/blog__multas-por-irregularidades-no-ponto-eletronico-quando-a-empresa-pode-ser-autuada";

const multas_por_irregularidades_no_ponto_eletronico_quando_a_empresa_pode_ser_autuadaPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default multas_por_irregularidades_no_ponto_eletronico_quando_a_empresa_pode_ser_autuadaPage;
