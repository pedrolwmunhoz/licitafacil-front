import { LegalPageLayout } from "@/components/landing/LegalPageLayout";
import FinalCTASection from "@/components/landing/FinalCTASection";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import { BRAND_NAME } from "@/content/landing-site";
import { jsonLd } from "@/content/jsonld/sobre";

const diferenciais = [
  {
    titulo: "Sistema de ponto online",
    texto:
      "A gestão do ponto pode ser realizada pela internet, sem depender de equipamentos específicos instalados na empresa.",
  },
  {
    titulo: "Registro pelo aplicativo",
    texto:
      "Os funcionários podem realizar seus registros de ponto pelo celular, de acordo com as configurações definidas pela empresa.",
  },
  {
    titulo: "Gestão da jornada em um só lugar",
    texto:
      "Registros de ponto, jornadas, escalas, horas extras, banco de horas e outras informações ficam centralizados na plataforma.",
  },
  {
    titulo: "Geolocalização",
    texto:
      "A empresa pode utilizar a geolocalização nos registros de ponto para obter informações adicionais sobre onde o registro foi realizado.",
  },
  {
    titulo: "Planos por quantidade de funcionários",
    texto: "A empresa pode escolher um plano de acordo com a quantidade de funcionários que precisa gerenciar.",
  },
  {
    titulo: "Desenvolvimento contínuo",
    texto:
      `O ${BRAND_NAME} está em constante evolução, com novos recursos e melhorias desenvolvidos a partir das necessidades da gestão de jornada.`,
  },
] as const;

const valores = [
  {
    titulo: "Simplicidade",
    texto:
      "Criar uma experiência fácil de entender e utilizar, tanto para quem administra o ponto quanto para quem registra a jornada.",
  },
  {
    titulo: "Acessibilidade",
    texto: "Desenvolver uma solução que possa ser utilizada por empresas de diferentes tamanhos e necessidades.",
  },
  {
    titulo: "Confiabilidade",
    texto:
      "Tratar os registros de jornada como informações importantes para a empresa e seus funcionários, buscando manter a plataforma estável e os dados protegidos.",
  },
  {
    titulo: "Transparência",
    texto:
      "Oferecer informações claras sobre o funcionamento da plataforma, seus recursos, planos e tratamento de dados.",
  },
  {
    titulo: "Evolução contínua",
    texto:
      "Ouvir as necessidades dos usuários e aprimorar constantemente a plataforma, seus recursos e sua experiência de uso.",
  },
] as const;

const SobrePage = () => (
  <LegalPageLayout
    seo={PUBLIC_PAGE_SEO.sobre}
    jsonLd={jsonLd}
    title="Sobre"
    afterContent={<FinalCTASection />}
  >
    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">O {BRAND_NAME}</h2>
      <p>
        O <strong className="text-landing-ink">{BRAND_NAME}</strong> é um sistema de ponto eletrônico online
        desenvolvido para facilitar o controle e a gestão da jornada de trabalho das empresas.
      </p>
      <p>
        A plataforma permite registrar, acompanhar e organizar as informações de jornada dos funcionários em um único
        lugar, oferecendo recursos para o controle de entradas, saídas, intervalos, horas trabalhadas, horas extras,
        banco de horas, escalas e demais informações relacionadas à jornada.
      </p>
      <p>
        O sistema funciona online e foi desenvolvido para tornar a gestão do ponto mais prática, tanto para a empresa
        quanto para os funcionários.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">Nosso propósito</h2>
      <p>O {BRAND_NAME} existe para tornar o controle de jornada mais simples.</p>
      <p>
        Empresas precisam registrar e acompanhar a jornada de seus funcionários, mas esse processo não precisa
        depender de planilhas, anotações ou ferramentas difíceis de utilizar.
      </p>
      <p>
        Nosso propósito é oferecer uma plataforma que centralize essas informações e facilite as tarefas de quem
        administra o ponto, ao mesmo tempo em que proporciona aos funcionários uma forma prática de realizar seus
        registros.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">Nossos diferenciais</h2>
      <ul className="space-y-4">
        {diferenciais.map((item) => (
          <li key={item.titulo}>
            <p className="font-semibold text-landing-ink">{item.titulo}</p>
            <p className="mt-1">{item.texto}</p>
          </li>
        ))}
      </ul>
    </section>

    <section className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-landing-ink">Missão, visão e valores</h2>

      <div className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-landing-ink">Missão</h3>
        <p>
          Facilitar o controle da jornada de trabalho para que empresas possam registrar, acompanhar e organizar o
          ponto dos seus funcionários de forma simples e eficiente.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-landing-ink">Visão</h3>
        <p>
          Tornar o controle de ponto eletrônico mais acessível para empresas de diferentes tamanhos, oferecendo uma
          plataforma completa para acompanhar a jornada de trabalho em um único lugar.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-landing-ink">Valores</h3>
        <ul className="space-y-4">
          {valores.map((item) => (
            <li key={item.titulo}>
              <p className="font-semibold text-landing-ink">{item.titulo}</p>
              <p className="mt-1">{item.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">Credibilidade</h2>
      <p>
        O {BRAND_NAME} é uma plataforma de tecnologia desenvolvida especificamente para o controle e a gestão da
        jornada de trabalho.
      </p>
      <p>
        A plataforma reúne recursos para diferentes etapas da gestão do ponto, desde o registro realizado pelo
        funcionário até o acompanhamento das informações pela empresa.
      </p>
      <p>
        O sistema também foi desenvolvido considerando aspectos relacionados à segurança e à privacidade das
        informações. O tratamento de dados pessoais realizado pela plataforma segue a legislação aplicável, incluindo a{" "}
        <strong className="text-landing-ink">Lei Geral de Proteção de Dados (LGPD)</strong>.
      </p>
      <p>
        Nosso compromisso é manter uma plataforma clara, funcional e em constante evolução, buscando atender às
        necessidades reais das empresas que utilizam o sistema.
      </p>
    </section>
  </LegalPageLayout>
);

export default SobrePage;
