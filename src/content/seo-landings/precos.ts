// intent: preços SegPonto — grade, recursos iguais, contratação
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingFaq } from "@/content/seo-landings/types";

export const precosSeoMeta = PUBLIC_PAGE_SEO.precos;

export const precosFaqs: SeoLandingFaq[] = [
  {
    q: "Preciso de cartão de crédito para contratar?",
    a: "Sim. A assinatura é mensal e o pagamento é realizado pelo cartão durante a contratação.",
  },
  {
    q: "O que muda entre as faixas?",
    a: "A quantidade de funcionários permitida e o valor mensal. Os recursos do sistema são os mesmos em todas as faixas.",
  },
  {
    q: "Existe fidelidade anual?",
    a: "A assinatura é mensal. Consulte os termos vigentes para as condições completas da contratação.",
  },
  {
    q: "AFDT e relatórios têm custo adicional?",
    a: "Não. A exportação AFDT e os relatórios incluídos na página de preços fazem parte da mensalidade.",
  },
  {
    q: "E se eu passar do limite da minha faixa?",
    a: "Você deverá utilizar a faixa correspondente à nova quantidade de funcionários cadastrados.",
  },
  {
    q: "Posso começar com um funcionário?",
    a: "Sim. O plano de 1 funcionário custa R$ 2,99 por mês.",
  },
];
