/** Links das landings por segmento — hub em /segmentos. */

export type SegmentoLink = { label: string; to: string };

export const SEGMENTOS_LINKS: SegmentoLink[] = [
  { label: "Construção", to: "/ponto-eletronico-para-construcao" },
  { label: "Clínicas", to: "/ponto-eletronico-para-clinicas" },
  { label: "Varejo", to: "/ponto-eletronico-para-varejo" },
  { label: "Indústria", to: "/ponto-eletronico-para-industria" },
  { label: "Empregada doméstica", to: "/ponto-eletronico-empregada-domestica" },
  { label: "Transportes", to: "/ponto-eletronico-para-transportes" },
  { label: "Contabilidades", to: "/ponto-eletronico-para-contabilidades" },
  { label: "Restaurantes", to: "/ponto-eletronico-para-restaurantes" },
  { label: "Escolas", to: "/ponto-eletronico-para-escolas" },
  { label: "Condomínios", to: "/ponto-eletronico-para-condominios" },
  { label: "Salões", to: "/ponto-eletronico-para-saloes" },
  { label: "Call center", to: "/ponto-eletronico-para-call-center" },
  { label: "Hotéis", to: "/ponto-eletronico-para-hoteis" },
  { label: "Advocacia", to: "/ponto-eletronico-para-advocacia" },
  { label: "Franquias", to: "/ponto-eletronico-para-franquias" },
];
