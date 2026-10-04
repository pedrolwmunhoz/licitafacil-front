import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-calcular-ferias-empregada-domestica — sem import do post completo. */
export const path = "/blog/como-calcular-ferias-empregada-domestica";
export const jsonLd = articleJsonLd({
  path: "/blog/como-calcular-ferias-empregada-domestica",
  title: "Como calcular férias empregada doméstica",
  description: "Como calcular férias de empregada doméstica: 30, 20, 15, 14 e 10 dias, 1/3, proporcionais, abono, eSocial e exemplos com salários.",
  publishedAt: "2026-06-10",
  updatedAt: "2026-09-19",
  faqs: [{ q: "Como calcular 30 dias de férias de empregada doméstica?", a: "Some ao salário o adicional de 1/3. Com salário de R$ 2.400,00, o total bruto é R$ 3.200,00." }, { q: "Como calcular 15 dias de férias de empregada doméstica?", a: "Divida o salário por 30, multiplique por 15 e acrescente 1/3 sobre o resultado." }, { q: "Como calcular 10 dias de férias de empregada doméstica?", a: "Divida o salário por 30, multiplique por 10 e acrescente 1/3." }, { q: "Quantos dias de férias a empregada doméstica tem?", a: "Em regra, 30 dias após cada período de 12 meses de trabalho, observadas as regras aplicáveis ao contrato e à jornada." }, { q: "A empregada doméstica pode dividir as férias?", a: "Sim. As férias podem ser divididas em até dois períodos, sendo um deles de pelo menos 14 dias corridos." }, { q: "A empregada doméstica pode vender 10 dias?", a: "Sim. Ela pode converter 1/3 das férias em abono pecuniário, limitado a 10 dias." }, { q: "Quando as férias devem ser pagas?", a: "Até dois dias antes do início das férias." }, { q: "Como calcular férias proporcionais de empregada doméstica?", a: "Em regra, calcula-se 1/12 do direito de férias para cada mês de serviço, considerando a fração superior a 14 dias na contagem dos avos. Depois, acrescenta-se 1/3." }],
  aboutIds: ["ferias", "folhaDePagamento"],
  mentionIds: ["inss"],
  relatedArticlePaths: [
    "/blog/como-calcular-ferias",
    "/blog/como-calcular-ferias-coletivas",
  ],
});
