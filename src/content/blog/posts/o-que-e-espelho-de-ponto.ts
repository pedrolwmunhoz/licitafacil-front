import type { BlogPost } from "@/content/blog/types";

export const oQueEEspelhoDePonto: BlogPost = {
  slug: "o-que-e-espelho-de-ponto",
  title: "O que é espelho de ponto?",
  hero: {
    titleBefore: "O que é",
    highlight: "espelho de ponto?",
  },
  description:
    "O que é espelho de ponto: relatório de jornada, Espelho de Ponto Eletrônico na Portaria 671, diferença para marcação e comprovante, AEJ e acesso do trabalhador.",
  intro:
    "O espelho de ponto reúne as marcações e as informações tratadas da jornada do funcionário em um período. Na Portaria 671, o Espelho de Ponto Eletrônico tem requisitos mínimos.",
  opening: [
    "O **espelho de ponto** é o relatório que reúne as informações registradas e tratadas sobre a jornada de trabalho de um funcionário durante determinado período.",
    "Ele permite consultar os horários de entrada, saída e demais marcações realizadas pelo trabalhador, além das informações resultantes do tratamento do registro de ponto.",
    "No caso do [registro eletrônico de ponto](https://segponto.com), a [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) estabelece regras específicas para o **Espelho de Ponto Eletrônico**, incluindo as informações mínimas que devem aparecer no relatório.",
  ],
  publishedAt: "2026-09-08",
  updatedAt: "2026-09-18",
  readMinutes: 16,
  ctaTitulo: "Evite erros na jornada antes que virem problemas",
  sumario: [
    { secao: "Para que serve o espelho de ponto?", rotulo: "Para que serve" },
    { secao: "O que deve constar no espelho de ponto?", rotulo: "O que deve constar" },
    { secao: "O espelho de ponto pode ter marcações diferentes das originais?", rotulo: "Marcações tratadas" },
    { secao: "Espelho de ponto é obrigatório?", rotulo: "É obrigatório?" },
    { secao: "Qual a diferença entre espelho de ponto e comprovante de ponto?", rotulo: "Espelho x comprovante" },
    { secao: "O espelho de ponto mostra horas extras?", rotulo: "Horas extras e banco de horas" },
    { secao: "Como conferir um espelho de ponto?", rotulo: "Como conferir" },
    { secao: "Empresa precisa guardar o espelho de ponto?", rotulo: "Por quanto tempo guardar" },
  ],
  sections: [
    {
      title: "Para que serve o espelho de ponto?",
      paragraphs: [
        "O espelho de ponto serve para apresentar de forma organizada os registros da jornada do funcionário.",
        "Por meio dele, é possível conferir informações como:",
      ],
      bullets: [
        "Horários de entrada;",
        "Horários de saída;",
        "Intervalos;",
        "Jornada contratual;",
        "Horas trabalhadas;",
        "Marcações tratadas;",
        "Marcações desconsideradas;",
        "Marcações pré-assinaladas;",
        "Ocorrências da jornada.",
      ],
      closingParagraphs: [
        "O relatório também permite que o trabalhador confira as informações utilizadas para o tratamento da sua jornada.",
      ],
    },
    {
      title: "O que é o espelho de ponto eletrônico?",
      paragraphs: [
        "O **Espelho de Ponto Eletrônico** é o relatório gerado pelo programa de tratamento de registro de ponto.",
        "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) determina que o programa de tratamento gere o **Arquivo Eletrônico de Jornada (AEJ)** e o **relatório Espelho de Ponto Eletrônico**.",
        "O relatório não é simplesmente uma lista das marcações. Ele apresenta também informações resultantes do tratamento dos registros.",
      ],
    },
    {
      title: "O que deve constar no espelho de ponto?",
      paragraphs: [
        "De acordo com o artigo 84 da [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico), o Espelho de Ponto Eletrônico deve conter, no mínimo, determinadas informações.",
      ],
      subsections: [
        {
          title: "Identificação da empresa",
          paragraphs: [
            "O relatório deve apresentar a identificação do empregador, incluindo: **nome**; **CNPJ ou CPF**; e **CEI, CAEPF ou CNO**, quando existente.",
          ],
        },
        {
          title: "Identificação do funcionário",
          paragraphs: [
            "Também devem constar informações que identifiquem o trabalhador, incluindo: **nome**; **CPF**; **data de admissão**; e **cargo ou função**.",
          ],
        },
        {
          title: "Período do relatório",
          paragraphs: [
            "O espelho deve informar a **data de emissão** e o **período correspondente ao relatório**.",
            "Isso permite identificar exatamente qual período da jornada está sendo apresentado.",
          ],
        },
        {
          title: "Jornada contratual",
          paragraphs: [
            "O relatório deve apresentar o **horário e a jornada contratual do empregado**.",
            "Essa informação pode ser comparada com as marcações efetivamente realizadas.",
          ],
        },
        {
          title: "Marcações efetuadas e tratadas",
          paragraphs: [
            "O espelho deve apresentar as marcações realizadas no REP e as marcações tratadas pelo programa de tratamento.",
            "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) menciona marcações **incluídas**, **desconsideradas** e **pré-assinaladas**.",
          ],
        },
        {
          title: "Duração das jornadas realizadas",
          paragraphs: [
            "O relatório também deve apresentar a **duração das jornadas realizadas**, considerando inclusive o horário noturno reduzido quando aplicável.",
          ],
        },
      ],
    },
    {
      title: "Qual a diferença entre marcação de ponto e espelho de ponto?",
      paragraphs: [
        "A **marcação de ponto** é o registro realizado pelo funcionário.",
        "Por exemplo:",
        "**Entrada:** 08:02",
        "**Saída para intervalo:** 12:01",
        "**Retorno:** 13:02",
        "**Saída:** 18:04",
        "O **espelho de ponto** reúne essas marcações e apresenta as informações tratadas referentes à jornada.",
        "Assim, a marcação é o registro individual realizado no sistema, enquanto o espelho é o relatório que organiza e apresenta os dados da jornada.",
      ],
    },
    {
      title: "O espelho de ponto pode ter marcações diferentes das originais?",
      paragraphs: [
        "O programa de tratamento pode acrescentar informações para complementar determinadas situações, como omissões no registro, ausências e movimentações do banco de horas, ou indicar marcações indevidas.",
        "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) estabelece que a função de tratamento dos dados deve se limitar a essas finalidades.",
        "Isso é diferente de simplesmente apagar ou alterar o registro original realizado pelo funcionário.",
      ],
    },
    {
      title: "O funcionário precisa receber o espelho de ponto?",
      paragraphs: [
        "O trabalhador deve ter acesso às informações constantes do Espelho de Ponto Eletrônico.",
        "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) estabelece que esse acesso deve ocorrer por meio de sistema informatizado, **mensalmente de forma eletrônica ou impressa, ou em prazo inferior, a critério da empresa**.",
        "Dessa forma, o funcionário consegue consultar as informações utilizadas para o controle da sua jornada.",
      ],
    },
    {
      title: "Espelho de ponto é obrigatório?",
      paragraphs: [
        "Quando a empresa utiliza um sistema de [registro eletrônico de ponto](https://segponto.com) sujeito às regras da [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico), o programa de tratamento deve gerar o Espelho de Ponto Eletrônico.",
        "O artigo 83 determina que o programa de tratamento gere o relatório Espelho de Ponto Eletrônico e o Arquivo Eletrônico de Jornada.",
        "A obrigação do relatório está relacionada ao uso do sistema eletrônico e às regras aplicáveis ao controle de jornada.",
      ],
    },
    {
      title: "Qual a diferença entre espelho de ponto e comprovante de ponto?",
      paragraphs: [
        "São documentos diferentes.",
        "O **[Comprovante de Registro de Ponto do Trabalhador](/blog/comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras)** está relacionado a uma marcação específica realizada pelo funcionário.",
        "Já o **Espelho de Ponto Eletrônico** apresenta o conjunto de informações da jornada durante determinado período.",
        "Por exemplo:",
        "**Comprovante:** Entrada registrada às 08:02.",
        "**Espelho de ponto:** Apresenta as marcações e informações da jornada de todo o período do relatório.",
        "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) possui regras específicas para o acesso aos comprovantes das marcações realizadas.",
      ],
    },
    {
      title: "O que é espelho de ponto mensal?",
      paragraphs: [
        "O espelho de ponto mensal é o relatório utilizado para apresentar as informações da jornada do trabalhador durante um determinado mês ou período de apuração.",
        "Ele pode reunir as marcações realizadas durante o período e as informações tratadas pelo sistema.",
        "O formato e o período de emissão podem variar conforme a organização da empresa, mas o Espelho de Ponto Eletrônico deve conter as informações mínimas determinadas pela [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico).",
      ],
    },
    {
      title: "Como funciona o espelho de ponto no sistema eletrônico?",
      paragraphs: [
        "Em um [sistema de ponto eletrônico](https://segponto.com), o fluxo normalmente funciona da seguinte maneira:",
      ],
      subsections: [
        {
          title: "1. O funcionário registra o ponto",
          paragraphs: [
            "O trabalhador realiza a marcação utilizando o coletor disponibilizado pela empresa.",
          ],
        },
        {
          title: "2. O sistema armazena a marcação",
          paragraphs: [
            "A informação é registrada no sistema de [registro eletrônico de ponto](https://segponto.com).",
          ],
        },
        {
          title: "3. O programa realiza o tratamento",
          paragraphs: [
            "O programa de tratamento processa os dados e pode complementar determinadas informações permitidas pela regulamentação.",
          ],
        },
        {
          title: "4. O espelho de ponto é gerado",
          paragraphs: [
            "O sistema gera o relatório com as informações da jornada.",
          ],
        },
        {
          title: "5. O funcionário consulta os registros",
          paragraphs: [
            "O trabalhador pode acessar as informações do espelho conforme as regras aplicáveis.",
          ],
        },
      ],
    },
    {
      title: "O espelho de ponto mostra horas extras?",
      paragraphs: [
        "O relatório apresenta a duração das jornadas realizadas e as marcações tratadas.",
        "A partir dessas informações, o sistema de gestão de jornada pode apresentar ocorrências relacionadas a [horas extras](/blog/como-calcular-hora-extra), [banco de horas](/blog/como-funciona-o-banco-de-horas-na-pratica), atrasos e outras situações, conforme sua configuração e as regras aplicáveis à jornada.",
        "É importante diferenciar, porém, o **registro da jornada** do cálculo utilizado pela empresa para [folha de pagamento](/blog/como-calcular-folha-de-pagamento) ou compensação de horas.",
      ],
    },
    {
      title: "Espelho de ponto e banco de horas",
      paragraphs: [
        "O espelho de ponto também pode apresentar informações relacionadas ao tratamento da jornada e às movimentações do banco de horas.",
        "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) permite que o programa de tratamento acrescente informações para complementar movimentações do banco de horas.",
        "Assim, o relatório pode ser utilizado como parte do acompanhamento das horas trabalhadas e das respectivas compensações.",
      ],
    },
    {
      title: "Espelho de ponto pode ser digital?",
      paragraphs: [
        "Sim.",
        "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) permite que o trabalhador tenha acesso às informações do Espelho de Ponto Eletrônico por meio de sistema informatizado.",
        "Portanto, o acesso não precisa necessariamente ocorrer por meio de uma folha impressa. A empresa pode disponibilizar as informações eletronicamente, conforme as regras aplicáveis.",
      ],
    },
    {
      title: "Sistema de ponto pelo celular gera espelho de ponto?",
      paragraphs: [
        "Pode gerar.",
        "O fato de as marcações serem realizadas pelo celular não elimina a necessidade de observar os requisitos aplicáveis ao sistema de registro eletrônico.",
        "No caso de um sistema estruturado como [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), o programa de tratamento deve gerar o Espelho de Ponto Eletrônico conforme as regras da [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico).",
        "O Ministério do Trabalho também reconhece a utilização de tecnologias de [marcação de ponto mobile](https://segponto.com) no contexto do [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas). Confira também [ponto por celular](/blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular).",
      ],
    },
    {
      title: "Como conferir um espelho de ponto?",
      paragraphs: [
        "Ao receber o relatório, o funcionário pode verificar:",
      ],
      bullets: [
        "Se os horários registrados estão corretos;",
        "Se os intervalos aparecem corretamente;",
        "Se existem marcações faltantes;",
        "Se existem marcações indevidas;",
        "Se a jornada contratual está correta;",
        "Se as horas trabalhadas correspondem à jornada realizada;",
        "Se existem ocorrências que precisam de justificativa.",
      ],
      closingParagraphs: [
        "Caso exista alguma divergência, a empresa deve possuir um procedimento para análise e tratamento da situação.",
      ],
    },
    {
      title: "Empresa precisa guardar o espelho de ponto?",
      paragraphs: [
        "Os documentos e arquivos relacionados ao controle eletrônico de jornada estão sujeitos às regras de armazenamento e disponibilização previstas na legislação e na regulamentação aplicável.",
        "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) também determina que o empregador disponibilize os arquivos eletrônicos e relatórios emitidos pelo programa de tratamento ao Auditor-Fiscal do Trabalho quando solicitados.",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "O **espelho de ponto** é o relatório que organiza as informações da jornada do trabalhador a partir dos registros realizados no sistema de ponto.",
        "No registro eletrônico, a [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) determina que o Programa de Tratamento de Registro de Ponto gere o **Espelho de Ponto Eletrônico** e estabelece quais informações devem constar no relatório.",
        "Entre elas estão a identificação da empresa e do funcionário, o período do relatório, a jornada contratual, as marcações efetuadas e tratadas e a duração das jornadas realizadas.",
        "Para empresas que utilizam um [sistema de ponto eletrônico](https://segponto.com), o espelho é uma das principais formas de consultar e acompanhar os registros de jornada dos funcionários.",
      ],
    },
  ],
  faqs: [
    {
      q: "O que é espelho de ponto?",
      a: "É o relatório que reúne as informações da jornada do trabalhador, incluindo as marcações realizadas e os dados tratados pelo sistema.",
    },
    {
      q: "O que aparece no espelho de ponto?",
      a: "Entre as informações mínimas estão a identificação do empregador, identificação do trabalhador, período do relatório, jornada contratual, marcações efetuadas e tratadas e duração das jornadas realizadas.",
    },
    {
      q: "O funcionário tem direito ao espelho de ponto?",
      a: "O trabalhador deve ter acesso às informações constantes do Espelho de Ponto Eletrônico por meio de sistema informatizado, mensalmente de forma eletrônica ou impressa, ou em prazo inferior, conforme a Portaria 671.",
    },
    {
      q: "Espelho de ponto é a mesma coisa que cartão de ponto?",
      a: "Não exatamente. O cartão ou registro de ponto contém as marcações realizadas. O espelho de ponto é o relatório que reúne e apresenta as informações da jornada após o tratamento dos registros.",
    },
    {
      q: "O espelho de ponto pode ser digital?",
      a: "Sim. O acesso pode ser disponibilizado por meio de sistema informatizado.",
    },
    {
      q: "Quem gera o espelho de ponto?",
      a: "O Programa de Tratamento de Registro de Ponto é responsável por gerar o relatório Espelho de Ponto Eletrônico.",
    },
    {
      q: "O espelho de ponto precisa ter assinatura?",
      a: "A necessidade e a forma de assinatura devem ser analisadas conforme o sistema utilizado e as regras aplicáveis. A Portaria 671 estabelece os requisitos mínimos do relatório e as regras para os documentos eletrônicos do sistema.",
    },
  ],
  related: [
    { label: "Portaria 671", to: "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico" },
    { label: "O que é AFD e AEJ", to: "/blog/o-que-e-afd-e-aej" },
    { label: "Ponto por celular", to: "/blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular" },
    { label: "AFD, AEJ e espelho", to: "/blog/o-que-e-afd-e-aej" },
  ],
};
