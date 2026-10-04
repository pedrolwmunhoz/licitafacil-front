import type { BlogPost } from "@/content/blog/types";

export const portaria671RegistroDePontoParaPme: BlogPost = {
  slug: "portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  title: "Portaria 671: o que é, requisitos e regras para o ponto eletrônico",
  hero: {
    titleBefore: "Portaria 671:",
    highlight: "o que é, requisitos e regras",
  },
  description:
    "Portaria 671 do MTE: o que é, requisitos para ponto eletrônico, diferença entre REP-C, REP-A e REP-P, Espelho de Ponto, AEJ, Atestado Técnico e checklist antes de contratar.",
  intro:
    "A Portaria 671 regulamenta o registro eletrônico de ponto e prevê três tipos de sistema: REP-C, REP-A e REP-P. Entenda os requisitos antes de contratar.",
  opening: [
    "A Portaria 671 do Ministério do Trabalho e Emprego (MTE) regulamenta diversas questões relacionadas à legislação trabalhista, incluindo as regras para utilização de sistemas de [registro eletrônico de ponto](https://segponto.com).",
    "Para empresas que utilizam ponto eletrônico, entender a Portaria 671 é importante para verificar se o sistema utilizado atende aos requisitos estabelecidos pela legislação.",
    "A regulamentação prevê três tipos de sistemas de [registro eletrônico de ponto](https://segponto.com): [REP-C](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), [REP-A](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) e [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas).",
  ],
  publishedAt: "2026-03-10",
  updatedAt: "2026-09-17",
  readMinutes: 14,
  ctaTitulo: "Organize o ponto antes da fiscalização bater na porta",
  sumario: [
    { secao: "O que é a Portaria 671?", rotulo: "O que é" },
    { secao: "Quais são os tipos de ponto eletrônico previstos na Portaria 671?", rotulo: "Tipos de REP" },
    { secao: "Quais são os requisitos da Portaria 671 para o ponto eletrônico?", rotulo: "Requisitos" },
    { secao: "O que é o Espelho de Ponto Eletrônico da Portaria 671?", rotulo: "Espelho e AEJ" },
    { secao: "O sistema de ponto precisa ser homologado pelo Ministério do Trabalho?", rotulo: "Homologação e atestado" },
    { secao: "Ponto pelo celular atende à Portaria 671?", rotulo: "Ponto pelo celular" },
    { secao: "Portaria 671 substituiu a Portaria 1510?", rotulo: "Portaria 1510" },
    { secao: "Checklist: o que verificar em um sistema de ponto eletrônico", rotulo: "Checklist" },
  ],
  sections: [
    {
      title: "O que é a Portaria 671?",
      paragraphs: [
        "A Portaria MTP nº 671, de 8 de novembro de 2021, reúne regras relacionadas a diferentes assuntos trabalhistas e estabelece, entre outras disposições, requisitos para os sistemas de [registro eletrônico de ponto](https://segponto.com).",
        "No caso do controle de jornada, a norma regulamenta como as marcações devem ser registradas, armazenadas e tratadas pelo sistema.",
        "A Portaria também define diferentes modalidades de registradores eletrônicos de ponto e os requisitos que devem ser observados por fabricantes, desenvolvedores e empresas que utilizam essas soluções.",
      ],
    },
    {
      title: "O que a Portaria 671 diz sobre o ponto eletrônico?",
      paragraphs: [
        "A regulamentação determina que o sistema de [registro eletrônico de ponto](https://segponto.com) deve registrar fielmente as marcações realizadas pelos trabalhadores.",
        "A norma também proíbe determinadas funcionalidades que possam desvirtuar a finalidade do registro de jornada, incluindo:",
      ],
      bullets: [
        "Restrição de horário para marcação do ponto;",
        "Marcação automática utilizando horários predeterminados ou contratuais;",
        "Exigência de autorização prévia para registrar sobrejornada;",
        "Recursos que permitam alterar os dados registrados pelo empregado.",
      ],
      closingParagraphs: [
        "Essas regras estão relacionadas ao registro fiel da jornada efetivamente realizada.",
      ],
    },
    {
      title: "Quais são os tipos de ponto eletrônico previstos na Portaria 671?",
      paragraphs: [
        "A Portaria 671 estabelece três tipos de sistemas de [registro eletrônico de ponto](https://segponto.com):",
      ],
      subsections: [
        {
          title: "REP-C — Registrador Eletrônico de Ponto Convencional",
          paragraphs: [
            "O [REP-C](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) é o modelo convencional de equipamento utilizado para registrar a jornada.",
            "Ele é um equipamento físico destinado exclusivamente ao registro da jornada de trabalho e possui requisitos específicos definidos pela regulamentação.",
            "O [REP-C](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) deve permanecer no local da prestação do serviço e estar disponível para extração e impressão de dados quando solicitado pela fiscalização.",
          ],
        },
        {
          title: "REP-A — Registrador Eletrônico de Ponto Alternativo",
          paragraphs: [
            "O [REP-A](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) é um conjunto de equipamentos e programas utilizado para registrar a jornada de trabalho.",
            "Uma característica importante é que sua utilização depende de autorização por **convenção coletiva ou acordo coletivo de trabalho**.",
            "O Ministério do Trabalho esclarece que o [REP-A](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) não possui a mesma exigência de homologação junto ao Ministério aplicável ao [REP-C](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas).",
          ],
        },
        {
          title: "REP-P — Registrador Eletrônico de Ponto via Programa",
          paragraphs: [
            "O [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) é o modelo baseado em software.",
            "Ele é composto pelo registrador eletrônico de ponto via programa, pelos coletores de marcações, pelo armazenamento dos registros e pelo programa de tratamento de ponto.",
            "Isso permite que soluções de ponto eletrônico baseadas em software sejam utilizadas dentro das regras estabelecidas pela Portaria 671.",
          ],
        },
      ],
    },
    {
      title: "Qual a diferença entre REP-C, REP-A e REP-P?",
      paragraphs: [
        "A principal diferença está na forma como o registro de ponto é realizado e nos requisitos aplicáveis a cada modalidade.",
      ],
      table: {
        headers: ["Tipo", "Característica", "Requisito específico"],
        rows: [
          ["[REP-C](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas)", "Equipamento convencional", "Certificação e registro do modelo"],
          ["[REP-A](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas)", "Sistema alternativo", "Autorização por acordo ou convenção coletiva"],
          ["[REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas)", "Sistema via programa", "Registro do programa de computador no INPI"],
        ],
      },
      closingParagraphs: [
        "O próprio Ministério do Trabalho diferencia o [REP-A](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) e o [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) principalmente pela necessidade de autorização coletiva para utilização do [REP-A](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas). O [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) não depende dessa autorização, mas deve cumprir os requisitos técnicos previstos na Portaria e possuir registro de programa de computador no INPI.",
      ],
    },
    {
      title: "Quais são os requisitos da Portaria 671 para o ponto eletrônico?",
      paragraphs: [
        "Os requisitos dependem do tipo de registrador utilizado.",
        "Entre as exigências estão regras relacionadas à integridade dos registros, armazenamento das informações, geração de arquivos, relatórios e assinaturas eletrônicas.",
        "O Programa de Tratamento de Registro de Ponto deve gerar o **[Arquivo Eletrônico de Jornada](/blog/o-que-e-afd-e-aej)** e o **[Espelho de Ponto Eletrônico](/blog/o-que-e-espelho-de-ponto)**.",
      ],
    },
    {
      title: "O que é o Espelho de Ponto Eletrônico da Portaria 671?",
      paragraphs: [
        "O **Espelho de Ponto Eletrônico** é um relatório que reúne informações sobre a jornada do trabalhador.",
        "De acordo com a Portaria 671, o relatório deve conter, entre outras informações:",
      ],
      bullets: [
        "Identificação do empregador;",
        "Identificação do trabalhador;",
        "Período do relatório;",
        "Jornada contratual;",
        "Marcações realizadas;",
        "Marcações tratadas;",
        "Duração das jornadas realizadas.",
      ],
      closingParagraphs: [
        "O trabalhador também deve ter acesso às informações do relatório por meio de sistema informatizado, mensalmente de forma eletrônica ou impressa, ou em prazo inferior conforme critério da empresa.",
      ],
    },
    {
      title: "O que é o Arquivo Eletrônico de Jornada?",
      paragraphs: [
        "O **[Arquivo Eletrônico de Jornada (AEJ)](/blog/o-que-e-afd-e-aej)** é um dos arquivos que devem ser gerados pelo Programa de Tratamento de Registro de Ponto.",
        "A Portaria estabelece requisitos para sua geração e assinatura eletrônica.",
        "Esse arquivo faz parte das informações que podem ser solicitadas durante uma fiscalização trabalhista.",
      ],
    },
    {
      title: "O sistema de ponto precisa ser homologado pelo Ministério do Trabalho?",
      paragraphs: [
        "Essa resposta depende do tipo de sistema.",
        "O [REP-C](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) possui requisitos de certificação e registro do modelo. Já o [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) não precisa de homologação como equipamento junto ao Ministério do Trabalho; segundo o próprio MTE, ele precisa possuir certificado de registro de programa de computador no INPI e atender aos requisitos estabelecidos pela Portaria 671.",
        "No caso do [REP-A](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), a validade está vinculada à autorização por convenção ou acordo coletivo de trabalho.",
      ],
    },
    {
      title: "O que é o Atestado Técnico e Termo de Responsabilidade?",
      paragraphs: [
        "O **Atestado Técnico e Termo de Responsabilidade** é um documento que deve ser fornecido pelo fabricante ou desenvolvedor do sistema de registro de ponto e do programa de tratamento.",
        "O documento declara que o equipamento ou programa atende às determinações da regulamentação.",
        "A empresa que utiliza o sistema precisa possuir esse documento para utilizar o sistema de [registro eletrônico de ponto](https://segponto.com) e deve mantê-lo para apresentação à Inspeção do Trabalho.",
      ],
    },
    {
      title: "Sistema de ponto online precisa atender à Portaria 671?",
      paragraphs: [
        "Se o sistema for utilizado como [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), ele precisa atender aos requisitos aplicáveis a esse tipo de sistema.",
        "Isso é especialmente importante para empresas que procuram um [sistema de ponto eletrônico online](https://segponto.com), [ponto eletrônico pelo celular](/blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular) ou uma solução de controle de jornada baseada em software.",
        "O fato de o sistema funcionar pela internet ou por aplicativo não elimina os requisitos estabelecidos para o [registro eletrônico de ponto](https://segponto.com).",
      ],
    },
    {
      title: "Ponto pelo celular atende à Portaria 671?",
      paragraphs: [
        "Um sistema que permite registrar o ponto pelo celular pode ser estruturado como [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), desde que cumpra os requisitos aplicáveis a essa modalidade.",
        "A Portaria define o [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) como um sistema que envolve o registrador via programa, coletores de marcações, armazenamento dos registros e programa de tratamento.",
        "Por isso, ao contratar um sistema de ponto pelo celular, a empresa deve verificar qual é a modalidade de registro utilizada e quais documentos e recursos são fornecidos pelo desenvolvedor.",
      ],
    },
    {
      title: "É obrigatório usar ponto eletrônico?",
      paragraphs: [
        "A obrigatoriedade do controle de jornada não significa necessariamente que toda empresa precise utilizar um equipamento eletrônico.",
        "A legislação trabalhista possui regras específicas sobre controle de jornada e também contempla formas manual e mecânica de registro.",
        "Quando a empresa opta pelo registro eletrônico, entretanto, deve utilizar uma das modalidades de sistema previstas na regulamentação.",
      ],
    },
    {
      title: "Como saber se um sistema de ponto está de acordo com a Portaria 671?",
      paragraphs: ["Antes de contratar um sistema, a empresa pode verificar alguns pontos:"],
      subsections: [
        {
          title: "O sistema informa se é REP-P?",
          paragraphs: [
            "Para sistemas baseados em software, verifique se a solução é estruturada como [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) e atende aos requisitos correspondentes.",
          ],
        },
        {
          title: "O fornecedor fornece o Atestado Técnico?",
          paragraphs: [
            "O fornecedor deve disponibilizar o **Atestado Técnico e Termo de Responsabilidade** quando aplicável, conforme as regras da Portaria.",
          ],
        },
        {
          title: "O sistema gera o Espelho de Ponto?",
          paragraphs: [
            "Verifique se o sistema consegue gerar o Espelho de Ponto Eletrônico com as informações exigidas.",
          ],
        },
        {
          title: "O sistema gera o Arquivo Eletrônico de Jornada?",
          paragraphs: [
            "Esse é outro ponto importante para avaliar durante a contratação.",
          ],
        },
        {
          title: "As marcações podem ser alteradas?",
          paragraphs: [
            "O sistema deve preservar a integridade das marcações realizadas e não pode possuir mecanismos proibidos pela regulamentação para alterar os registros originais.",
          ],
        },
      ],
    },
    {
      title: "Quais sistemas de ponto podem ser usados segundo a Portaria 671?",
      paragraphs: [
        "A empresa pode utilizar um sistema baseado em [REP-C](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), [REP-A](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) ou [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), desde que sejam observados os requisitos correspondentes a cada modalidade.",
        "Para soluções digitais, o [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) é particularmente relevante porque a própria regulamentação contempla sistemas de registro de ponto via programa.",
      ],
    },
    {
      title: "Portaria 671 substituiu a Portaria 1510?",
      paragraphs: [
        "A Portaria 671 trouxe uma nova regulamentação para o [registro eletrônico de ponto](https://segponto.com) e substituiu regras anteriores relacionadas ao tema.",
        "Entre as mudanças está a organização dos sistemas em [REP-C](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), [REP-A](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) e [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas).",
        "Também deixou de existir a obrigatoriedade de cadastro do [REP-C](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) no antigo sistema CAREP para empregadores, conforme esclarecimento do Ministério do Trabalho.",
      ],
    },
    {
      title: "A Portaria 671 ainda está em vigor?",
      paragraphs: [
        "Sim. A Portaria 671 continua sendo utilizada pelo Ministério do Trabalho como referência para a regulamentação do [registro eletrônico de ponto](https://segponto.com).",
        "O próprio MTE mantém uma versão compilada da Portaria e uma página específica com informações e perguntas frequentes sobre os registros eletrônicos de ponto.",
      ],
    },
    {
      title: "Checklist: o que verificar em um sistema de ponto eletrônico",
      paragraphs: ["Antes de contratar uma plataforma, confira:"],
      bullets: [
        "Qual modalidade de REP o sistema utiliza;",
        "Se atende à Portaria 671;",
        "Se fornece o Atestado Técnico e Termo de Responsabilidade;",
        "Se gera o Espelho de Ponto Eletrônico;",
        "Se gera o Arquivo Eletrônico de Jornada;",
        "Como os registros são armazenados;",
        "Como funciona o tratamento das marcações;",
        "Como o funcionário acessa seus registros;",
        "Como são realizadas justificativas e ajustes;",
        "Quais relatórios estão disponíveis;",
        "Como funciona a exportação dos dados.",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "A Portaria 671 estabelece requisitos importantes para empresas que utilizam registro eletrônico de jornada.",
        "Antes de contratar um sistema de ponto, não basta verificar apenas preço, aplicativo ou facilidade de uso. É necessário conferir **qual modalidade de REP é utilizada, quais documentos o fornecedor disponibiliza e se o sistema atende aos requisitos aplicáveis à modalidade escolhida**.",
        "Para empresas que procuram uma solução digital, o [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) é uma das modalidades expressamente previstas pela regulamentação e permite que o registro seja realizado por meio de programas e coletores de marcação, desde que observados os requisitos definidos na Portaria 671.",
      ],
    },
  ],
  faqs: [
    {
      q: "O que é a Portaria 671 do ponto eletrônico?",
      a: "É a regulamentação do Ministério do Trabalho que estabelece regras para diferentes formas de registro eletrônico de jornada, incluindo REP-C, REP-A e REP-P.",
    },
    {
      q: "Qual REP é usado em sistemas de ponto online?",
      a: "Sistemas baseados em software podem utilizar o modelo REP-P, desde que cumpram os requisitos estabelecidos pela Portaria 671.",
    },
    {
      q: "REP-P precisa de homologação?",
      a: "O MTE informa que o REP-P não precisa de certificação e homologação como equipamento junto ao Ministério. Ele precisa de registro de programa de computador no INPI e atender aos requisitos previstos na Portaria 671.",
    },
    {
      q: "REP-A precisa de acordo coletivo?",
      a: "Sim. A utilização do REP-A depende de autorização por convenção ou acordo coletivo de trabalho.",
    },
    {
      q: "O ponto pelo celular pode ser utilizado?",
      a: "Pode existir uma solução de ponto pelo celular estruturada como REP-P, desde que o sistema cumpra os requisitos aplicáveis ao registro eletrônico de ponto.",
    },
    {
      q: "O sistema precisa fornecer Atestado Técnico?",
      a: "O empregador somente pode utilizar o sistema de registro eletrônico de ponto e o programa de tratamento se possuir o Atestado Técnico e Termo de Responsabilidade emitido pelo fabricante ou desenvolvedor, conforme o art. 89.",
    },
  ],
  related: [
    { label: "REP-C, REP-A e REP-P", to: "/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas" },
    { label: "AFD, AEJ e espelho", to: "/blog/o-que-e-afd-e-aej" },
    { label: "Checklist Portaria 671", to: "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico" },
    { label: "Ponto por celular", to: "/blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular" },
  ],
};
