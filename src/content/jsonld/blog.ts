import { blogIndexJsonLd } from "@/components/seo/jsonld/templates";

const posts = [
  {
    "slug": "multas-por-irregularidades-no-ponto-eletronico-quando-a-empresa-pode-ser-autuada",
    "title": "Multas por irregularidades no ponto eletrônico: quando a empresa pode ser autuada",
    "description": "Multas por irregularidades no ponto eletrônico: quando a empresa pode ser autuada, Portaria 671, ponto britânico, fiscalização, AFD, AEJ e auto de infração.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "intervalo-pre-assinalado-o-que-e-como-funciona-e-quais-sao-as-regras",
    "title": "Intervalo pré-assinalado: o que é, como funciona e quais são as regras",
    "description": "Intervalo pré-assinalado: o que é, art. 74 §2º CLT, Portaria 671, espelho de ponto, AEJ, diferença da marcação automática e ponto por exceção.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada",
    "title": "Escalas de trabalho e ponto: tipos de escala e como controlar a jornada",
    "description": "Escalas de trabalho e ponto: 5x2, 6x1, 12x36, revezamento, DSR, feriados, banco de horas e como controlar a jornada no sistema.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras",
    "title": "Jornada, intervalo, DSR e sobreaviso: entenda as regras",
    "description": "Jornada, intervalo intrajornada e interjornada, DSR e sobreaviso: regras da CLT, Súmula 428, ponto eletrônico e diferença entre os conceitos.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "quanto-tempo-guardar-registro-de-ponto",
    "title": "Quanto tempo guardar registro de ponto?",
    "description": "Quanto tempo guardar registro de ponto: 5 anos, Portaria 671, REP-C 10 anos, AFD, AEJ, espelho, comprovante 48h, demissão e LGPD.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras",
    "title": "Comprovante de registro de ponto: o que é, para que serve e quais são as regras",
    "description": "Comprovante de registro de ponto: o que é, Portaria 671, REP-C, REP-P, NSR, hash, diferença do espelho e AFD, celular e regras de acesso.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "integracao-do-ponto-com-a-folha-de-pagamento-como-funciona",
    "title": "Integração do ponto com a folha de pagamento: como funciona",
    "description": "Integração do ponto com a folha: o que é, horas extras, faltas, banco de horas, API, arquivo, fechamento, eSocial e o que avaliar antes de contratar.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "como-implantar-ponto-eletronico-na-empresa-passo-a-passo",
    "title": "Como implantar ponto eletrônico na empresa: passo a passo",
    "description": "Como implantar ponto eletrônico: REP-C, REP-A, REP-P, cadastro, jornadas, testes, treinamento, fechamento, home office e checklist completo.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras",
    "title": "Ponto por exceção: como funciona, quem pode usar e quais são as regras",
    "description": "Ponto por exceção: o que é, art. 74 §4º CLT, acordo, diferença do REP-A, horas extras, atrasos, home office e como implantar.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "ponto-por-app-vs-relogio-de-ponto-qual-a-diferenca-e-como-escolher",
    "title": "Ponto por app vs relógio de ponto: qual a diferença e como escolher",
    "description": "Ponto por app vs relógio de ponto: diferença, custo, home office, externos, biometria, offline e como escolher o melhor para a empresa.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "ponto-com-reconhecimento-facial-como-funciona-e-quais-sao-as-regras",
    "title": "Ponto com reconhecimento facial: como funciona e quais são as regras",
    "description": "Ponto com reconhecimento facial: como funciona, LGPD, biometria, Portaria 671, template facial, offline, celular e o que avaliar antes de contratar.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "ponto-eletronico-com-biometria-como-funciona-e-quais-sao-as-regras",
    "title": "Ponto eletrônico com biometria: como funciona e quais são as regras",
    "description": "Ponto eletrônico com biometria: como funciona, Portaria 671, LGPD, impressão digital, reconhecimento facial, offline e o que avaliar antes de contratar.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "ponto-eletronico-offline-como-funciona-quando-nao-ha-internet",
    "title": "Ponto eletrônico offline: como funciona quando não há internet",
    "description": "Ponto eletrônico offline: como funciona sem internet, REP-P, sincronização, celular, obra, geolocalização e o que avaliar antes de contratar.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "folha-de-ponto-online-como-funciona-e-como-fazer-o-controle-da-jornada",
    "title": "Folha de ponto online: como funciona e como fazer o controle da jornada",
    "description": "Folha de ponto online: como funciona, diferença do espelho, planilha, horas extras, banco de horas, celular, home office e como implantar.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "app-de-ponto-eletronico-como-funciona-e-como-usar",
    "title": "App de ponto eletrônico: como funciona e como usar",
    "description": "App de ponto eletrônico: como funciona e como usar — celular, REP-P, offline, geolocalização, comprovante, espelho de ponto e o que analisar antes de contratar.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "geolocalizacao-no-ponto-como-funciona-e-para-que-serve",
    "title": "Geolocalização no ponto: como funciona e para que serve",
    "description": "Geolocalização no ponto: como funciona, para que serve, diferença de rastreamento, LGPD, celular, equipes externas e home office.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios",
    "title": "Controle de jornada: o que é, como funciona e como registrar a jornada dos funcionários",
    "description": "Controle de jornada: o que é, como funciona e como registrar a jornada dos funcionários — métodos, artigo 74, ponto eletrônico, home office, celular e espelho.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "controle-de-jornada-e-obrigatorio-entenda-quando-a-empresa-precisa-registrar-o-ponto",
    "title": "Controle de jornada é obrigatório? Entenda quando a empresa precisa registrar o ponto",
    "description": "Controle de jornada é obrigatório? Artigo 74 da CLT, mais de 20 trabalhadores, exceções do artigo 62, ponto eletrônico, home office e como a empresa registra o ponto.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "ponto-eletronico-para-home-office-como-funciona-o-controle-de-jornada",
    "title": "Ponto eletrônico para home office: como funciona o controle de jornada",
    "description": "Ponto eletrônico para home office: como funciona o controle de jornada no teletrabalho por jornada ou produção, celular, computador e trabalho híbrido.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "excecoes-ao-controle-de-jornada-o-que-diz-o-artigo-62-da-clt",
    "title": "Exceções ao controle de jornada: o que diz o artigo 62 da CLT",
    "description": "Exceções ao controle de jornada no artigo 62 da CLT: atividade externa, cargo de gestão, teletrabalho por produção ou tarefa e o que a empresa deve observar.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "ponto-eletronico-para-empresas-como-funciona-o-controle-de-jornada",
    "title": "Ponto eletrônico para empresas: como funciona o controle de jornada",
    "description": "Ponto eletrônico para empresas: como funciona o controle de jornada, o que a empresa controla, pequenas e grandes equipes, unidades, externos e como escolher um sistema.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras",
    "title": "Registro de ponto digital: como funciona e quais são as regras",
    "description": "Registro de ponto digital: como funciona, Portaria 671, REP-C, REP-A e REP-P, ponto pelo celular, geolocalização, comprovante, AFD, AEJ e tratamento da jornada.",
    "publishedAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "slug": "rep-c-rep-a-e-rep-p-entenda-as-diferencas",
    "title": "REP-C, REP-A e REP-P: entenda as diferenças",
    "description": "Diferença entre REP-C, REP-A e REP-P na Portaria 671: o que é cada modalidade, acordo coletivo, INPI, ponto pelo celular e requisitos do REP-P.",
    "publishedAt": "2026-09-19",
    "updatedAt": "2026-09-19"
  },
  {
    "slug": "como-calcular-fgts",
    "title": "Como calcular FGTS",
    "description": "Como calcular FGTS: depósito de 8% (ou 2% no aprendiz), proporcional, horas extras, férias, 13º e multa de 40%. Não é descontado do salário.",
    "publishedAt": "2026-09-18",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "o-que-e-um-sistema-de-ponto-eletronico",
    "title": "O que é um sistema de ponto eletrônico?",
    "description": "O que é um sistema de ponto eletrônico: como funciona, Portaria 671 (REP-C, REP-A e REP-P), ponto pelo celular, espelho, AEJ, comprovante e o que verificar antes de contratar.",
    "publishedAt": "2026-09-18",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "como-fechar-o-ponto-do-mes",
    "title": "Como fechar o ponto do mês",
    "description": "Como fechar o ponto do mês passo a passo: período de apuração, marcações faltantes, horas extras, banco de horas, Espelho de Ponto e envio para a folha.",
    "publishedAt": "2026-09-08",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "empresa-com-menos-de-20-funcionarios-precisa-de-ponto",
    "title": "Empresa com menos de 20 funcionários precisa de ponto?",
    "description": "Empresa com menos de 20 funcionários precisa de ponto? Art. 74, §2º da CLT: limite de mais de 20 trabalhadores, o caso dos 20 exatos, horas extras e quando usar ponto eletrônico mesmo sem obrigação.",
    "publishedAt": "2026-09-08",
    "updatedAt": "2026-09-17"
  },
  {
    "slug": "o-que-e-afd-e-aej",
    "title": "O que é AFD e AEJ?",
    "description": "O que é AFD e AEJ no ponto eletrônico: Arquivo Fonte de Dados, Arquivo Eletrônico de Jornada, diferença para o espelho, PTRP e Portaria 671.",
    "publishedAt": "2026-09-08",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "o-que-e-espelho-de-ponto",
    "title": "O que é espelho de ponto?",
    "description": "O que é espelho de ponto: relatório de jornada, Espelho de Ponto Eletrônico na Portaria 671, diferença para marcação e comprovante, AEJ e acesso do trabalhador.",
    "publishedAt": "2026-09-08",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular",
    "title": "Ponto por celular é legal? Entenda as regras para bater ponto pelo celular",
    "description": "Ponto por celular é legal? REP-P na Portaria 671, comprovante, geolocalização, reconhecimento facial, celular pessoal e checklist antes de contratar um app de ponto.",
    "publishedAt": "2026-09-08",
    "updatedAt": "2026-09-17"
  },
  {
    "slug": "quanto-custa-um-sistema-de-ponto-eletronico",
    "title": "Quanto custa um sistema de ponto eletrônico?",
    "description": "Quanto custa um sistema de ponto eletrônico em {{ano}}: faixas por quantidade de funcionários, preço por colaborador, exemplos de mercado e o que entra além da mensalidade.",
    "publishedAt": "2026-09-08",
    "updatedAt": "2026-09-17"
  },
  {
    "slug": "tolerancia-de-ponto-na-clt-quantos-minutos-o-funcionario-pode-atrasar",
    "title": "Tolerância de ponto na CLT: quantos minutos o funcionário pode atrasar?",
    "description": "Tolerância de ponto na CLT (art. 58, §1º): 5 minutos por marcação e 10 minutos por dia, o que acontece se passar do limite e como configurar no sistema de ponto.",
    "publishedAt": "2026-09-08",
    "updatedAt": "2026-09-17"
  },
  {
    "slug": "como-calcular-domingo-trabalhado",
    "title": "Como calcular domingo trabalhado",
    "description": "Como calcular domingo trabalhado: Súmula 146, folga compensatória, mensalista e horista, escalas 6x1, 5x1 e 12x36, com exemplos.",
    "publishedAt": "2026-09-07",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "como-calcular-feriado-trabalhado",
    "title": "Como calcular feriado trabalhado",
    "description": "Como calcular feriado trabalhado: Súmula 146, folga compensatória, mensalista e horista, jornada 12x36 e exemplos de cálculo.",
    "publishedAt": "2026-09-07",
    "updatedAt": "2026-09-20"
  },
  {
    "slug": "como-funciona-o-banco-de-horas-na-pratica",
    "title": "Como funciona o banco de horas na prática",
    "description": "Como funciona o banco de horas na prática: saldo positivo e negativo, cálculo, prazos da CLT, hora extra, atrasos e controle no ponto eletrônico.",
    "publishedAt": "2026-06-15",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "como-calcular-ferias-empregada-domestica",
    "title": "Como calcular férias empregada doméstica",
    "description": "Como calcular férias de empregada doméstica: 30, 20, 15, 14 e 10 dias, 1/3, proporcionais, abono, eSocial e exemplos com salários.",
    "publishedAt": "2026-06-10",
    "updatedAt": "2026-09-19"
  },
  {
    "slug": "como-calcular-ferias-coletivas",
    "title": "Como calcular férias coletivas",
    "description": "Como calcular férias coletivas: salário ÷ 30 × dias + 1/3, 10, 15 e 20 dias, proporcionais, licença remunerada e prazo de pagamento.",
    "publishedAt": "2026-06-02",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "como-calcular-horas-noturnas",
    "title": "Como calcular horas noturnas",
    "description": "Como calcular horas noturnas: período 22h–5h, hora de 52min30s, adicional de 20%, exemplos com salários e prorrogação após as 5h.",
    "publishedAt": "2026-05-20",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "como-calcular-ferias",
    "title": "Como calcular férias",
    "description": "Como calcular férias: 30 dias + 1/3, proporcionais, faltas, abono, rescisão, coletivas e prazo de pagamento.",
    "publishedAt": "2026-05-18",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "como-calcular-hora-extra",
    "title": "Como calcular hora extra",
    "description": "Como calcular hora extra: hora normal × 1,5 ou × 2, exemplos com salários, jornadas 40h e 36h, noturna, domingo, feriado e reflexos.",
    "publishedAt": "2026-05-16",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "como-calcular-folha-de-pagamento",
    "title": "Como calcular folha de pagamento",
    "description": "Como calcular folha de pagamento: salário bruto, horas extras, adicional noturno, faltas, INSS, IRRF e salário líquido.",
    "publishedAt": "2026-04-22",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "como-calcular-imposto-de-renda",
    "title": "Como calcular imposto de renda",
    "description": "Como calcular Imposto de Renda (IRRF) 2026: base de cálculo, tabela progressiva, desconto simplificado, redução até R$ 5.000 e exemplos.",
    "publishedAt": "2026-04-05",
    "updatedAt": "2026-09-18"
  },
  {
    "slug": "como-calcular-inss",
    "title": "Como calcular INSS",
    "description": "Como calcular INSS 2026: contribuição progressiva por faixas (7,5% a 14%), salário de contribuição, teto, horas extras e salário líquido.",
    "publishedAt": "2026-03-28",
    "updatedAt": "2026-09-19"
  },
  {
    "slug": "portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
    "title": "Portaria 671: o que é, requisitos e regras para o ponto eletrônico",
    "description": "Portaria 671 do MTE: o que é, requisitos para ponto eletrônico, diferença entre REP-C, REP-A e REP-P, Espelho de Ponto, AEJ, Atestado Técnico e checklist antes de contratar.",
    "publishedAt": "2026-03-10",
    "updatedAt": "2026-09-17"
  },
  {
    "slug": "como-escolher-um-sistema-de-ponto-eletronico-para-pequenas-empresas",
    "title": "Como escolher um sistema de ponto eletrônico para pequenas empresas",
    "description": "Como escolher um sistema de ponto eletrônico para pequenas empresas: o que avaliar, ponto pelo celular, custo, comparação com planilha e checklist antes de contratar.",
    "publishedAt": "2026-01-15",
    "updatedAt": "2026-09-17"
  }
] as const;

/** JSON-LD exclusivo de /blog — catálogo magro (sem corpo dos artigos). */
export const path = "/blog";
export const jsonLd = blogIndexJsonLd({
  title: "Blog | SegPonto: guias de ponto e jornada",
  description: "Guias de RH sobre ponto eletrônico e jornada. Para calcular valores use as calculadoras; aqui explicamos regras e exemplos.",
  posts: [...posts],
});
