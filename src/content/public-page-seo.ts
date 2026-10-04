import { BLOG_INDEX_PATH } from "./blog/constants";
import { BLOG_POST_PATHS } from "./blog/post-slugs";
import { CALCULATORS_INDEX_PATH } from "./calculators/constants";
import { BRAND_NAME, DEFAULT_DESCRIPTION, SEO_LOGO_URL, SITE_ORIGIN } from "./landing-site";

export type PublicPageSeoConfig = {
  title: string;
  description: string;
  /** Caminho público, ex.: `/` */
  path: string;
  noindex?: boolean;
};

export function publicPageCanonicalUrl(path: string): string {
  if (path === "/") {
    return `${SITE_ORIGIN}/`;
  }
  return `${SITE_ORIGIN}${path}`;
}

/** Meta por rota pública: fonte única para PageSeo. */
export const PUBLIC_PAGE_SEO = {
  home: {
    title: `${BRAND_NAME} | Sistema de ponto eletrônico para PME`,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  },
  cadastro: {
    title: `Contratar | ${BRAND_NAME}: ponto eletrônico digital`,
    description:
      "Contrate um plano mensal no SegPonto: dados da empresa, checkout seguro no cartão e ativação da assinatura em poucos minutos.",
    path: "/cadastro",
    noindex: true,
  },
  login: {
    title: `Entrar | ${BRAND_NAME}`,
    description:
      "Acesse o SegPonto como empresa ou funcionário. Login seguro para gestão de ponto, espelho de jornada e batidas pelo app.",
    path: "/login",
  },
  recuperarSenha: {
    title: `Recuperar senha | ${BRAND_NAME}`,
    description:
      "Redefina sua senha do SegPonto com o e-mail cadastrado. Fluxo seguro para recuperar acesso à conta da empresa ou do funcionário.",
    path: "/recuperar-senha",
  },
  logint: {
    title: `Acesso por link | ${BRAND_NAME}`,
    description: "Ativação de sessão via link enviado pela equipe SegPonto.",
    path: "/logint",
    noindex: true,
  },
  cobrancaConcluido: {
    title: `Pagamento realizado | ${BRAND_NAME}`,
    description: "Confirmação de pagamento do plano SegPonto.",
    path: "/cobranca/concluido",
    noindex: true,
  },
  notFound: {
    title: `Página não encontrada | ${BRAND_NAME}`,
    description: "A página solicitada não existe no SegPonto.",
    path: "/404",
    noindex: true,
  },
  sobre: {
    title: `Sobre | ${BRAND_NAME}: ponto eletrônico para empresas`,
    description:
      "Conheça o SegPonto: sistema de ponto eletrônico online para facilitar o controle e a gestão da jornada de trabalho das empresas.",
    path: "/sobre",
  },
  privacidade: {
    title: `Política de Privacidade | ${BRAND_NAME}`,
    description:
      "Como o SegPonto trata dados pessoais: LGPD, dados da empresa e colaboradores, cookies, métricas de uso e direitos dos titulares.",
    path: "/privacidade",
  },
  termos: {
    title: `Termos de Uso | ${BRAND_NAME}`,
    description:
      "Condições de contratação e utilização do SegPonto: cadastro, responsabilidades da empresa, planos, propriedade intelectual e limitação de responsabilidade.",
    path: "/termos",
  },
  exclusaoConta: {
    title: `Exclusão de conta | ${BRAND_NAME}`,
    description:
      "Como solicitar a exclusão da conta no SegPonto: quais dados são excluídos, quais podem ser mantidos por obrigação legal e por quanto tempo.",
    path: "/exclusao-conta",
  },
  precos: {
    title: `Preços: ponto eletrônico | ${BRAND_NAME}`,
    description:
      "Preço de ponto eletrônico por faixa de funcionários. Planos mensais com app, relatórios e jornada. Contratação no cartão sem taxa escondida de setup.",
    path: "/precos",
  },
  perguntasFrequentes: {
    title: `Perguntas frequentes | ${BRAND_NAME}`,
    description:
      "FAQ SegPonto: conta, batida no app, jornada, cobrança e links para guias legais. Respostas curtas para gestores de PME.",
    path: "/perguntas-frequentes",
  },
  documentacao: {
    title: `Documentação: como usar | ${BRAND_NAME}`,
    description:
      "Como usar o SegPonto: configurar empresa, convidar time, bater ponto, espelho, áreas de geolocalização e exportar fechamento.",
    path: "/documentacao",
  },
  segmentos: {
    title: `Segmentos | ${BRAND_NAME}`,
    description:
      "Ponto eletrônico por segmento: construção, clínicas, varejo, indústria, contabilidades e outros nichos.",
    path: "/segmentos",
  },
  blog: {
    title: `Blog | ${BRAND_NAME}: guias de ponto e jornada`,
    description:
      "Guias de RH sobre ponto eletrônico e jornada. Para calcular valores use as calculadoras; aqui explicamos regras e exemplos.",
    path: BLOG_INDEX_PATH,
  },
  calculadoras: {
    title: `Calculadoras de ponto, jornada e folha | ${BRAND_NAME}`,
    description:
      "Calculadora de ponto, férias, hora extra, horas noturnas, banco de horas e folha. Ferramentas gratuitas com fórmulas CLT para conferência.",
    path: CALCULATORS_INDEX_PATH,
  },
  calculadoraHoraExtra: {
    title: `Calculadora de hora extra | ${BRAND_NAME}`,
    description:
      "Calculadora de hora extra: divisor 220, adicional 50% ou 100% em domingo/feriado. Total bruto estimado para conferir o espelho.",
    path: "/calculadoras/hora-extra",
  },
  calculadoraHorasNoturnas: {
    title: `Calculadora de horas noturnas | ${BRAND_NAME}`,
    description:
      "Calculadora de horas noturnas: hora reduzida (52min30s), adicional de 20% e valor bruto entre 22h e 5h (urbano).",
    path: "/calculadoras/horas-noturnas",
  },
  calculadoraFerias: {
    title: `Calculadora de férias | ${BRAND_NAME}`,
    description:
      "Calculadora de férias: 15, 20 ou 30 dias, proporcional, terço constitucional e abono. Estimativa bruta para RH e conferência.",
    path: "/calculadoras/ferias",
  },
  calculadoraFeriasEmpregadaDomestica: {
    title: `Calculadora de férias da empregada doméstica | ${BRAND_NAME}`,
    description:
      "Calculadora de férias da empregada doméstica: salário + 1/3, 10 a 30 dias, abono pecuniário. Estimativa bruta para eSocial Doméstico.",
    path: "/calculadoras/ferias-empregada-domestica",
  },
  calculadoraFolhaDePagamento: {
    title: `Calculadora de folha de pagamento | ${BRAND_NAME}`,
    description:
      "Calculadora de folha de pagamento: salário, variáveis do ponto, INSS 2026, IRRF 2026 e faltas. Estimativa de líquido. Não substitui o contador.",
    path: "/calculadoras/folha-de-pagamento",
  },
  calculadoraImpostoDeRenda: {
    title: `Calculadora de imposto de renda (IRRF) | ${BRAND_NAME}`,
    description:
      "Calculadora de imposto de renda mensal (IRRF 2026): salário, dependentes, INSS, tabela progressiva e redução da Lei 15.270. Estimativa para conferência.",
    path: "/calculadoras/imposto-de-renda",
  },
  calculadoraInss: {
    title: `Calculadora de INSS | ${BRAND_NAME}`,
    description:
      "Calculadora de INSS do empregado 2026: informe o salário de contribuição e veja o desconto progressivo até o teto. Estimativa para conferência.",
    path: "/calculadoras/inss",
  },
  calculadoraFgts: {
    title: `Calculadora de FGTS | ${BRAND_NAME}`,
    description:
      "Calculadora de FGTS: depósito de 8% ou 2% (aprendiz), proporcional por dias e estimativa da multa de 40%. Não é descontado do salário.",
    path: "/calculadoras/fgts",
  },
  calculadoraFolhaDePonto: {
    title: `Calculadora de folha de ponto | ${BRAND_NAME}`,
    description:
      "Calculadora de folha/cartão de ponto: some batidas de entrada e saída e veja o total de horas do dia ou da semana.",
    path: "/calculadoras/folha-de-ponto",
  },
  calculadoraDomingoTrabalhado: {
    title: `Calculadora de domingo trabalhado | ${BRAND_NAME}`,
    description:
      "Calculadora de domingo trabalhado: mensalista (salário ÷ 30, Súmula 146) ou horista (hora × horas × 2), sem folga compensatória.",
    path: "/calculadoras/domingo-trabalhado",
  },
  calculadoraFeriadoTrabalhado: {
    title: `Calculadora de feriado trabalhado | ${BRAND_NAME}`,
    description:
      "Calculadora de feriado trabalhado: mensalista (salário ÷ 30, Súmula 146) ou horista (hora × horas × 2), sem folga compensatória.",
    path: "/calculadoras/feriado-trabalhado",
  },
  calculadoraBancoDeHoras: {
    title: `Calculadora de banco de horas | ${BRAND_NAME}`,
    description:
      "Calculadora de banco de horas: créditos, débitos, fator de conversão e saldo estimado para conferir com o acordo da empresa.",
    path: "/calculadoras/banco-de-horas",
  },
  calculadoraCustoPonto: {
    title: `Calculadora de custo de ponto eletrônico | ${BRAND_NAME}`,
    description:
      "Estime o custo mensal e anual do SegPonto por número de funcionários e compare com o custo oculto da planilha.",
    path: "/calculadoras/custo-ponto-eletronico",
  },
  pontoEletronicoParaConstrucao: {
    title: `Ponto eletrônico para construção | ${BRAND_NAME}`,
    description:
      "Ponto eletrônico para construção e obras: canteiros, geolocalização por obra, terceiros, offline e espelho por obra.",
    path: "/ponto-eletronico-para-construcao",
  },
  pontoEletronicoParaClinicas: {
    title: `Ponto eletrônico para clínicas | ${BRAND_NAME}`,
    description:
      "Ponto para clínicas e saúde: plantão 12x36, troca de plantão, multifilial e hora extra de plantonista.",
    path: "/ponto-eletronico-para-clinicas",
  },
  pontoEletronicoParaVarejo: {
    title: `Ponto eletrônico para varejo | ${BRAND_NAME}`,
    description:
      "Ponto eletrônico para varejo e lojas: turnos, feriados do comércio, múltiplas lojas e cobertura de faltas.",
    path: "/ponto-eletronico-para-varejo",
  },
  pontoEletronicoParaIndustria: {
    title: `Ponto eletrônico para indústria | ${BRAND_NAME}`,
    description:
      "Ponto na indústria: turnos, intervalos, banco de horas no chão de fábrica e fechamento por escala.",
    path: "/ponto-eletronico-para-industria",
  },
  pontoEletronicoEmpregadaDomestica: {
    title: `Ponto para empregada doméstica | ${BRAND_NAME}`,
    description:
      "Controle de jornada de empregada doméstica: simplicidade para empregador, férias e registro sem burocracia de software enterprise.",
    path: "/ponto-eletronico-empregada-domestica",
  },
  pontoEletronicoParaTransportes: {
    title: `Ponto eletrônico para transportes | ${BRAND_NAME}`,
    description:
      "Ponto para motoristas e transportes: jornada diferenciada, geolocalização de rota e limites legais em alto nível.",
    path: "/ponto-eletronico-para-transportes",
  },
  pontoEletronicoParaContabilidades: {
    title: `Ponto eletrônico para contabilidades | ${BRAND_NAME}`,
    description:
      "SegPonto para escritórios contábeis: apoiar clientes PME, exportar fechamento de ponto e reduzir planilha paralela.",
    path: "/ponto-eletronico-para-contabilidades",
  },
  pontoEletronicoParaRestaurantes: {
    title: `Ponto eletrônico para restaurantes | ${BRAND_NAME}`,
    description:
      "Ponto para restaurantes e food service: cozinha e salão, turnos de fim de semana, escala em feriados e fechamento sem planilha.",
    path: "/ponto-eletronico-para-restaurantes",
  },
  pontoEletronicoParaEscolas: {
    title: `Ponto eletrônico para escolas | ${BRAND_NAME}`,
    description:
      "Ponto para escolas: professores e administrativo, eventos noturnos, múltiplas unidades e espelho por perfil de jornada.",
    path: "/ponto-eletronico-para-escolas",
  },
  pontoEletronicoParaCondominios: {
    title: `Ponto eletrônico para condomínios | ${BRAND_NAME}`,
    description:
      "Ponto para condomínios e portaria: escala 12x36, zeladoria, plantão noturno e fechamento para a administradora.",
    path: "/ponto-eletronico-para-condominios",
  },
  pontoEletronicoParaSaloes: {
    title: `Ponto eletrônico para salões | ${BRAND_NAME}`,
    description:
      "Ponto para salão de beleza e barbearia: sábado cheio, comissionados CLT, horário flexível e espelho claro para o contador.",
    path: "/ponto-eletronico-para-saloes",
  },
  pontoEletronicoParaCallCenter: {
    title: `Ponto eletrônico para call center | ${BRAND_NAME}`,
    description:
      "Ponto para call center e BPO: turnos 24h, pausas, home office de atendimento e diferença entre login do discador e ponto legal.",
    path: "/ponto-eletronico-para-call-center",
  },
  pontoEletronicoParaHoteis: {
    title: `Ponto eletrônico para hotéis | ${BRAND_NAME}`,
    description:
      "Ponto para hotéis e hotelaria: recepção 24h, governança, alta temporada e jornadas por setor na mesma operação.",
    path: "/ponto-eletronico-para-hoteis",
  },
  pontoEletronicoParaAdvocacia: {
    title: `Ponto eletrônico para advocacia | ${BRAND_NAME}`,
    description:
      "Ponto para escritórios de advocacia: equipe CLT, estagiários, home office e controle de extras sem confundir com sócio.",
    path: "/ponto-eletronico-para-advocacia",
  },
  pontoEletronicoParaFranquias: {
    title: `Ponto eletrônico para franquias | ${BRAND_NAME}`,
    description:
      "Ponto para redes de franquia: padronizar batida multi-unidade, espelho por loja e fechamento alinhado ao franqueado.",
    path: "/ponto-eletronico-para-franquias",
  },
} as const satisfies Record<string, PublicPageSeoConfig>;

/** Rotas públicas indexáveis (sem `/`; home entra no sitemap via vite.config). */
export const SITEMAP_DYNAMIC_ROUTES = [
  ...(Object.values(PUBLIC_PAGE_SEO) as PublicPageSeoConfig[])
    .filter((page) => !page.noindex && page.path !== "/")
    .map((page) => page.path),
  ...BLOG_POST_PATHS,
];

export const SEO_OG_IMAGE = SEO_LOGO_URL;
