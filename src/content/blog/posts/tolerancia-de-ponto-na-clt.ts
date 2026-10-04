import type { BlogPost } from "@/content/blog/types";

export const toleranciaDePontoNaClt: BlogPost = {
  slug: "tolerancia-de-ponto-na-clt-quantos-minutos-o-funcionario-pode-atrasar",
  title: "Tolerância de ponto na CLT: quantos minutos o funcionário pode atrasar?",
  hero: {
    titleBefore: "Tolerância de ponto na CLT:",
    highlight: "quantos minutos o funcionário pode atrasar?",
  },
  description:
    "Tolerância de ponto na CLT (art. 58, §1º): 5 minutos por marcação e 10 minutos por dia, o que acontece se passar do limite e como configurar no sistema de ponto.",
  intro:
    "A tolerância de ponto na CLT estabelece limites para pequenas variações nos horários de entrada e saída: até 5 minutos por marcação e no máximo 10 minutos no dia.",
  opening: [
    "A **tolerância de ponto na CLT** estabelece limites para pequenas variações nos horários de entrada e saída do trabalhador. A regra está prevista no artigo 58, §1º, da Consolidação das Leis do Trabalho (CLT).",
    "Em determinadas situações, pequenas diferenças no registro do ponto não são consideradas como tempo extra ou atraso para fins de jornada.",
  ],
  publishedAt: "2026-09-08",
  updatedAt: "2026-09-17",
  readMinutes: 12,
  ctaTitulo: "Organize o ponto antes da fiscalização bater na porta",
  sumario: [
    { secao: "O que é a tolerância de ponto na CLT?", rotulo: "O que é" },
    { secao: "Quantos minutos de tolerância o funcionário tem no ponto?", rotulo: "Quantos minutos" },
    { secao: "O que acontece se passar de 5 minutos de atraso?", rotulo: "Atraso acima de 5 minutos" },
    { secao: "Existe tolerância de 10 minutos no ponto?", rotulo: "Tolerância de 10 minutos" },
    { secao: "Como funciona a tolerância de ponto na prática?", rotulo: "Na prática" },
    { secao: "A tolerância vale para horas extras?", rotulo: "Horas extras" },
    { secao: "Como configurar a tolerância no sistema de ponto?", rotulo: "Configuração no sistema" },
  ],
  sections: [
    {
      title: "O que é a tolerância de ponto na CLT?",
      paragraphs: [
        "A tolerância de ponto é uma margem prevista na legislação para pequenas variações no horário registrado pelo trabalhador.",
        "De acordo com o artigo 58, §1º, da CLT, **não são descontadas nem computadas como jornada extraordinária as variações de horário no registro de ponto que não excedam 5 minutos, observado o limite máximo de 10 minutos diários**.",
        "Isso significa que a regra possui dois limites que precisam ser observados:",
      ],
      bullets: [
        "Até **5 minutos por marcação**;",
        "No máximo **10 minutos no total do dia**.",
      ],
    },
    {
      title: "Quantos minutos de tolerância o funcionário tem no ponto?",
      paragraphs: [
        "A tolerância é de **até 5 minutos por registro**, respeitando o limite de **10 minutos por dia**.",
        "Por exemplo, se o funcionário deveria entrar às 8h e registra às 8h04, a variação está dentro do limite.",
        "Se registra às 8h06, a situação ultrapassa os 5 minutos permitidos naquela marcação.",
        "A análise também deve considerar o limite diário de 10 minutos.",
      ],
    },
    {
      title: "A tolerância de 5 minutos vale para entrada e saída?",
      paragraphs: [
        "Sim. A regra considera as variações nos registros de entrada e saída.",
        "Por exemplo:",
        "**Entrada:** 8h03",
        "**Saída:** 17h04",
        "Nesse caso, as variações individuais não ultrapassam 5 minutos e o total é de 7 minutos.",
        "Já uma situação como:",
        "**Entrada:** 8h06",
        "**Saída:** 17h02",
        "possui uma variação superior a 5 minutos em uma das marcações.",
      ],
    },
    {
      title: "O que acontece se passar de 5 minutos de atraso?",
      paragraphs: [
        "Quando a variação ultrapassa o limite de 5 minutos, não significa simplesmente que serão considerados apenas os minutos que ultrapassaram os 5 minutos.",
        "A regra do artigo 58, §1º, estabelece que as variações que não excedam 5 minutos, observado o limite máximo de 10 minutos diários, não são computadas.",
        "Por isso, o tratamento do registro deve considerar a regra legal aplicável à jornada, e não simplesmente descontar ou contabilizar apenas o excedente de 5 minutos.",
      ],
    },
    {
      title: "E se o funcionário chegar 10 minutos atrasado?",
      paragraphs: [
        "Se o trabalhador chegar **10 minutos atrasado**, a situação já ultrapassa o limite de 5 minutos por marcação.",
        "O tratamento desse período deve considerar as regras aplicáveis ao controle de jornada e à situação concreta do trabalhador.",
        "A tolerância prevista na CLT não significa que o funcionário tenha automaticamente 10 minutos de atraso permitidos em cada entrada.",
        "O limite de **10 minutos é diário**, enquanto o limite de cada variação é de **5 minutos**.",
      ],
    },
    {
      title: "O funcionário pode chegar 5 minutos atrasado todos os dias?",
      paragraphs: [
        "A existência da tolerância legal não deve ser confundida com a criação de um horário flexível de entrada.",
        "Os 5 minutos previstos no artigo 58, §1º, correspondem a uma margem para variações no registro de ponto. Eles não transformam o horário contratual em um horário que possa ser livremente alterado pelo empregado.",
        "Por exemplo, se a jornada começa às 8h, o horário contratual continua sendo 8h.",
      ],
    },
    {
      title: "Existe tolerância de 10 minutos no ponto?",
      paragraphs: [
        "Existe um limite máximo diário de **10 minutos**, mas isso não significa que exista uma tolerância de 10 minutos para cada marcação.",
        "A regra funciona em conjunto:",
        "**Máximo de 5 minutos por registro + máximo de 10 minutos no total do dia.**",
        "Por isso, não é correto interpretar a CLT como se o funcionário pudesse chegar até 10 minutos atrasado diariamente sem qualquer consequência.",
      ],
    },
    {
      title: "Como funciona a tolerância de ponto na prática?",
      paragraphs: ["Imagine um funcionário com jornada iniciando às 8h."],
      subsections: [
        {
          title: "Exemplo 1 — dentro da tolerância",
          paragraphs: [
            "Entrada: 8h03",
            "Saída: 17h02",
            "Variações:",
            "Entrada: 3 minutos",
            "Saída: 2 minutos",
            "Total: 5 minutos",
            "As variações estão dentro dos limites previstos no artigo 58, §1º.",
          ],
        },
        {
          title: "Exemplo 2 — ultrapassou o limite por registro",
          paragraphs: [
            "Entrada: 8h07",
            "Saída: 17h00",
            "A entrada teve uma variação superior a 5 minutos.",
          ],
        },
        {
          title: "Exemplo 3 — ultrapassou o limite diário",
          paragraphs: [
            "Entrada: 8h05",
            "Saída: 17h06",
            "As duas marcações possuem variações de até 5 minutos, mas o total chega a 11 minutos.",
            "Nesse caso, o limite diário de 10 minutos foi ultrapassado.",
          ],
        },
      ],
    },
    {
      title: "A tolerância vale para horas extras?",
      paragraphs: [
        "A regra também se aplica às pequenas variações nos horários de saída.",
        "Por exemplo, se o funcionário termina a jornada às 18h e registra a saída às 18h04, essa pequena variação está dentro do limite previsto na CLT.",
        "Porém, isso não significa que a empresa possa simplesmente estabelecer uma regra de tolerância diferente da legislação para eliminar [horas extras](/blog/como-calcular-hora-extra) efetivamente realizadas.",
      ],
    },
    {
      title: "A empresa pode descontar 1 minuto de atraso?",
      paragraphs: [
        "A análise depende da situação e dos limites previstos no artigo 58, §1º.",
        "Pequenas variações de até 5 minutos por registro, respeitado o limite de 10 minutos diários, não devem ser tratadas como atraso descontável ou jornada extraordinária.",
        "Por isso, sistemas de controle de ponto precisam considerar esses limites no tratamento das marcações.",
      ],
    },
    {
      title: "A empresa pode exigir que o funcionário bata o ponto exatamente no horário?",
      paragraphs: [
        "O horário contratual continua existindo e deve ser observado pelo trabalhador.",
        "Entretanto, pequenas variações nos registros são tratadas pela CLT conforme o artigo 58, §1º.",
        "A empresa não deve utilizar o sistema de ponto para criar mecanismos que desconsiderem ou alterem indevidamente as marcações realizadas pelo trabalhador.",
        "Para sistemas de registro eletrônico, também devem ser observadas as regras aplicáveis ao tipo de REP utilizado.",
      ],
    },
    {
      title: "Tolerância de ponto vale para trabalho remoto?",
      paragraphs: [
        "A regra relacionada à jornada e às variações do registro não deixa de existir simplesmente porque o trabalhador está trabalhando remotamente.",
        "Quando existe controle de jornada por sistema eletrônico, as marcações devem ser tratadas de acordo com a legislação aplicável.",
        "No caso de sistemas eletrônicos de ponto, também devem ser observadas as regras da [Portaria 671 do Ministério do Trabalho](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico).",
      ],
    },
    {
      title: "Como configurar a tolerância no sistema de ponto?",
      paragraphs: [
        "Empresas que utilizam sistemas eletrônicos de controle de jornada devem verificar como a plataforma trata as pequenas variações de horário.",
        "Um sistema de ponto pode precisar considerar:",
      ],
      bullets: [
        "5 minutos como limite por marcação;",
        "10 minutos como limite diário;",
        "Entrada e saída;",
        "Intervalos;",
        "Horas extras;",
        "Atrasos;",
        "Banco de horas;",
        "Jornada contratual.",
      ],
      closingParagraphs: [
        "A configuração deve refletir as regras aplicáveis à empresa e não transformar a tolerância legal em uma autorização genérica para atrasos.",
      ],
    },
    {
      title: "Tolerância de ponto é obrigatória?",
      paragraphs: [
        "A tolerância prevista no artigo 58, §1º, decorre da própria legislação trabalhista.",
        "O dispositivo estabelece que as variações de horário no registro de ponto que não excedam 5 minutos, observado o limite máximo de 10 minutos diários, não devem ser descontadas nem computadas como jornada extraordinária.",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "A tolerância de ponto prevista na CLT é de **até 5 minutos por registro**, desde que o total das variações não ultrapasse **10 minutos no dia**.",
        "É importante não confundir essa regra com uma autorização para o funcionário chegar 10 minutos atrasado todos os dias. O horário contratual continua sendo aquele estabelecido para a jornada, enquanto a legislação estabelece como devem ser tratadas pequenas variações nos registros.",
        "Para empresas que utilizam ponto eletrônico, o controle dessas variações deve ser feito de acordo com a legislação trabalhista e com as regras aplicáveis ao sistema utilizado.",
      ],
    },
  ],
  faqs: [
    {
      q: "Quantos minutos de tolerância existem no ponto?",
      a: "São até 5 minutos por registro, respeitando o limite máximo de 10 minutos no total do dia.",
    },
    {
      q: "A tolerância é de 5 ou 10 minutos?",
      a: "Os dois números são importantes: 5 minutos por registro e 10 minutos por dia.",
    },
    {
      q: "Posso chegar 10 minutos atrasado no trabalho?",
      a: "A CLT não estabelece uma tolerância de 10 minutos para cada atraso. O limite de 10 minutos é diário e deve ser analisado junto ao limite de 5 minutos por registro.",
    },
    {
      q: "Os 5 minutos de tolerância são descontados do salário?",
      a: "As variações que não excedam 5 minutos, observado o limite de 10 minutos diários, não são tratadas como atraso descontável nos termos do artigo 58, §1º, da CLT.",
    },
    {
      q: "A tolerância também vale na saída?",
      a: "Sim. A regra trata das variações nos registros de horário, abrangendo as marcações de entrada e saída.",
    },
    {
      q: "A empresa pode criar uma tolerância maior?",
      a: "Uma política interna não deve ser usada para afastar as regras legais aplicáveis ao controle da jornada. Eventuais regras mais específicas devem ser analisadas conforme a legislação, contrato e normas coletivas aplicáveis.",
    },
  ],
  related: [
    { label: "Controle de jornada", to: "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios" },
    { label: "Banco de horas e HE", to: "/blog/como-funciona-o-banco-de-horas-na-pratica" },
    { label: "Como fechar o ponto", to: "/blog/como-fechar-o-ponto-do-mes" },
    { label: "Como implantar", to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo" },
  ],
};
