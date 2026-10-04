import type { BlogPost } from "@/content/blog/types";

const CALC = "/calculadoras/banco-de-horas";

export const comoFuncionaOBancoDeHorasNaPratica: BlogPost = {
  slug: "como-funciona-o-banco-de-horas-na-pratica",
  title: "Como funciona o banco de horas na prática",
  hero: {
    titleBefore: "Como funciona",
    highlight: "o banco de horas",
  },
  description:
    "Como funciona o banco de horas na prática: saldo positivo e negativo, cálculo, prazos da CLT, hora extra, atrasos e controle no ponto eletrônico.",
  intro:
    "O banco de horas funciona como um saldo: horas além da jornada geram crédito; compensação e redução de jornada geram débito, conforme o acordo.",
  opening: [
    "O **banco de horas** funciona como um saldo de horas trabalhadas pelo funcionário. Quando ele trabalha além da jornada, pode acumular horas positivas para compensar posteriormente. Quando trabalha menos horas em determinado dia, pode utilizar esse saldo, conforme as regras do banco de horas da empresa.",
    "Por exemplo:",
    "Trabalhou 1 hora a mais → **+1 hora**",
    "Trabalhou 2 horas a mais → **+2 horas**",
    "Saiu 1 hora mais cedo → **-1 hora**",
    "Compensou 2 horas → **-2 horas**",
    "Se o funcionário tinha **+4 horas** e utilizou 2 horas para sair mais cedo, passa a ter:",
    "**+4h - 2h = +2h**",
    "O banco de horas está previsto no artigo 59 da CLT, que estabelece diferentes formas e prazos para a compensação da jornada.",
  ],
  publishedAt: "2026-06-15",
  updatedAt: "2026-09-18",
  readMinutes: 14,
  ctaTitulo: "Evite erros na jornada antes que virem problemas",
  sumario: [
    { secao: "Como funciona o banco de horas?", rotulo: "Como funciona" },
    { secao: "Como calcular o banco de horas?", rotulo: "Como calcular" },
    { secao: "Como funcionam as horas positivas?", rotulo: "Horas positivas e negativas" },
    { secao: "Qual é o prazo para compensar o banco de horas?", rotulo: "Prazo de compensação" },
    { secao: "Banco de horas é a mesma coisa que hora extra?", rotulo: "Banco de horas x hora extra" },
    { secao: "O que acontece com o banco de horas na demissão?", rotulo: "Na demissão" },
    { secao: "Exemplo de banco de horas na prática", rotulo: "Exemplo prático" },
  ],
  sections: [
    {
      title: "Como funciona o banco de horas?",
      paragraphs: [
        "Na prática, o banco de horas compara a **jornada que o funcionário deveria cumprir** com a **jornada que ele efetivamente cumpriu**.",
        "Imagine um funcionário que trabalha 8 horas por dia:",
      ],
      table: {
        headers: ["Dia", "Jornada prevista", "Jornada realizada", "Saldo"],
        rows: [
          ["Segunda", "8h", "9h", "+1h"],
          ["Terça", "8h", "8h", "0h"],
          ["Quarta", "8h", "10h", "+2h"],
          ["Quinta", "8h", "7h", "-1h"],
          ["Sexta", "8h", "8h", "0h"],
        ],
      },
      closingParagraphs: [
        "O saldo da semana será:",
        "**+1h + 2h - 1h = +2 horas**",
        "O funcionário termina a semana com **2 horas positivas no banco**.",
        `Você também pode [simular na calculadora de banco de horas](${CALC}).`,
      ],
    },
    {
      title: "Como calcular o banco de horas?",
      paragraphs: [
        "O cálculo do banco de horas considera as horas acumuladas e as horas utilizadas para compensação. Para chegar ao saldo atual, basta considerar o saldo anterior, adicionar as horas trabalhadas além da jornada e descontar as horas utilizadas.",
        "A fórmula é:",
        "**Saldo anterior + horas acumuladas - horas compensadas = saldo atual**",
      ],
      subsections: [
        {
          title: "Exemplo",
          paragraphs: [
            "Um funcionário começa o mês com **+3 horas** no banco. Durante o mês, acumula mais **5 horas**, utiliza **2 horas para sair mais cedo** e depois utiliza mais **1 hora para compensação**.",
            "O cálculo será:",
            "**3h + 5h - 2h - 1h = +5h**",
            "Nesse caso, o saldo final será de **5 horas positivas**.",
          ],
        },
      ],
    },
    {
      title: "Como funcionam as horas positivas?",
      paragraphs: [
        "As horas positivas são justamente as horas acumuladas pelo funcionário quando ele trabalha além da jornada prevista. Essas horas ficam disponíveis para serem utilizadas posteriormente em compensações, de acordo com as regras do banco de horas.",
        "Por exemplo, se o funcionário trabalha **1 hora a mais na segunda-feira** e outras **2 horas na quarta-feira**, acumula **3 horas positivas** no banco.",
        "Esse saldo, porém, também pode ser reduzido quando o funcionário utiliza horas para compensar períodos em que trabalha menos do que sua jornada. É nesse contexto que entram as chamadas horas negativas.",
      ],
    },
    {
      title: "Como funcionam as horas negativas?",
      paragraphs: [
        "As horas negativas representam períodos em que o funcionário ficou abaixo da jornada prevista, quando essa diferença puder ser compensada pelo banco de horas.",
        "Por exemplo, se a jornada prevista é de **8 horas**, mas o funcionário trabalha apenas **7 horas**, fica com **1 hora negativa** naquele dia. Se ele tinha **+3 horas** no banco, o saldo passa para **+2 horas**.",
        "Essa compensação pode acontecer de diferentes formas. Entre elas está a utilização do banco para reduzir a jornada em determinado dia.",
      ],
    },
    {
      title: "Banco de horas pode ser usado para sair mais cedo?",
      paragraphs: [
        "Sim, desde que a compensação esteja de acordo com as regras do banco de horas adotado pela empresa.",
        "Se o funcionário possui **+4 horas** e sai **2 horas mais cedo**, essas 2 horas são descontadas do saldo. Assim, ele passa a ter **+2 horas** disponíveis.",
        "Da mesma forma, o banco pode ser utilizado para compensar uma entrada mais tarde.",
      ],
    },
    {
      title: "Banco de horas pode ser usado para chegar mais tarde?",
      paragraphs: [
        "Sim, quando essa forma de compensação for permitida pelas regras do banco de horas.",
        "Por exemplo, se o funcionário normalmente entra às **8h** e utiliza **1 hora do banco** para entrar às **9h**, seu saldo é reduzido em 1 hora. Se tinha **+3 horas**, passa a ter **+2 horas**.",
        "Além de pequenas reduções na jornada, o saldo também pode ser utilizado para compensar períodos maiores, como uma folga.",
      ],
    },
    {
      title: "Banco de horas pode gerar folga?",
      paragraphs: [
        "Sim. Quando o funcionário possui saldo suficiente, as horas acumuladas podem ser utilizadas para compensar uma folga, conforme as regras aplicáveis ao banco de horas.",
        "Se o funcionário possui **+8 horas** e sua jornada diária é de **8 horas**, uma folga correspondente a um dia pode consumir todo o saldo:",
        "**+8h - 8h = 0h**",
        "Se utilizar apenas parte do saldo, o restante continua disponível para futuras compensações. Por exemplo, quem possui **+8 horas** e utiliza **4 horas** ficará com **+4 horas** no banco.",
      ],
    },
    {
      title: "Qual é o prazo para compensar o banco de horas?",
      paragraphs: [
        "O prazo depende da forma como o banco de horas foi estabelecido.",
      ],
      subsections: [
        {
          title: "Banco de horas por acordo ou convenção coletiva",
          paragraphs: [
            "A compensação pode ocorrer em período máximo de **1 ano**, respeitados os limites previstos na legislação.",
          ],
        },
        {
          title: "Banco de horas por acordo individual escrito",
          paragraphs: [
            "A CLT permite banco de horas por acordo individual escrito, desde que a compensação ocorra em até **6 meses**.",
          ],
        },
        {
          title: "Compensação dentro do mesmo mês",
          paragraphs: [
            "A CLT também permite regime de compensação estabelecido por acordo individual, tácito ou escrito, para compensação dentro do **mesmo mês**.",
            "Por isso, não existe um único prazo que sirva para todos os bancos de horas.",
          ],
        },
      ],
    },
    {
      title: "Quantas horas podem ser feitas por dia no banco de horas?",
      paragraphs: [
        "A regra geral do artigo 59 da CLT permite o acréscimo de até **2** [horas extras](/blog/como-calcular-hora-extra) por dia.",
        "Por exemplo, em uma jornada normal de 8 horas, o trabalhador pode chegar a uma jornada de 10 horas, observadas as condições legais e o regime aplicável.",
        "Isso não significa que a empresa possa simplesmente exigir qualquer quantidade de horas e colocar tudo no banco.",
      ],
    },
    {
      title: "Banco de horas é a mesma coisa que hora extra?",
      paragraphs: [
        "Não.",
        "A **hora extra** é o trabalho realizado além da jornada normal e, pela regra geral, tem remuneração pelo menos 50% superior à hora normal.",
        "No banco de horas, determinadas horas excedentes podem ser compensadas posteriormente, em vez de serem pagas imediatamente como horas extras, desde que exista um regime válido de compensação.",
      ],
      subsections: [
        {
          title: "Exemplo",
          paragraphs: [
            "Funcionário:",
            "**Jornada:** 8 horas",
            "Trabalhou:",
            "**9 horas**",
            "Excedente:",
            "**1 hora**",
            "Se aquela hora estiver abrangida pelo banco de horas:",
            "**Saldo = +1h**",
            "Se não houver compensação aplicável, a hora poderá ser tratada como hora extra, conforme a legislação e as regras aplicáveis.",
          ],
        },
      ],
    },
    {
      title: "Como funciona o banco de horas com atrasos?",
      paragraphs: [
        "Quando o atraso pode ser compensado pelo banco de horas, ele é descontado do saldo.",
        "Exemplo:",
        "**Jornada:** 8h às 17h",
        "**Chegada:** 8h30",
        "**Atraso:** 30 minutos",
        "Se o funcionário tinha **+2 horas** no banco, passa a ter **+1h30**.",
        "A compensação depende das regras do banco de horas adotado pela empresa.",
      ],
    },
    {
      title: "Como funciona o banco de horas com saída antecipada?",
      paragraphs: [
        "A saída antecipada também pode ser descontada do banco de horas.",
        "Exemplo:",
        "**Horário de saída:** 17h",
        "**Saída antecipada:** 16h",
        "**Diferença:** 1 hora",
        "Se o funcionário tinha **+5 horas** no banco, passa a ter **+4 horas**.",
      ],
    },
    {
      title: "Como funciona o banco de horas no fechamento do mês?",
      paragraphs: [
        "No [fechamento do ponto](/blog/como-fechar-o-ponto-do-mes), a empresa confere as marcações e calcula o saldo de cada funcionário.",
        "Exemplo:",
        "**Saldo anterior:** +2h",
        "Durante o mês:",
        "horas acumuladas: +6h",
        "horas compensadas: -4h",
        "outras movimentações: -1h",
        "Saldo:",
        "**2 + 6 - 4 - 1 = +3 horas**",
        "O funcionário termina o período com **3 horas positivas**.",
        "Essas horas poderão continuar no banco ou ser compensadas, conforme o prazo e as regras do regime adotado.",
      ],
    },
    {
      title: "Como funciona o banco de horas no ponto eletrônico?",
      paragraphs: [
        "Quando a empresa utiliza um [sistema eletrônico de registro de ponto](/blog/registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras), as marcações realizadas pelo funcionário servem de base para o cálculo da jornada.",
        "Por exemplo:",
        "**Entrada:** 08:00",
        "**Saída para intervalo:** 12:00",
        "**Retorno:** 13:00",
        "**Saída:** 18:00",
        "Total trabalhado:",
        "**9 horas**",
        "Se a jornada prevista for de 8 horas:",
        "**Saldo = +1 hora**",
        "O sistema pode então registrar essa movimentação no banco de horas, conforme as regras configuradas.",
        "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) determina que o registro eletrônico de ponto preserve fielmente as marcações realizadas pelo trabalhador. O tratamento dos dados pode complementar omissões e registrar movimentações do banco de horas, mas não pode simplesmente criar marcações falsas para alterar a jornada registrada.",
      ],
    },
    {
      title: "Como funciona o banco de horas quando o funcionário faz hora extra?",
      paragraphs: [
        "Imagine:",
        "**Jornada:** 8h",
        "**Trabalho realizado:** 10h",
        "O funcionário trabalhou:",
        "**2 horas além da jornada**",
        "Se o regime de banco de horas abranger essas horas:",
        "**Crédito = +2h**",
        "Posteriormente, ele pode compensar essas horas de acordo com as regras do banco.",
        "O limite geral de horas extras é de até 2 horas por dia.",
      ],
    },
    {
      title: "O que acontece com o banco de horas na demissão?",
      paragraphs: [
        "Se o contrato terminar sem que as horas extraordinárias tenham sido compensadas integralmente, a CLT determina o pagamento das horas extras não compensadas, calculadas sobre a remuneração existente na data da rescisão.",
        "Por exemplo:",
        "Saldo não compensado:",
        "**+10 horas**",
        "Na rescisão, essas horas devem ser tratadas conforme a regra prevista no artigo 59 da CLT.",
      ],
    },
    {
      title: "Banco de horas pode ficar negativo?",
      paragraphs: [
        "Pode existir saldo negativo dentro de um regime de compensação, mas isso não significa que qualquer saldo negativo possa ser automaticamente descontado do salário.",
        "É necessário verificar as regras que estabeleceram o banco de horas e a origem desse saldo.",
        "Por exemplo, não é a mesma situação:",
      ],
      bullets: [
        "funcionário que saiu mais cedo para compensar posteriormente;",
        "funcionário que faltou injustificadamente;",
        "funcionário que teve uma ausência justificada;",
        "funcionário que recebeu uma folga antecipada.",
      ],
      closingParagraphs: [
        "Cada ocorrência pode ter um tratamento diferente.",
      ],
    },
    {
      title: "Como controlar o banco de horas dos funcionários?",
      paragraphs: [
        "Para cada funcionário, é importante acompanhar:",
      ],
      bullets: [
        "jornada prevista;",
        "horas trabalhadas;",
        "horas excedentes;",
        "atrasos;",
        "saídas antecipadas;",
        "faltas;",
        "compensações;",
        "horas positivas;",
        "horas negativas;",
        "saldo acumulado.",
      ],
      closingParagraphs: [
        "Em um [sistema de ponto eletrônico](https://segponto.com), essas informações podem ser calculadas a partir das marcações realizadas pelo funcionário.",
        "Isso facilita o acompanhamento do saldo e o fechamento do ponto.",
      ],
    },
    {
      title: "Exemplo de banco de horas na prática",
      paragraphs: [
        "Considere um funcionário com jornada de 8 horas:",
      ],
      table: {
        headers: ["Dia", "Jornada", "Trabalhado", "Saldo"],
        rows: [
          ["Segunda", "8h", "9h", "+1h"],
          ["Terça", "8h", "10h", "+2h"],
          ["Quarta", "8h", "8h", "0h"],
          ["Quinta", "8h", "7h", "-1h"],
          ["Sexta", "8h", "8h", "0h"],
        ],
      },
      closingParagraphs: [
        "Saldo:",
        "**+1h + 2h - 1h = +2h**",
        "Na semana seguinte, o funcionário utiliza essas duas horas para sair mais cedo:",
        "**Segunda:** -1h",
        "**Terça:** -1h",
        "Resultado:",
        "**+2h - 2h = 0h**",
        "O banco foi compensado.",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "O banco de horas funciona acumulando **créditos e débitos de jornada**.",
        "Se o funcionário trabalha uma hora a mais:",
        "**+1h**",
        "Se depois utiliza essa hora para sair mais cedo:",
        "**-1h**",
        "Resultado:",
        "**saldo = 0h**",
        "O prazo para compensação depende da forma como o banco foi estabelecido, e o controle deve considerar as regras da CLT e, quando houver registro eletrônico de ponto, as exigências da Portaria 671.",
        `[Simule na calculadora de banco de horas](${CALC}).`,
      ],
    },
  ],
  faqs: [
    {
      q: "O que é banco de horas?",
      a: "É um regime de compensação de jornada em que determinadas horas trabalhadas além ou aquém da jornada podem gerar créditos ou débitos para compensação posterior.",
    },
    {
      q: "Banco de horas paga hora extra?",
      a: "As horas submetidas validamente ao banco podem ser compensadas em vez de serem imediatamente pagas como horas extras. As regras dependem do regime de compensação adotado.",
    },
    {
      q: "Quanto tempo dura o banco de horas?",
      a: "Depende da forma de instituição. Pela CLT, pode haver compensação em até 1 ano por negociação coletiva ou até 6 meses por acordo individual escrito. Também existe a compensação dentro do mesmo mês.",
    },
    {
      q: "Posso usar banco de horas para sair mais cedo?",
      a: "Sim, desde que a compensação esteja de acordo com as regras do banco de horas.",
    },
    {
      q: "Posso usar banco de horas para chegar mais tarde?",
      a: "Pode ser possível, desde que a compensação esteja prevista ou autorizada pelo regime adotado.",
    },
    {
      q: "Banco de horas pode gerar folga?",
      a: "Sim. As horas acumuladas podem ser utilizadas para compensar períodos de descanso, conforme as regras estabelecidas.",
    },
    {
      q: "Banco de horas pode ficar negativo?",
      a: "Pode haver saldo negativo, mas o tratamento desse saldo depende das regras do banco e da situação que gerou o débito.",
    },
    {
      q: "O que acontece com o banco de horas na demissão?",
      a: "As horas extraordinárias não compensadas devem ser pagas na rescisão, conforme o artigo 59 da CLT.",
    },
    {
      q: "O banco de horas precisa ser controlado no ponto eletrônico?",
      a: "Quando a empresa utiliza registro eletrônico, as movimentações do banco podem ser tratadas pelo sistema de ponto, respeitando as regras da Portaria 671 e a fidelidade das marcações.",
    },
  ],
  related: [
    { label: "Calculadora de banco de horas", to: CALC },
    { label: "Como calcular hora extra", to: "/blog/como-calcular-hora-extra" },
    { label: "Calculadora de hora extra", to: "/calculadoras/hora-extra" },
    { label: "Como fechar o ponto do mês", to: "/blog/como-fechar-o-ponto-do-mes" },
  ],
};
