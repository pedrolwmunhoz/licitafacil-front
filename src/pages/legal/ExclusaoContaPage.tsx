import { LegalPageLayout } from "@/components/landing/LegalPageLayout";
import FinalCTASection from "@/components/landing/FinalCTASection";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import { BRAND_NAME, CONTACT_EMAIL, LANDING_PROSE_LINK_CLASS } from "@/content/landing-site";
import { jsonLd } from "@/content/jsonld/exclusao-conta";

const ExclusaoContaPage = () => (
  <LegalPageLayout
    seo={PUBLIC_PAGE_SEO.exclusaoConta}
    jsonLd={jsonLd}
    title="Exclusão de conta"
    updatedAt="26 de setembro de 2026"
    afterContent={<FinalCTASection />}
  >
    <section className="space-y-4">
      <p>
        O <strong className="text-landing-ink">{BRAND_NAME}</strong> permite que o usuário solicite a exclusão de sua
        conta e dos dados pessoais associados ao serviço, observadas as hipóteses legais que autorizam a conservação de
        determinadas informações.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">Como solicitar a exclusão da conta</h2>
      <p>Para solicitar a exclusão da sua conta, envie uma solicitação para:</p>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`} className={LANDING_PROSE_LINK_CLASS}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <p>
        No e-mail, informe o <strong className="text-landing-ink">e-mail utilizado no cadastro da conta</strong> e
        solicite a exclusão da conta e dos dados pessoais associados.
      </p>
      <p>
        A solicitação será analisada para confirmar a identidade do solicitante e evitar a exclusão indevida de uma conta
        por terceiros.
      </p>
      <p>
        Após a confirmação, a conta será desativada e os dados sujeitos à exclusão serão removidos dos sistemas do{" "}
        {BRAND_NAME}.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">Quais dados serão excluídos</h2>
      <p>
        Quando não houver obrigação legal ou outra hipótese que permita sua conservação, serão excluídos os dados
        pessoais associados à conta, incluindo:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Nome e dados cadastrais do responsável pela conta;</li>
        <li>E-mail e telefone cadastrados;</li>
        <li>Dados de autenticação e acesso;</li>
        <li>Registros de entrada, saída e intervalos;</li>
        <li>Registros de jornada e marcações de ponto;</li>
        <li>Informações de escalas e jornadas cadastradas;</li>
        <li>Banco de horas e informações relacionadas à apuração da jornada;</li>
        <li>Dados de geolocalização vinculados às marcações de ponto;</li>
        <li>Informações e configurações utilizadas para o funcionamento da conta;</li>
        <li>Demais dados pessoais armazenados em razão da utilização do {BRAND_NAME}.</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">Quais dados podem ser mantidos</h2>
      <p>
        Alguns dados poderão ser mantidos após a exclusão da conta quando sua conservação for necessária para cumprimento
        de obrigação legal ou regulatória, exercício regular de direitos ou outra hipótese prevista na legislação.
      </p>
      <p>Podem ser mantidos, conforme a situação:</p>

      <h3 className="font-display text-lg font-semibold text-landing-ink">
        Dados necessários para obrigações fiscais, contábeis e financeiras
      </h3>
      <p>Podem ser conservados:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Dados de identificação do contratante;</li>
        <li>CPF ou CNPJ, quando necessário para documentação fiscal ou contábil;</li>
        <li>Dados relacionados a pagamentos e cobranças;</li>
        <li>Registros de transações realizadas;</li>
        <li>Notas fiscais e documentos fiscais;</li>
        <li>Informações necessárias para cumprimento de obrigações tributárias e contábeis.</li>
      </ul>

      <h3 className="font-display text-lg font-semibold text-landing-ink">
        Registros necessários para obrigações trabalhistas
      </h3>
      <p>
        Quando existentes e quando sua conservação for exigida pela legislação aplicável, poderão ser mantidos:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Registros de jornada;</li>
        <li>Marcações de entrada, saída e intervalos;</li>
        <li>Informações utilizadas para apuração da jornada de trabalho;</li>
        <li>Registros relacionados ao banco de horas;</li>
        <li>Informações relacionadas às escalas e jornadas;</li>
        <li>Identificação do empregador e do trabalhador associada aos registros necessários;</li>
        <li>Documentos e registros necessários para comprovação do cumprimento de obrigações trabalhistas.</li>
      </ul>
      <p>
        Esses dados poderão ser mantidos pelo período exigido pela legislação aplicável, especialmente quando necessários
        para atender obrigações trabalhistas, fiscais, previdenciárias ou para comprovar o cumprimento de obrigações
        legais.
      </p>

      <h3 className="font-display text-lg font-semibold text-landing-ink">
        Dados necessários para exercício regular de direitos
      </h3>
      <p>Também poderão ser conservados, pelo período necessário:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Registros de solicitações de suporte;</li>
        <li>Comunicações realizadas com o usuário;</li>
        <li>Registros necessários para comprovar operações realizadas no sistema;</li>
        <li>Informações necessárias para defesa de direitos em processos judiciais, administrativos ou arbitrais;</li>
        <li>
          Registros relacionados a eventuais disputas, reclamações ou solicitações que ainda não tenham sido encerradas.
        </li>
      </ul>
      <p>
        Esses dados serão mantidos somente enquanto houver necessidade de sua conservação para a finalidade que a
        justifique.
      </p>

      <h3 className="font-display text-lg font-semibold text-landing-ink">Registros de segurança</h3>
      <p>Poderão ser mantidos registros técnicos e de segurança necessários para:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Prevenção e investigação de fraudes;</li>
        <li>Segurança da plataforma;</li>
        <li>Identificação e investigação de acessos indevidos;</li>
        <li>Prevenção de abusos e ataques aos sistemas;</li>
        <li>Cumprimento de obrigações legais relacionadas à guarda de registros.</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">
        Por quanto tempo os dados obrigatórios serão mantidos
      </h2>
      <p>
        Os dados mantidos por obrigação legal, regulatória ou para exercício regular de direitos{" "}
        <strong className="text-landing-ink">não possuem necessariamente um único prazo de retenção</strong>.
      </p>
      <p>O período dependerá da natureza do dado e da obrigação aplicável.</p>
      <p>
        Enquanto houver obrigação de conservação, os dados permanecerão armazenados de forma restrita e serão utilizados
        exclusivamente para a finalidade que justifique sua manutenção.
      </p>
      <p>
        Quando o prazo aplicável terminar e não existir outra hipótese legal que permita a conservação, os dados serão
        eliminados ou anonimizados.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">Cópias de segurança</h2>
      <p>
        Dados excluídos poderão permanecer temporariamente em cópias de segurança realizadas antes da solicitação de
        exclusão.
      </p>
      <p>
        Essas cópias não serão utilizadas para reativar a conta ou para continuar o tratamento dos dados para as
        finalidades originais. Elas serão eliminadas ou sobrescritas conforme o ciclo de retenção e os procedimentos de
        segurança aplicáveis ao {BRAND_NAME}.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">Base legal</h2>
      <p>
        O tratamento e a conservação de dados pessoais pelo {BRAND_NAME} observam a{" "}
        <strong className="text-landing-ink">
          Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (LGPD)
        </strong>{" "}
        e demais normas aplicáveis.
      </p>
      <p>
        A eliminação dos dados poderá não ocorrer quando sua conservação for necessária nas hipóteses previstas no art.
        16 da LGPD, incluindo o cumprimento de obrigação legal ou regulatória e o exercício regular de direitos.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">Dúvidas</h2>
      <p>
        Em caso de dúvidas sobre a exclusão da conta ou sobre a conservação de dados pessoais, entre em contato:
      </p>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`} className={LANDING_PROSE_LINK_CLASS}>
          {CONTACT_EMAIL}
        </a>
      </p>
    </section>
  </LegalPageLayout>
);

export default ExclusaoContaPage;
