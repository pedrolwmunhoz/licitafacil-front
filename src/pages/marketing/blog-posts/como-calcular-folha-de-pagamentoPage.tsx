import { BlogPostView } from "@/components/marketing/BlogPostView";
import { comoCalcularFolhaDePagamento as post } from "@/content/blog/posts/como-calcular-folha-de-pagamento";
import { jsonLd } from "@/content/jsonld/blog__como-calcular-folha-de-pagamento";

const como_calcular_folha_de_pagamentoPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default como_calcular_folha_de_pagamentoPage;
