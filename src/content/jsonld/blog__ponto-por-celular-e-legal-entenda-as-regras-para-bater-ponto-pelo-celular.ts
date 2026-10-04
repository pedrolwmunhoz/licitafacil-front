import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular — sem import do post completo. */
export const path = "/blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular";
export const jsonLd = articleJsonLd({
  path: "/blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular",
  title: "Ponto por celular é legal? Entenda as regras para bater ponto pelo celular",
  description: "Ponto por celular é legal? REP-P na Portaria 671, comprovante, geolocalização, reconhecimento facial, celular pessoal e checklist antes de contratar um app de ponto.",
  publishedAt: "2026-09-08",
  updatedAt: "2026-09-17",
  faqs: [{ q: "Ponto pelo celular é legal?", a: "Sim. A Portaria 671 prevê o REP-P e o Ministério do Trabalho informa que essa modalidade permite o uso de tecnologias como a marcação de ponto mobile." }, { q: "Funcionário pode bater ponto pelo próprio celular?", a: "Sim, desde que o sistema esteja de acordo com as regras aplicáveis ao registro de jornada. O celular pode funcionar como coletor de marcação. A empresa deve verificar também convenção ou acordo coletivo, quando houver." }, { q: "A empresa pode exigir o uso do celular pessoal?", a: "Permitir o registro pelo celular pessoal é diferente de obrigar o trabalhador a usar o próprio aparelho. A empresa não deve simplesmente transferir ao funcionário os custos da obrigação, e deve definir quem responde por equipamento, conexão e demais custos." }, { q: "Ponto pelo WhatsApp é válido?", a: "Não basta enviar horário de entrada ou saída pelo WhatsApp e considerar isso um sistema de registro eletrônico de ponto. Se a empresa usa registro eletrônico, deve observar a modalidade e os requisitos da Portaria 671." }, { q: "Ponto por aplicativo é permitido?", a: "Sim, desde que a solução utilizada como sistema de registro eletrônico cumpra os requisitos aplicáveis." }, { q: "Ponto com geolocalização é permitido?", a: "Sim. A geolocalização pode registrar o local da marcação e ajudar a confirmar se ela ocorreu no local autorizado. A empresa deve observar as regras de proteção de dados pessoais." }, { q: "Ponto com reconhecimento facial é permitido?", a: "Pode ser utilizado, mas o reconhecimento facial envolve tratamento de dado biométrico, que possui proteção específica pela LGPD." }, { q: "O ponto pelo celular precisa de homologação?", a: "Para o REP-P, o Ministério do Trabalho informa que não há a mesma certificação e homologação exigida para o REP-C. O REP-P precisa de certificado de registro de programa de computador no INPI." }, { q: "Ponto por celular é seguro?", a: "Pode ser, dependendo do sistema e das medidas de segurança. No REP-P, a Portaria 671 exige armazenamento com redundância, alta disponibilidade e confiabilidade. Vale conferir backup, autenticação, proteção dos dados e recuperação." }, { q: "O funcionário recebe comprovante do ponto?", a: "Sim. O REP-P deve disponibilizar o comprovante do registro ao trabalhador, inclusive em formato eletrônico." }],
  aboutIds: ["pontoEletronico", "repP"],
  mentionIds: ["portaria671", "geolocalizacao", "comprovanteDePonto"],
  relatedArticlePaths: [
    "/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
    "/blog/registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras",
  ],
});
