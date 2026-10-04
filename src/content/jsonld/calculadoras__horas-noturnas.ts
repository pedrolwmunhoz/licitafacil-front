import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/horas-noturnas */
export const path = "/calculadoras/horas-noturnas";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/horas-noturnas",
  title: "Calculadora de horas noturnas | SegPonto",
  description: "Calculadora de horas noturnas: hora reduzida (52min30s), adicional de 20% e valor bruto entre 22h e 5h (urbano).",
  faqs: [{ q: "Por que não mostro “total com hora cheia + adicional” como se fosse tudo a mais?", a: "Porque no mensalista a hora normal já está no salário. O acréscimo típico é só o adicional noturno. A hora reduzida também conta na jornada e pode gerar hora extra em outra conta." }, { q: "O adicional mínimo é sempre 20%?", a: "No urbano o mínimo legal é 20%. Convenção coletiva pode majorar — ajuste o percentual." }, { q: "Posso somar HE e noturno juntos aqui?", a: "Não. Calcule o adicional noturno aqui e a hora extra na calculadora de hora extra." }],
  aboutIds: ["horasNoturnas"],
  mentionIds: ["horaExtra", "folhaDePagamento"],
  relatedArticlePaths: [
    "/blog/como-calcular-horas-noturnas",
    "/blog/como-calcular-hora-extra",
  ],
});
