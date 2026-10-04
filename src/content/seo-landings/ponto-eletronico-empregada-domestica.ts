// intent: ponto e jornada da empregada doméstica, molde post ouro
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoEmpregadaDomesticaContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoEmpregadaDomestica,
  hero: {
    eyebrow: "Doméstico",
    titleBefore: "Ponto para",
    highlight: "empregada doméstica",
  },
  opening: [
    "Com vínculo formal, a jornada da empregada doméstica precisa de mais do que o combinado verbal. Entrada, intervalo, saída e extras entram no registro que alimenta o espelho e o eSocial Doméstico.",
    "A LC 150 disciplina regras próprias de jornada no lar. O REP-P empresarial da Portaria 671 não é o mesmo desenho do empregador pessoa física no domicílio.",
    "O que registrar no dia a dia? Qual a diferença para o ponto de empresa com CNPJ? Preciso de sistema enterprise?",
    "Entenda o controle doméstico, os exemplos de jornada e como alinhar registro e eSocial.",
  ],
  sections: [
    {
      title: "O que é o controle de jornada doméstica",
      variant: "white",
      paragraphs: [
        "Em termos simples, o controle doméstico registra a jornada da empregada com vínculo formal: entrada, intervalo, saída e o que passa do previsto, para espelho, HE e alinhamento com o eSocial Doméstico.",
        "O combinado verbal organiza a casa no dia. O registro organiza a prova do que foi trabalhado e o que deve ser declarado.",
        "Aparece na jornada diurna, na escala 12×36 doméstica quando admitida e nas extras de festa ou atraso.",
        "Sem registro, a HE vira conversa. Com marcação e recibo, o pagamento fica formal.",
      ],
    },
    {
      title: "Exemplos de jornada doméstica",
      variant: "canvas",
      paragraphs: [
        "Os casos abaixo são os mais comuns no lar com vínculo.",
      ],
      subsections: [
        {
          title: "Jornada diurna",
          paragraphs: [
            "Entrada, intervalo e saída no horário combinado. Exemplos: 8h–17h com intervalo; saída pontual registrada.",
          ],
        },
        {
          title: "Horas extras",
          paragraphs: [
            "Extras em festa ou atraso. Exemplos: duas horas a 50% no sábado no espelho; saída esticada em dia útil. Evita pagamento informal.",
          ],
        },
        {
          title: "Escala especial",
          paragraphs: [
            "Quando a LC 150 e o acordo admitem desenho específico. Exemplos: 12×36 doméstica; confirme o enquadramento com o contador.",
          ],
        },
        {
          title: "Férias e eSocial",
          paragraphs: [
            "Descanso anual e declaração. Exemplos: terço no recibo; lançamento no eSocial Doméstico. Veja o post de férias domésticas.",
          ],
        },
      ],
    },
    {
      title: "Diferença entre doméstica e empresa com CNPJ",
      variant: "white",
      paragraphs: [
        "Os dois registram jornada. O regime e o canal mudam.",
      ],
      subsections: [
        {
          title: "Empregador doméstico",
          paragraphs: [
            "Pessoa física no lar, LC 150 e eSocial Doméstico. Exemplos: uma empregada; jornada e férias no rito doméstico.",
          ],
        },
        {
          title: "Empresa (CNPJ)",
          paragraphs: [
            "CLT empresarial e, no eletrônico, Portaria 671 / REP-P. Exemplos: loja, escritório, clínica com vários CLTs.",
          ],
        },
      ],
    },
    {
      title: "Variações que mudam a prática",
      variant: "canvas",
      paragraphs: [
        "Além do vínculo, três fatores pesam.",
      ],
      subsections: [
        {
          title: "Diarista sem vínculo",
          paragraphs: [
            "Sem carteira, o enquadramento muda. Não misture diarista com doméstica CLT na mesma regra.",
          ],
        },
        {
          title: "Extras frequentes",
          paragraphs: [
            "Festa e viagem pedem lançamento. Exemplos: fim de semana; horário estendido com adicional.",
          ],
        },
        {
          title: "Ferramenta simples",
          paragraphs: [
            "O foco é registro claro e eSocial, não software enterprise. Exemplos: app simples; espelho mensal para o contador.",
          ],
        },
      ],
    },
    {
      title: "Por que registrar à parte do combinado",
      variant: "white",
      paragraphs: [
        "Registrar a jornada à parte do combinado corta a HE que era só conversa. HE classificada no registro, em vez de “combinamos depois”, elimina erro de folha.",
        "No lar isso aparece cedo: saída esticada, sábado de festa, discussão na rescisão. Registro curto e claro evita o conflito.",
      ],
    },
    {
      title: "De que forma organizar na prática",
      variant: "canvas",
      paragraphs: [
        "Combine o horário por escrito. Registre entrada, intervalo, saída e extras. Lance no eSocial o que for devido.",
        "Guarde recibos de férias e o histórico do período.",
        "No SegPonto, o plano de teste e as faixas cobrem a batida simples conforme o número de ativos. Veja preços.",
        "Férias domésticas no blog, preços e como implantar têm páginas próprias.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre jornada doméstica",
    items: [
      {
        q: "Empregada doméstica precisa de ponto?",
        a: "Com vínculo formal, a jornada precisa de registro organizado para espelho, HE e eSocial. O desenho é o da LC 150, não o REP empresarial genérico.",
      },
      {
        q: "É o mesmo sistema de uma loja?",
        a: "O foco do empregador doméstico é eSocial Doméstico e a jornada da LC 150. O REP-P empresarial da Portaria 671 é típico de empregador com CNPJ.",
      },
      {
        q: "Diarista entra na mesma regra?",
        a: "Não. Diarista sem vínculo não se confunde com doméstica com carteira. Confirme o enquadramento.",
      },
      {
        q: "Como lançar extras?",
        a: "Registre o horário real e pague o adicional conforme a LC 150 e a orientação do contador.",
      },
      {
        q: "Onde ver férias?",
        a: "No post “Como calcular férias empregada doméstica”.",
      },
    ],
  },
  related: [
    { label: "Férias domésticas (blog)", to: "/blog/como-calcular-ferias-empregada-domestica" },
    { label: "Preços", to: "/precos" },
    { label: "Como implantar", to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo" },
    { label: "Controle de jornada", to: "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios" },
  ],
};
