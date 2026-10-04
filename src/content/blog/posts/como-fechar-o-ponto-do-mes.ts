import type { BlogPost } from "@/content/blog/types";

export const comoFecharOPontoDoMes: BlogPost = {
  slug: "como-fechar-o-ponto-do-mes",
  title: "Como fechar o ponto do mês",
  hero: {
    titleBefore: "Como fechar o ponto do mês",
    highlight: "passo a passo",
  },
  description:
    "Como fechar o ponto do mês passo a passo: período de apuração, marcações faltantes, horas extras, banco de horas, Espelho de Ponto e envio para a folha.",
  intro:
    "Fechar o ponto do mês é encerrar a apuração das jornadas de um período para que as informações possam ser utilizadas na folha de pagamento.",
  opening: [
    "Fechar o ponto do mês é o momento em que a empresa **encerra a apuração das jornadas de um determinado período** para que as informações possam ser utilizadas na folha de pagamento.",
    "Na prática, o fechamento serve para transformar os registros feitos durante o período em uma apuração definitiva de horas trabalhadas, [horas extras](/blog/como-calcular-hora-extra), atrasos, faltas, [adicional noturno](/blog/como-calcular-horas-noturnas), [banco de horas](/blog/como-funciona-o-banco-de-horas-na-pratica), compensações e outras ocorrências da jornada.",
    "O ponto pode ser fechado no último dia do mês ou antes disso, dependendo do período de apuração adotado pela empresa. Existem, inclusive, acordos coletivos que estabelecem fechamento antecipado para permitir o processamento da [folha](/blog/como-calcular-folha-de-pagamento).",
  ],
  publishedAt: "2026-09-08",
  updatedAt: "2026-09-18",
  readMinutes: 18,
  ctaTitulo: "Evite erros na jornada antes que virem problemas",
  sumario: [
    { secao: "Como fechar o ponto do mês?", rotulo: "Visão geral" },
    { secao: "1. Confira qual período será fechado", rotulo: "Período e marcações" },
    { secao: "3. Resolva as pendências do ponto", rotulo: "Pendências" },
    { secao: "4. Confira as horas extras", rotulo: "Horas extras, atrasos e faltas" },
    { secao: "7. Confira o banco de horas", rotulo: "Banco de horas e adicionais" },
    { secao: "11. Gere o espelho de ponto", rotulo: "Espelho e fechamento" },
    { secao: "O que acontece depois de fechar o ponto?", rotulo: "Depois do fechamento" },
    { secao: "Checklist para fechamento do ponto", rotulo: "Checklist" },
  ],
  sections: [
    {
      title: "Como fechar o ponto do mês?",
      paragraphs: [
        "O fechamento do ponto normalmente segue esta ordem:",
        "**definir o período → conferir as marcações → resolver pendências → apurar as horas → revisar o resultado → fechar o período → enviar para a folha**",
        "Em um [sistema de ponto eletrônico](https://segponto.com), o processo costuma ser feito dentro da própria tela de apuração ou fechamento da competência.",
      ],
    },
    {
      title: "1. Confira qual período será fechado",
      paragraphs: [
        "Antes de fechar o ponto, é necessário saber **qual período de apuração está sendo utilizado**.",
        "Por exemplo, uma empresa pode apurar **01/09 a 30/09**.",
        "Mas também pode trabalhar com um período diferente, como **21/08 a 20/09**.",
        "Nesse segundo caso, o ponto não deve ser fechado simplesmente considerando o mês do calendário.",
        "O período utilizado precisa ser compatível com a forma como a empresa organiza sua apuração e folha de pagamento.",
        "Por isso, antes de clicar em “fechar ponto”, confira a **data inicial e a data final da competência**.",
      ],
    },
    {
      title: "2. Confira se existem marcações faltando",
      paragraphs: [
        "Depois de definir o período, o primeiro problema a procurar são as marcações incompletas.",
        "Por exemplo: **08:02 → 12:01 → 13:03 → sem saída**",
        "Nesse caso, existe uma jornada sem a última marcação.",
        "Também podem aparecer situações como:",
      ],
      bullets: [
        "Entrada sem saída;",
        "Saída sem entrada;",
        "Apenas uma marcação no dia;",
        "Intervalo incompleto;",
        "Marcação duplicada;",
        "Jornada iniciada em um dia e terminada no seguinte.",
      ],
      closingParagraphs: [
        "Essas situações precisam ser tratadas antes do fechamento.",
        "O Ministério do Trabalho determina que as marcações de entrada e saída sejam fiéis à realidade. Quando ocorre esquecimento de marcação, o Programa de Tratamento de Registro de Ponto pode complementar a omissão, dentro das regras estabelecidas pela [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico).",
      ],
    },
    {
      title: "3. Resolva as pendências do ponto",
      paragraphs: [
        "Depois de identificar as marcações incompletas, é preciso verificar o motivo de cada ocorrência.",
        "Imagine um funcionário com **entrada 08:00**, **intervalo 12:00 / 13:00** e **saída não registrada**.",
        "O responsável pelo ponto precisa verificar se houve realmente esquecimento da marcação e realizar o tratamento correspondente.",
        "O sistema de tratamento não pode simplesmente inventar horários para completar a jornada.",
        "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) limita o tratamento dos dados à complementação de informações em situações como omissões de registro, ausências, movimentações do [banco de horas](/blog/como-funciona-o-banco-de-horas-na-pratica) ou indicação de marcações indevidas.",
      ],
    },
    {
      title: "4. Confira as horas extras",
      paragraphs: [
        "Com as marcações corrigidas e tratadas, o próximo passo é conferir as horas trabalhadas além da jornada prevista.",
        "Por exemplo: **jornada prevista 08:00 às 17:00** e **jornada registrada 08:00 às 18:30**.",
        "Se o intervalo e os demais registros estiverem corretos, o sistema poderá apontar o período excedente como [hora extra](/blog/como-calcular-hora-extra), conforme as regras de jornada e compensação aplicáveis.",
        "É importante não confundir **marcação de hora extra** com **tratamento do ponto**.",
        "O trabalhador deve registrar a saída quando efetivamente encerra a jornada. A empresa não deve inserir uma nova marcação artificial apenas para gerar horas extras. O próprio MTE esclarece essa questão na FAQ da [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico). Simule na [calculadora de hora extra](/calculadoras/hora-extra).",
      ],
    },
    {
      title: "5. Confira atrasos e saídas antecipadas",
      paragraphs: [
        "O fechamento também deve considerar os períodos em que o trabalhador ficou abaixo da jornada prevista.",
        "Exemplo: **jornada prevista 08:00 às 17:00** e **entrada 08:27**.",
        "O sistema poderá apontar atraso, mas o resultado final depende das regras de [tolerância](/blog/tolerancia-de-ponto-na-clt-quantos-minutos-o-funcionario-pode-atrasar), justificativas, compensações e demais condições aplicáveis àquele empregado.",
        "O mesmo vale para saídas antecipadas.",
        "O objetivo da conferência é evitar que uma ocorrência seja enviada para a folha sem antes verificar se ela realmente deve ser considerada.",
      ],
    },
    {
      title: "6. Confira faltas e ausências",
      paragraphs: [
        "Também é necessário verificar os dias em que não houve jornada.",
        "Uma ausência pode corresponder a diferentes situações:",
      ],
      bullets: [
        "Falta injustificada;",
        "Falta justificada;",
        "Férias;",
        "Afastamento;",
        "Feriado;",
        "Folga;",
        "Licença;",
        "Compensação.",
      ],
      closingParagraphs: [
        "Por isso, **um dia sem marcação não significa automaticamente uma falta**.",
        "Antes de fechar o ponto, o responsável deve verificar a situação daquele dia.",
      ],
    },
    {
      title: "7. Confira o banco de horas",
      paragraphs: [
        "Se a empresa utiliza [banco de horas](/blog/como-funciona-o-banco-de-horas-na-pratica), o fechamento precisa considerar o saldo do período.",
        "Exemplo: **saldo anterior +4 horas**, **crédito no período +7 horas**, **compensações -3 horas**, **saldo após apuração +8 horas**.",
        "Esse saldo pode ser utilizado posteriormente conforme as regras aplicáveis ao banco de horas. Confira também a landing de [banco de horas e horas extras](/blog/como-funciona-o-banco-de-horas-na-pratica) e a [calculadora de banco de horas](/calculadoras/banco-de-horas).",
        "As movimentações do banco de horas fazem parte justamente das informações que podem ser tratadas no Programa de Tratamento de Registro de Ponto.",
      ],
    },
    {
      title: "8. Confira o adicional noturno",
      paragraphs: [
        "Para trabalhadores que realizam jornada noturna, também é importante conferir se o período noturno foi calculado corretamente. Veja [como calcular horas noturnas](/blog/como-calcular-horas-noturnas) ou [simule na calculadora](/calculadoras/horas-noturnas).",
        "A apuração deve considerar a jornada efetivamente registrada e as regras aplicáveis ao trabalho noturno.",
        "Em sistemas eletrônicos, o [Espelho de Ponto](/blog/o-que-e-espelho-de-ponto) deve apresentar a duração das jornadas, considerando inclusive o horário noturno reduzido quando aplicável.",
      ],
    },
    {
      title: "9. Confira os intervalos",
      paragraphs: [
        "Antes de fechar o período, confira também os intervalos.",
        "Exemplo: **entrada 08:00**, **saída intervalo 12:00**, **retorno 13:00**, **saída 17:00**.",
        "Nesse caso, foram registradas oito horas de trabalho e uma hora de intervalo.",
        "Se houver diferença entre o intervalo previsto e o registrado, o responsável deve verificar a ocorrência antes do fechamento.",
        "Quando existe [pré-assinalação do intervalo intrajornada](/blog/intervalo-pre-assinalado-o-que-e-como-funciona-e-quais-sao-as-regras), as informações também precisam aparecer corretamente no [Espelho de Ponto](/blog/o-que-e-espelho-de-ponto) e no [AEJ](/blog/o-que-e-afd-e-aej).",
      ],
    },
    {
      title: "10. Faça a conferência final",
      paragraphs: [
        "Depois de resolver as ocorrências, faça uma última conferência do período.",
        "O responsável pelo ponto deve verificar principalmente:",
      ],
      bullets: [
        "Empregados com marcações incompletas;",
        "Horas extras;",
        "Atrasos;",
        "Faltas;",
        "Banco de horas;",
        "Intervalos;",
        "Férias;",
        "Afastamentos;",
        "Feriados;",
        "Jornadas noturnas.",
      ],
      closingParagraphs: [
        "Essa etapa é importante porque, depois do fechamento, os dados podem ser encaminhados para o processamento da folha.",
      ],
    },
    {
      title: "11. Gere o espelho de ponto",
      paragraphs: [
        "Depois da apuração, o sistema pode gerar o [Espelho de Ponto Eletrônico](/blog/o-que-e-espelho-de-ponto).",
        "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) determina que o Programa de Tratamento de Registro de Ponto gere o Espelho de Ponto e o Arquivo Eletrônico de Jornada ([AEJ](/blog/o-que-e-afd-e-aej)).",
        "O Espelho deve apresentar, entre outras informações:",
      ],
      bullets: [
        "Identificação do empregador;",
        "Identificação do trabalhador;",
        "Período do relatório;",
        "Jornada contratual;",
        "Marcações realizadas;",
        "Marcações tratadas;",
        "Duração das jornadas.",
      ],
      closingParagraphs: [
        "O trabalhador deve ter acesso às informações do Espelho de Ponto mensalmente, de forma eletrônica ou impressa.",
      ],
    },
    {
      title: "12. Feche o período no sistema",
      paragraphs: [
        "Depois de conferir todas as informações, a empresa pode efetivamente realizar o fechamento do período no [sistema de ponto](https://segponto.com).",
        "Dependendo do software, essa função pode aparecer como:",
      ],
      bullets: [
        "**Fechar ponto**;",
        "**Fechar competência**;",
        "**Encerrar período**;",
        "**Finalizar apuração**;",
        "**Fechar cartão de ponto**.",
      ],
      closingParagraphs: [
        "O nome muda de acordo com o sistema.",
        "O que importa é que, nesse momento, a apuração daquele período seja considerada concluída para os processos seguintes.",
      ],
    },
    {
      title: "O que acontece depois de fechar o ponto?",
      paragraphs: [
        "Depois do fechamento, as informações apuradas podem ser utilizadas pela [folha de pagamento](/blog/como-calcular-folha-de-pagamento).",
        "Por exemplo: **Ponto → apuração → fechamento → folha de pagamento**",
        "A folha pode utilizar os dados para calcular eventos como:",
      ],
      bullets: [
        "Horas extras;",
        "Adicional noturno;",
        "Faltas;",
        "Atrasos;",
        "Banco de horas;",
        "Outras verbas relacionadas à jornada.",
      ],
      closingParagraphs: [
        "Por isso, um erro no fechamento do ponto pode acabar refletindo no cálculo da folha. Veja também a [integração ponto e folha](/blog/integracao-do-ponto-com-a-folha-de-pagamento-como-funciona).",
      ],
    },
    {
      title: "É possível fechar o ponto antes do fim do mês?",
      paragraphs: [
        "Sim.",
        "A empresa pode adotar um período de apuração que termine antes do último dia do mês.",
        "Por exemplo: **período de apuração 21/08 a 20/09**.",
        "Nesse caso, o fechamento ocorre depois do dia 20, e as horas realizadas posteriormente entram no próximo período.",
        "Essa prática pode ser utilizada para permitir que a empresa tenha tempo para conferir o ponto e processar a folha.",
        "Há instrumentos coletivos registrados no sistema Mediador que estabelecem expressamente períodos de apuração e fechamento antecipado para viabilizar o processamento da folha.",
      ],
    },
    {
      title: "O fechamento do ponto precisa ser no último dia do mês?",
      paragraphs: [
        "Não.",
        "O **mês do calendário** e o **período de apuração do ponto** não precisam necessariamente ser iguais.",
        "Uma empresa pode trabalhar com um período próprio de apuração, desde que observe as regras aplicáveis ao seu caso e os instrumentos coletivos pertinentes.",
        "Por isso, não existe uma regra geral dizendo que toda empresa precisa fechar o ponto exatamente no dia 30 ou 31.",
      ],
    },
    {
      title: "O que acontece com as horas trabalhadas depois do fechamento?",
      paragraphs: [
        "Quando a empresa fecha o ponto antes do final do mês, as horas realizadas depois do fechamento normalmente pertencem ao **período de apuração seguinte**.",
        "Exemplo: **período fechado 21/08 a 20/09**. O trabalhador realizou uma hora extra em **23/09**.",
        "Essa hora não pertence ao período encerrado em 20/09. Ela será considerada na apuração seguinte, conforme o calendário adotado pela empresa.",
        "É justamente por isso que a data de fechamento precisa ser conhecida pelos responsáveis pelo ponto e pela folha.",
      ],
    },
    {
      title: "O funcionário pode conferir o ponto antes do fechamento?",
      paragraphs: [
        "Sim, e isso é importante para identificar erros antes do encerramento da apuração.",
        "O trabalhador pode conferir horários registrados, intervalos, horas extras, faltas, atrasos, saldo de banco de horas e outras ocorrências.",
        "No sistema eletrônico, o trabalhador deve ter acesso às informações do [Espelho de Ponto](/blog/o-que-e-espelho-de-ponto) conforme as regras da [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico).",
        "Quanto mais cedo uma inconsistência for identificada, mais simples tende a ser seu tratamento antes do fechamento.",
      ],
    },
    {
      title: "É obrigatório assinar o ponto no fechamento?",
      paragraphs: [
        "A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) não estabelece uma obrigação geral de assinatura física mensal do Espelho de Ponto para todos os trabalhadores.",
        "O que a norma estabelece é o acesso do trabalhador às informações do [Espelho de Ponto](/blog/o-que-e-espelho-de-ponto) mensalmente.",
        "Por outro lado, podem existir regras específicas previstas em acordo ou convenção coletiva. Há instrumentos coletivos registrados no Mediador que estabelecem assinatura ou conferência do espelho, enquanto outros dispensam a assinatura.",
        "Por isso, a empresa deve verificar também o instrumento coletivo aplicável à categoria.",
      ],
    },
    {
      title: "Como fechar o ponto eletrônico corretamente?",
      paragraphs: [
        "Em um [sistema de ponto eletrônico](https://segponto.com), o processo pode ser resumido em:",
      ],
      bullets: [
        "Definir o período de apuração;",
        "Conferir as marcações;",
        "Identificar marcações faltantes;",
        "Tratar as ocorrências;",
        "Conferir horas extras;",
        "Conferir atrasos e faltas;",
        "Conferir banco de horas;",
        "Conferir intervalos e adicional noturno;",
        "Revisar a apuração;",
        "Gerar o Espelho de Ponto;",
        "Fechar o período;",
        "Enviar as informações para a folha.",
      ],
      closingParagraphs: [
        "Esse é o processo que efetivamente interessa ao responsável pelo fechamento: **garantir que a jornada apurada corresponda aos registros e que nenhuma ocorrência relevante fique pendente antes de enviar os dados para a folha.**",
      ],
    },
    {
      title: "Checklist para fechamento do ponto",
      paragraphs: [
        "Antes de fechar a competência, confira:",
      ],
      bullets: [
        "Período de apuração correto;",
        "Todos os funcionários conferidos;",
        "Marcações incompletas identificadas;",
        "Esquecimentos tratados;",
        "Horas extras conferidas;",
        "Atrasos conferidos;",
        "Faltas conferidas;",
        "Férias lançadas;",
        "Afastamentos lançados;",
        "Intervalos conferidos;",
        "Banco de horas conferido;",
        "Adicional noturno conferido;",
        "Espelho de ponto revisado;",
        "Pendências resolvidas;",
        "Período fechado;",
        "Informações encaminhadas para a folha.",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "Fechar o ponto do mês é **encerrar a apuração de um período de jornada depois de conferir e tratar as ocorrências dos funcionários**.",
        "O processo começa pela definição do período de apuração e termina com a revisão do [Espelho de Ponto](/blog/o-que-e-espelho-de-ponto) e o encerramento da competência.",
        "Em empresas que utilizam [ponto eletrônico](https://segponto.com), o fechamento também precisa estar alinhado ao funcionamento do Programa de Tratamento de Registro de Ponto, responsável por gerar o [Espelho de Ponto Eletrônico](/blog/o-que-e-espelho-de-ponto) e o [AEJ](/blog/o-que-e-afd-e-aej).",
        "Na prática, o objetivo é simples: **fechar somente depois que a jornada daquele período estiver conferida e pronta para ser utilizada pela folha de pagamento.**",
      ],
    },
  ],
  faqs: [
    {
      q: "Qual é a data de fechamento do ponto?",
      a: "Não existe uma única data para todas as empresas. A data depende do período de apuração utilizado pela empresa e pode ser definida antes do fim do mês.",
    },
    {
      q: "Posso fechar o ponto no dia 20?",
      a: "Sim, desde que o período de apuração adotado pela empresa termine nessa data e as regras aplicáveis sejam observadas.",
    },
    {
      q: "O ponto pode ser fechado antes do fim do mês?",
      a: "Sim. O fechamento antecipado pode ser utilizado para permitir o processamento da folha, desde que a empresa tenha um período de apuração definido.",
    },
    {
      q: "O que acontece com uma hora extra feita depois do fechamento?",
      a: "Ela será considerada no período de apuração seguinte, caso tenha sido realizada depois do encerramento da competência anterior.",
    },
    {
      q: "O que precisa conferir antes de fechar o ponto?",
      a: "Principalmente marcações incompletas, horas extras, atrasos, faltas, intervalos, banco de horas, férias, afastamentos e demais ocorrências que alterem a apuração da jornada.",
    },
    {
      q: "Fechar o ponto é o mesmo que fechar a folha?",
      a: "Não. O fechamento do ponto encerra a apuração da jornada. A folha de pagamento utiliza essas informações junto aos demais dados necessários para calcular a remuneração.",
    },
    {
      q: "O sistema pode alterar uma marcação para fechar o ponto?",
      a: "O tratamento do ponto não deve ser utilizado para alterar livremente as marcações originais. A Portaria 671 estabelece que o tratamento se limite a complementar omissões e tratar situações previstas na norma.",
    },
  ],
  related: [
    { label: "O que é espelho de ponto", to: "/blog/o-que-e-espelho-de-ponto" },
    { label: "O que é AFD e AEJ", to: "/blog/o-que-e-afd-e-aej" },
    { label: "Como calcular hora extra", to: "/blog/como-calcular-hora-extra" },
    { label: "Banco de horas na prática", to: "/blog/como-funciona-o-banco-de-horas-na-pratica" },
    { label: "Portaria 671", to: "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico" },
    { label: "Integração ponto e folha", to: "/blog/integracao-do-ponto-com-a-folha-de-pagamento-como-funciona" },
  ],
};
