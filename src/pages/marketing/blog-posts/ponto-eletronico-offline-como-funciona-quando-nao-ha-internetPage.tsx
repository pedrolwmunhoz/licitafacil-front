import { BlogPostView } from "@/components/marketing/BlogPostView";
import { pontoEletronicoOfflineComoFuncionaQuandoNaoHaInternet as post } from "@/content/blog/posts/ponto-eletronico-offline-como-funciona-quando-nao-ha-internet";
import { jsonLd } from "@/content/jsonld/blog__ponto-eletronico-offline-como-funciona-quando-nao-ha-internet";

const ponto_eletronico_offline_como_funciona_quando_nao_ha_internetPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default ponto_eletronico_offline_como_funciona_quando_nao_ha_internetPage;
