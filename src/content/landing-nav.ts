/** Rotas públicas de marketing (SEO + legais) — Navbar com links reais, não só hash. */
export const SEO_LANDING_PATHS = [
  "/precos",
  "/ponto-eletronico-para-construcao",
  "/ponto-eletronico-para-clinicas",
  "/ponto-eletronico-para-varejo",
  "/ponto-eletronico-para-industria",
  "/ponto-eletronico-empregada-domestica",
  "/ponto-eletronico-para-transportes",
  "/ponto-eletronico-para-contabilidades",
  "/ponto-eletronico-para-restaurantes",
  "/ponto-eletronico-para-escolas",
  "/ponto-eletronico-para-condominios",
  "/ponto-eletronico-para-saloes",
  "/ponto-eletronico-para-call-center",
  "/ponto-eletronico-para-hoteis",
  "/ponto-eletronico-para-advocacia",
  "/ponto-eletronico-para-franquias",
  "/segmentos",
] as const;

export type SeoLandingPath = (typeof SEO_LANDING_PATHS)[number];

export const HELP_PATHS = ["/perguntas-frequentes", "/documentacao"] as const;

import { CALCULATORS_INDEX_PATH } from "./calculators/constants";
import { CONTACT_EMAIL } from "./landing-site";

export const LEGAL_PATHS = ["/sobre", "/privacidade", "/termos", "/exclusao-conta"] as const;

export function isHomePath(pathname: string): boolean {
  return pathname === "/";
}

export function isSeoLandingPath(pathname: string): boolean {
  return (SEO_LANDING_PATHS as readonly string[]).includes(pathname);
}

export function isLegalPath(pathname: string): boolean {
  return (LEGAL_PATHS as readonly string[]).includes(pathname);
}

export function isHelpPath(pathname: string): boolean {
  return (HELP_PATHS as readonly string[]).includes(pathname);
}

export function isCalculatorPath(pathname: string): boolean {
  return pathname === CALCULATORS_INDEX_PATH || pathname.startsWith(`${CALCULATORS_INDEX_PATH}/`);
}

/** Páginas com shell de marketing (navbar sólida, links para rotas). */
export function isPublicMarketingShell(pathname: string): boolean {
  return (
    isSeoLandingPath(pathname) ||
    isLegalPath(pathname) ||
    isHelpPath(pathname) ||
    isCalculatorPath(pathname)
  );
}

/** Login/recuperação usam shell de marketing no header (login visível, CTA Contratar). */
export function isPublicHeaderShell(pathname: string): boolean {
  return (
    isPublicMarketingShell(pathname) ||
    pathname === "/login" ||
    pathname === "/recuperar-senha" ||
    pathname === "/cadastro"
  );
}

export const HOME_HASH_NAV = [
  { label: "Início", hash: "topo" },
  { label: "Benefícios", hash: "beneficios" },
  { label: "Funcionalidades", hash: "funcionalidades" },
  { label: "Como funciona", hash: "como-funciona" },
  { label: "Preços", to: "/precos" },
  { label: "FAQ", to: "/perguntas-frequentes" },
] as const;

export const MARKETING_NAV_LINKS = [
  { label: "Início", to: "/" },
  { label: "Para empresas", to: "/blog/ponto-eletronico-para-empresas-como-funciona-o-controle-de-jornada" },
  { label: "Geolocalização", to: "/blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve" },
  { label: "Portaria 671", to: "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico" },
  { label: "Preços", to: "/precos" },
  { label: "Calculadoras", to: CALCULATORS_INDEX_PATH },
] as const;

export type FooterNavLink = { label: string; to: string; external?: boolean };

export const FOOTER_PRODUCT_LINKS: FooterNavLink[] = [
  { label: "Segmentos", to: "/segmentos" },
  { label: "Preços", to: "/precos" },
  { label: "Calculadoras", to: CALCULATORS_INDEX_PATH },
];

export const FOOTER_HELP_LINKS: FooterNavLink[] = [
  { label: "Blog", to: "/blog" },
  { label: "Como usar", to: "/documentacao" },
  { label: "Perguntas frequentes", to: "/perguntas-frequentes" },
  { label: "Documentação", to: "/documentacao" },
];

export const FOOTER_INSTITUTIONAL_LINKS: FooterNavLink[] = [
  { label: "Sobre", to: LEGAL_PATHS[0] },
  { label: "Política de Privacidade", to: LEGAL_PATHS[1] },
  { label: "Política exclusão conta", to: LEGAL_PATHS[3] },
  { label: "Termos de Uso", to: LEGAL_PATHS[2] },
  { label: "Suporte", to: `mailto:${CONTACT_EMAIL}`, external: true },
];

export const FOOTER_ACCOUNT_LINKS: FooterNavLink[] = [
  { label: "Login", to: "/login" },
  { label: "Recuperar conta", to: "/recuperar-senha" },
  { label: "Cadastro", to: "/cadastro" },
];
