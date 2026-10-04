import type { BLOG_POST_SLUGS } from "@/content/blog/post-slugs";

export const BLOG_CATEGORIAS = ["Ponto eletrônico", "Jornada", "Legislação", "Cálculos"] as const;

export type BlogCategoria = (typeof BLOG_CATEGORIAS)[number];

/** Todo slug publicado precisa de categoria (o tipo obriga ao incluir um post novo). */
export const BLOG_CATEGORIA_POR_SLUG: Record<(typeof BLOG_POST_SLUGS)[number], BlogCategoria> = {
  "multas-por-irregularidades-no-ponto-eletronico-quando-a-empresa-pode-ser-autuada": "Legislação",
  "intervalo-pre-assinalado-o-que-e-como-funciona-e-quais-sao-as-regras": "Legislação",
  "escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada": "Jornada",
  "jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras": "Jornada",
  "quanto-tempo-guardar-registro-de-ponto": "Legislação",
  "comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras": "Legislação",
  "integracao-do-ponto-com-a-folha-de-pagamento-como-funciona": "Jornada",
  "como-implantar-ponto-eletronico-na-empresa-passo-a-passo": "Ponto eletrônico",
  "ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras": "Legislação",
  "ponto-por-app-vs-relogio-de-ponto-qual-a-diferenca-e-como-escolher": "Ponto eletrônico",
  "ponto-com-reconhecimento-facial-como-funciona-e-quais-sao-as-regras": "Ponto eletrônico",
  "ponto-eletronico-com-biometria-como-funciona-e-quais-sao-as-regras": "Ponto eletrônico",
  "ponto-eletronico-offline-como-funciona-quando-nao-ha-internet": "Ponto eletrônico",
  "folha-de-ponto-online-como-funciona-e-como-fazer-o-controle-da-jornada": "Jornada",
  "app-de-ponto-eletronico-como-funciona-e-como-usar": "Ponto eletrônico",
  "geolocalizacao-no-ponto-como-funciona-e-para-que-serve": "Ponto eletrônico",
  "controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios": "Jornada",
  "controle-de-jornada-e-obrigatorio-entenda-quando-a-empresa-precisa-registrar-o-ponto": "Legislação",
  "ponto-eletronico-para-home-office-como-funciona-o-controle-de-jornada": "Jornada",
  "excecoes-ao-controle-de-jornada-o-que-diz-o-artigo-62-da-clt": "Legislação",
  "ponto-eletronico-para-empresas-como-funciona-o-controle-de-jornada": "Ponto eletrônico",
  "registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras": "Ponto eletrônico",
  "rep-c-rep-a-e-rep-p-entenda-as-diferencas": "Legislação",
  "como-funciona-o-banco-de-horas-na-pratica": "Jornada",
  "como-calcular-horas-noturnas": "Cálculos",
  "como-calcular-ferias": "Cálculos",
  "como-calcular-folha-de-pagamento": "Cálculos",
  "como-calcular-hora-extra": "Cálculos",
  "ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular": "Legislação",
  "portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico": "Legislação",
  "como-escolher-um-sistema-de-ponto-eletronico-para-pequenas-empresas": "Ponto eletrônico",
  "quanto-custa-um-sistema-de-ponto-eletronico": "Ponto eletrônico",
  "como-calcular-ferias-coletivas": "Cálculos",
  "como-calcular-ferias-empregada-domestica": "Cálculos",
  "o-que-e-afd-e-aej": "Legislação",
  "como-calcular-imposto-de-renda": "Cálculos",
  "como-calcular-inss": "Cálculos",
  "como-calcular-fgts": "Cálculos",
  "o-que-e-espelho-de-ponto": "Jornada",
  "como-fechar-o-ponto-do-mes": "Jornada",
  "tolerancia-de-ponto-na-clt-quantos-minutos-o-funcionario-pode-atrasar": "Legislação",
  "empresa-com-menos-de-20-funcionarios-precisa-de-ponto": "Legislação",
  "como-calcular-domingo-trabalhado": "Cálculos",
  "como-calcular-feriado-trabalhado": "Cálculos",
  "o-que-e-um-sistema-de-ponto-eletronico": "Ponto eletrônico",
};

export function blogCategoria(slug: string): BlogCategoria {
  return BLOG_CATEGORIA_POR_SLUG[slug as keyof typeof BLOG_CATEGORIA_POR_SLUG];
}
