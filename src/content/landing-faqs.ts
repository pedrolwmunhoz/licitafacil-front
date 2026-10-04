export type LandingFaq = {
  q: string;
  a: string;
};

/** FAQ da home: só compra/onboarding (máx. 5). Demais temas → /perguntas-frequentes. */
export const LANDING_FAQS: LandingFaq[] = [
  {
    q: "Como contrato o SegPonto?",
    a: "Escolha o plano em /precos ou /cadastro, informe os dados da empresa e conclua o pagamento no cartão. A assinatura mensal começa após a confirmação.",
  },
  {
    q: "Quanto tempo para começar a marcar ponto?",
    a: "Após o pagamento você configura o painel, convida o time e já pode batizar no app no mesmo dia. Há um playbook em /blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo.",
  },
  {
    q: "Preciso de servidor ou relógio físico?",
    a: "Não para o fluxo padrão: SaaS na nuvem com painel web e app. Se a convenção exigir relógio específico, alinhe antes. Veja /blog/ponto-por-app-vs-relogio-de-ponto-qual-a-diferenca-e-como-escolher.",
  },
  {
    q: "O preço é por funcionário?",
    a: "É por faixa de headcount. Confira valores e o que está incluso em /precos ou simule em /calculadoras/custo-ponto-eletronico.",
  },
  {
    q: "Onde vejo dúvidas de jornada, GPS e Portaria 671?",
    a: "No FAQ completo (/perguntas-frequentes) e nos guias /blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve e no artigo do blog sobre Portaria 671. A home cobre só contratação.",
  },
];
