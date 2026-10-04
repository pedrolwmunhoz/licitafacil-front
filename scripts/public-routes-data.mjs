/** Fonte JS pura para generate-mpa-entries.mjs (sem TS). */
import { blogPostRoutesFromDisk } from "./blog-posts-mpa.mjs";

function idFromPath(path) {
  if (path === "/") return "home";
  return path
    .replace(/^\//, "")
    .replace(/\//g, "--")
    .replace(/[^a-zA-Z0-9-_]/g, "-");
}

const FIXED = [
  { path: "/", pageModule: "pages/Index.tsx" },
  { path: "/404", pageModule: "pages/NotFound.tsx" },
  { path: "/login", pageModule: "pages/auth/LoginPage.tsx", shell: "auth" },
  { path: "/logint", pageModule: "pages/auth/LogintPage.tsx", shell: "auth" },
  { path: "/recuperar-senha", pageModule: "pages/auth/RecuperarSenhaPage.tsx", shell: "auth" },
  { path: "/cadastro", pageModule: "pages/CadastroPage.tsx", shell: "auth" },
  { path: "/cobranca/concluido", pageModule: "pages/CobrancaConcluidoPage.tsx", shell: "auth" },
  { path: "/sobre", pageModule: "pages/legal/SobrePage.tsx" },
  { path: "/privacidade", pageModule: "pages/legal/PrivacidadePage.tsx" },
  { path: "/termos", pageModule: "pages/legal/TermosPage.tsx" },
  { path: "/exclusao-conta", pageModule: "pages/legal/ExclusaoContaPage.tsx" },
  { path: "/precos", pageModule: "pages/marketing/PrecosSeoPage.tsx" },
  { path: "/perguntas-frequentes", pageModule: "pages/marketing/PerguntasFrequentesPage.tsx" },
  { path: "/documentacao", pageModule: "pages/marketing/DocumentacaoPage.tsx" },
  { path: "/blog", pageModule: "pages/marketing/BlogIndexPage.tsx" },
  { path: "/calculadoras", pageModule: "pages/marketing/CalculadorasIndexPage.tsx" },
  { path: "/calculadoras/hora-extra", pageModule: "pages/marketing/CalculadoraHoraExtraPage.tsx" },
  { path: "/calculadoras/horas-noturnas", pageModule: "pages/marketing/CalculadoraHorasNoturnasPage.tsx" },
  { path: "/calculadoras/ferias", pageModule: "pages/marketing/CalculadoraFeriasPage.tsx" },
  { path: "/calculadoras/ferias-empregada-domestica", pageModule: "pages/marketing/CalculadoraFeriasEmpregadaDomesticaPage.tsx" },
  { path: "/calculadoras/folha-de-pagamento", pageModule: "pages/marketing/CalculadoraFolhaDePagamentoPage.tsx" },
  { path: "/calculadoras/imposto-de-renda", pageModule: "pages/marketing/CalculadoraImpostoDeRendaPage.tsx" },
  { path: "/calculadoras/inss", pageModule: "pages/marketing/CalculadoraInssPage.tsx" },
  { path: "/calculadoras/fgts", pageModule: "pages/marketing/CalculadoraFgtsPage.tsx" },
  { path: "/ponto-eletronico-para-construcao", pageModule: "pages/marketing/PontoEletronicoParaConstrucaoPage.tsx" },
  { path: "/ponto-eletronico-para-clinicas", pageModule: "pages/marketing/PontoEletronicoParaClinicasPage.tsx" },
  { path: "/ponto-eletronico-para-varejo", pageModule: "pages/marketing/PontoEletronicoParaVarejoPage.tsx" },
  { path: "/ponto-eletronico-para-industria", pageModule: "pages/marketing/PontoEletronicoParaIndustriaPage.tsx" },
  { path: "/ponto-eletronico-empregada-domestica", pageModule: "pages/marketing/PontoEletronicoEmpregadaDomesticaPage.tsx" },
  { path: "/ponto-eletronico-para-transportes", pageModule: "pages/marketing/PontoEletronicoParaTransportesPage.tsx" },
  { path: "/ponto-eletronico-para-contabilidades", pageModule: "pages/marketing/PontoEletronicoParaContabilidadesPage.tsx" },
  { path: "/ponto-eletronico-para-restaurantes", pageModule: "pages/marketing/PontoEletronicoParaRestaurantesPage.tsx" },
  { path: "/ponto-eletronico-para-escolas", pageModule: "pages/marketing/PontoEletronicoParaEscolasPage.tsx" },
  { path: "/ponto-eletronico-para-condominios", pageModule: "pages/marketing/PontoEletronicoParaCondominiosPage.tsx" },
  { path: "/ponto-eletronico-para-saloes", pageModule: "pages/marketing/PontoEletronicoParaSaloesPage.tsx" },
  { path: "/ponto-eletronico-para-call-center", pageModule: "pages/marketing/PontoEletronicoParaCallCenterPage.tsx" },
  { path: "/ponto-eletronico-para-hoteis", pageModule: "pages/marketing/PontoEletronicoParaHoteisPage.tsx" },
  { path: "/ponto-eletronico-para-advocacia", pageModule: "pages/marketing/PontoEletronicoParaAdvocaciaPage.tsx" },
  { path: "/ponto-eletronico-para-franquias", pageModule: "pages/marketing/PontoEletronicoParaFranquiasPage.tsx" },
  { path: "/calculadoras/folha-de-ponto", pageModule: "pages/marketing/CalculadoraFolhaDePontoPage.tsx" },
  { path: "/calculadoras/domingo-trabalhado", pageModule: "pages/marketing/CalculadoraDomingoTrabalhadoPage.tsx" },
  { path: "/calculadoras/feriado-trabalhado", pageModule: "pages/marketing/CalculadoraFeriadoTrabalhadoPage.tsx" },
  { path: "/calculadoras/banco-de-horas", pageModule: "pages/marketing/CalculadoraBancoDeHorasPage.tsx" },
  { path: "/calculadoras/custo-ponto-eletronico", pageModule: "pages/marketing/CalculadoraCustoPontoPage.tsx" },
  { path: "/segmentos", pageModule: "pages/marketing/SegmentosPage.tsx" },
];

export const PUBLIC_ROUTES = FIXED.map((r) => ({
  id: idFromPath(r.path),
  path: r.path,
  pageModule: r.pageModule,
  shell: r.shell ?? "plain",
}));

/** Uma entrada MPA por post — pages/jsonld/catálogo são arquivos na mão. */
export const BLOG_POST_ROUTES = blogPostRoutesFromDisk();

export const ALL_PUBLIC_ENTRIES = [...PUBLIC_ROUTES, ...BLOG_POST_ROUTES];

export function findPublicRouteByPath(pathname) {
  return ALL_PUBLIC_ENTRIES.find((r) => r.path === pathname);
}
