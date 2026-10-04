import { Link } from "react-router-dom";
import { LANDING_PROSE_LINK_CLASS } from "@/content/landing-site";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { PageSeo } from "@/components/seo/PageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { SeoLandingHero } from "@/components/marketing/SeoLandingHero";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import { jsonLd as calculadorasJsonLd } from "@/content/jsonld/calculadoras";
import { ArrowRight, Calculator } from "lucide-react";


// intent: hub calculadoras de ponto / jornada / folha

const seo = PUBLIC_PAGE_SEO.calculadoras;

const CALCULADORAS = [
  {
    ...PUBLIC_PAGE_SEO.calculadoraFolhaDePonto,
    blurb: "Some batidas de entrada e saída — a clássica calculadora de ponto/cartão.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraFerias,
    blurb: "15, 20 ou 30 dias, proporcional, terço e abono — estimativa bruta.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraFeriasEmpregadaDomestica,
    blurb: "Salário + 1/3, 10 a 30 dias e abono — empregada doméstica.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraHoraExtra,
    blurb: "50% em dia útil ou 100% em domingo/feriado sobre a hora normal.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraDomingoTrabalhado,
    blurb: "Mensalista ÷ 30 (Súmula 146) ou horista em dobro — só domingo.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraFeriadoTrabalhado,
    blurb: "Mensalista ÷ 30 (Súmula 146) ou horista em dobro — só feriado.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraHorasNoturnas,
    blurb: "Hora reduzida e adicional noturno entre 22h e 5h.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraBancoDeHoras,
    blurb: "Créditos, débitos, fator e saldo estimado do banco.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraFolhaDePagamento,
    blurb: "Estimativa de líquido com INSS e IRRF 2026 — não substitui o contador.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraImpostoDeRenda,
    blurb: "Só IRRF: salário, dependentes, tabela 2026 e redução Lei 15.270.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraInss,
    blurb: "Só INSS do empregado: tabela progressiva 2026 até o teto.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraFgts,
    blurb: "Depósito de 8% ou 2%, proporcional e multa de 40%.",
  },
  {
    ...PUBLIC_PAGE_SEO.calculadoraCustoPonto,
    blurb: "Estime o custo mensal/anual do SegPonto por headcount.",
  },
] as const;

const CalculadorasIndexPage = () => (
  <div className="min-h-screen bg-white text-landing-ink antialiased">
    <PageSeo {...seo} />
    <JsonLdScript routeKey={seo.path} graph={calculadorasJsonLd} />
    <Navbar />
    <main id="conteudo-principal" tabIndex={-1}>
      <SeoLandingHero
        eyebrow="Ferramentas"
        titleBefore="Calculadoras de ponto, jornada e"
        highlight="folha"
        subtitle="Some batidas, estime férias, hora extra, noturno, banco, IRRF, INSS, FGTS e o custo do SegPonto. Cada ferramenta devolve o número; o blog traz a regra com exemplos."
        showCta={false}
      />
      <section className="py-12 md:py-16 bg-landing-canvas border-t border-landing-ink/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <ul className="grid gap-6 sm:grid-cols-1">
            {CALCULADORAS.map((calc) => (
              <li key={calc.path}>
                <Link
                  to={calc.path}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-landing-ink/15 bg-white p-6 shadow-sm hover:border-landing-ink/30 transition-colors"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-landing-cta/15 text-landing-ink">
                    <Calculator className="h-6 w-6" aria-hidden />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-lg font-semibold text-landing-ink group-hover:underline underline-offset-4">
                      {calc.title.split(" | ")[0]}
                    </h2>
                    <p className="mt-2 text-sm text-landing-muted leading-relaxed">{calc.blurb}</p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-landing-muted group-hover:text-landing-ink transition-colors"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-landing-muted text-center">
            Guias no{" "}
            <Link to="/blog" className={LANDING_PROSE_LINK_CLASS}>
              blog SegPonto
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default CalculadorasIndexPage;
