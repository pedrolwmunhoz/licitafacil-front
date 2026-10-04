import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/quanto-custa-um-sistema-de-ponto-eletronico — sem import do post completo. */
export const path = "/blog/quanto-custa-um-sistema-de-ponto-eletronico";
export const jsonLd = articleJsonLd({
  path: "/blog/quanto-custa-um-sistema-de-ponto-eletronico",
  title: "Quanto custa um sistema de ponto eletrônico?",
  description: "Quanto custa um sistema de ponto eletrônico em {{ano}}: faixas por quantidade de funcionários, preço por colaborador, exemplos de mercado e o que entra além da mensalidade.",
  publishedAt: "2026-09-08",
  updatedAt: "2026-09-17",
  faqs: [{ q: "Quanto custa um sistema de ponto eletrônico por mês?", a: "Para pequena empresa, as faixas de mercado em {{ano}} ficam aproximadamente em R$ 40 a R$ 60 (até 5), R$ 60 a R$ 100 (até 10), R$ 120 a R$ 220 (até 25) e R$ 200 a R$ 400 (até 50), podendo variar conforme recursos e fornecedor." }, { q: "Quanto custa para 10 funcionários?", a: "Em geral entre R$ 60 e R$ 110 por mês. Exemplos publicados: SegPonto R$ 79,90, Dok Ponto R$ 59,90, UsePonto e Let's Work R$ 89,90." }, { q: "Quanto custa para 50 funcionários?", a: "Varia bastante. Exemplos publicados: SegPonto R$ 289,90, Let's Work R$ 299,90, UsePonto R$ 409,90 e SystemPro R$ 189,50 por mês." }, { q: "O preço é por funcionário ou por empresa?", a: "Depende do sistema. Há preço por funcionário, plano por quantidade de funcionários (teto) e cobrança por registro." }, { q: "É preciso comprar um relógio de ponto?", a: "Não necessariamente. Muitos sistemas em nuvem registram por celular, computador, tablet, app, QR Code ou biometria, sem equipamento específico." }],
  aboutIds: ["pontoEletronico", "controleDeJornada"],
  mentionIds: ["repP"],
  relatedArticlePaths: [
    "/blog/como-escolher-um-sistema-de-ponto-eletronico-para-pequenas-empresas",
    "/blog/o-que-e-um-sistema-de-ponto-eletronico",
  ],
});
