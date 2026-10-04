import { BlogPostView } from "@/components/marketing/BlogPostView";
import { integracaoDoPontoComAFolhaDePagamentoComoFunciona as post } from "@/content/blog/posts/integracao-do-ponto-com-a-folha-de-pagamento-como-funciona";
import { jsonLd } from "@/content/jsonld/blog__integracao-do-ponto-com-a-folha-de-pagamento-como-funciona";

const integracao_do_ponto_com_a_folha_de_pagamento_como_funcionaPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default integracao_do_ponto_com_a_folha_de_pagamento_como_funcionaPage;
