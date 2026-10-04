import {
  BRAND_NAME,
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTION,
  SEO_LOGO_URL,
  SITE_ORIGIN,
} from "@/content/landing-site";

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const SOFTWARE_ID = `${SITE_ORIGIN}/#software`;
export const LOGO_ID = `${SITE_ORIGIN}/#logo`;

/**
 * Conceitos estáveis do grafo SegPonto.
 * Mesmo @id em todas as páginas que falam do tema — não recriar Thing por URL.
 */
export const CONCEPT_IDS = {
  feriadoTrabalhado: `${SITE_ORIGIN}/#feriado-trabalhado`,
  domingoTrabalhado: `${SITE_ORIGIN}/#domingo-trabalhado`,
  ferias: `${SITE_ORIGIN}/#ferias`,
  horaExtra: `${SITE_ORIGIN}/#hora-extra`,
  horasNoturnas: `${SITE_ORIGIN}/#horas-noturnas`,
  bancoDeHoras: `${SITE_ORIGIN}/#banco-de-horas`,
  aej: `${SITE_ORIGIN}/#aej`,
  afd: `${SITE_ORIGIN}/#afd`,
  espelhoDePonto: `${SITE_ORIGIN}/#espelho-de-ponto`,
  repP: `${SITE_ORIGIN}/#rep-p`,
  pontoEletronico: `${SITE_ORIGIN}/#ponto-eletronico`,
  controleDeJornada: `${SITE_ORIGIN}/#controle-de-jornada`,
  geolocalizacao: `${SITE_ORIGIN}/#geolocalizacao`,
  portaria671: `${SITE_ORIGIN}/#portaria-671`,
  comprovanteDePonto: `${SITE_ORIGIN}/#comprovante-de-ponto`,
  folhaDePagamento: `${SITE_ORIGIN}/#folha-de-pagamento`,
  inss: `${SITE_ORIGIN}/#inss`,
  fgts: `${SITE_ORIGIN}/#fgts`,
  impostoDeRenda: `${SITE_ORIGIN}/#imposto-de-renda`,
} as const;

export type ConceptId = keyof typeof CONCEPT_IDS;

type ConceptDef = {
  name: string;
  description: string;
  /** Página canônica do conceito (landing ou artigo-guia). */
  canonicalPath: string;
};

export const CONCEPT_DEFS: Record<ConceptId, ConceptDef> = {
  feriadoTrabalhado: {
    name: "Feriado trabalhado",
    description: "Trabalho realizado em dia reconhecido como feriado.",
    canonicalPath: "/blog/como-calcular-feriado-trabalhado",
  },
  domingoTrabalhado: {
    name: "Domingo trabalhado",
    description: "Trabalho realizado em domingo e regras de remuneração associadas.",
    canonicalPath: "/blog/como-calcular-domingo-trabalhado",
  },
  ferias: {
    name: "Férias",
    description: "Período de descanso anual remunerado e seu cálculo.",
    canonicalPath: "/blog/como-calcular-ferias",
  },
  horaExtra: {
    name: "Hora extra",
    description: "Hora trabalhada além da jornada contratual.",
    canonicalPath: "/blog/como-calcular-hora-extra",
  },
  horasNoturnas: {
    name: "Horas noturnas",
    description: "Trabalho em horário noturno e adicional noturno.",
    canonicalPath: "/blog/como-calcular-horas-noturnas",
  },
  bancoDeHoras: {
    name: "Banco de horas",
    description: "Compensação de horas extras por crédito e débito de jornada.",
    canonicalPath: "/blog/como-funciona-o-banco-de-horas-na-pratica",
  },
  aej: {
    name: "AEJ",
    description: "Arquivo Eletrônico de Jornada no registro de ponto eletrônico.",
    canonicalPath: "/blog/o-que-e-afd-e-aej",
  },
  afd: {
    name: "AFD",
    description: "Arquivo Fonte de Dados das marcações do ponto eletrônico.",
    canonicalPath: "/blog/o-que-e-afd-e-aej",
  },
  espelhoDePonto: {
    name: "Espelho de ponto",
    description: "Extrato legível da jornada do colaborador na competência.",
    canonicalPath: "/blog/o-que-e-espelho-de-ponto",
  },
  repP: {
    name: "REP-P",
    description: "Registrador Eletrônico de Ponto via Programa.",
    canonicalPath: "/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas",
  },
  pontoEletronico: {
    name: "Ponto eletrônico",
    description: "Sistema eletrônico de registro de jornada de trabalho.",
    canonicalPath: "/blog/o-que-e-um-sistema-de-ponto-eletronico",
  },
  controleDeJornada: {
    name: "Controle de jornada",
    description: "Registro, acompanhamento e conferência da jornada de trabalho.",
    canonicalPath: "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios",
  },
  geolocalizacao: {
    name: "Geolocalização no ponto eletrônico",
    description: "Registro de ponto com validação de localização geográfica.",
    canonicalPath: "/blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve",
  },
  portaria671: {
    name: "Portaria 671",
    description: "Regras do Ministério do Trabalho para o registro eletrônico de ponto.",
    canonicalPath: "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  },
  comprovanteDePonto: {
    name: "Comprovante de registro de ponto",
    description: "Comprovante de Registro de Ponto do Trabalhador previsto na Portaria 671.",
    canonicalPath: "/blog/comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras",
  },
  folhaDePagamento: {
    name: "Folha de pagamento",
    description: "Cálculo e fechamento da remuneração dos colaboradores.",
    canonicalPath: "/blog/como-calcular-folha-de-pagamento",
  },
  inss: {
    name: "INSS",
    description: "Contribuição previdenciária sobre a remuneração.",
    canonicalPath: "/blog/como-calcular-inss",
  },
  fgts: {
    name: "FGTS",
    description: "Fundo de Garantia do Tempo de Serviço.",
    canonicalPath: "/blog/como-calcular-fgts",
  },
  impostoDeRenda: {
    name: "Imposto de renda",
    description: "Retenção e cálculo do imposto de renda na folha.",
    canonicalPath: "/blog/como-calcular-imposto-de-renda",
  },
};

export function pageUrl(path: string): string {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

export function pageId(path: string, fragment: string): string {
  return `${pageUrl(path)}#${fragment}`;
}

export function idRef(id: string): { "@id": string } {
  return { "@id": id };
}

export function buildLogoNode(): Record<string, unknown> {
  return {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url: SEO_LOGO_URL,
  };
}

export function buildOrganizationNode(): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: BRAND_NAME,
    url: SITE_ORIGIN,
    logo: idRef(LOGO_ID),
    description: DEFAULT_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT_EMAIL,
      availableLanguage: ["pt-BR", "Portuguese"],
    },
  };
}

export function buildWebSiteNode(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BRAND_NAME,
    url: SITE_ORIGIN,
    publisher: idRef(ORGANIZATION_ID),
  };
}

export function buildSoftwareApplicationNode(): Record<string, unknown> {
  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: BRAND_NAME,
    url: SITE_ORIGIN,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: DEFAULT_DESCRIPTION,
    image: idRef(LOGO_ID),
    publisher: idRef(ORGANIZATION_ID),
  };
}

export function buildSoftwareRefNode(): Record<string, unknown> {
  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: BRAND_NAME,
    url: SITE_ORIGIN,
  };
}

/** Thing estável + url da página canônica do conceito. */
export function buildConceptNode(conceptId: ConceptId): Record<string, unknown> {
  const def = CONCEPT_DEFS[conceptId];
  return {
    "@type": "Thing",
    "@id": CONCEPT_IDS[conceptId],
    name: def.name,
    description: def.description,
    url: pageUrl(def.canonicalPath),
  };
}

/** Deduplica e gera nós Thing para about + mentions. */
export function buildConceptNodes(ids: readonly ConceptId[]): Record<string, unknown>[] {
  return [...new Set(ids)].map(buildConceptNode);
}

export function conceptRefs(ids: readonly ConceptId[]): { "@id": string }[] {
  return [...new Set(ids)].map((id) => idRef(CONCEPT_IDS[id]));
}

/** Refs a BlogPosting de outras URLs (sem embutir o artigo inteiro). */
export function articleRefs(paths: readonly string[]): { "@id": string }[] {
  return paths.map((p) => idRef(pageId(p, "article")));
}

export function buildGraph(nodes: Record<string, unknown>[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
