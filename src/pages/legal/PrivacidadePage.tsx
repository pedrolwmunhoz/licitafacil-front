import { Link } from "react-router-dom";
import { LegalPageLayout } from "@/components/landing/LegalPageLayout";
import FinalCTASection from "@/components/landing/FinalCTASection";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import { BRAND_NAME, CONTACT_EMAIL, SITE_ORIGIN, LANDING_PROSE_LINK_CLASS } from "@/content/landing-site";
import { jsonLd } from "@/content/jsonld/privacidade";

const PrivacidadePage = () => (
  <LegalPageLayout
    seo={PUBLIC_PAGE_SEO.privacidade}
    jsonLd={jsonLd}
    title="Política de Privacidade"
    updatedAt="25 de setembro de 2026"
    afterContent={<FinalCTASection />}
  >
    <section className="space-y-4">
      <p>
        Esta Política de Privacidade explica como o <strong className="text-landing-ink">{BRAND_NAME}</strong>{" "}
        realiza o tratamento de dados pessoais relacionados à utilização de sua plataforma de gestão de jornada de
        trabalho, disponível em {SITE_ORIGIN}.
      </p>
      <p>
        O documento estabelece as principais informações sobre os dados tratados, suas finalidades, as responsabilidades
        das partes envolvidas e os direitos dos titulares, em conformidade com a Lei nº 13.709/2018 — Lei Geral de
        Proteção de Dados Pessoais (LGPD).
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">1. Quem somos</h2>
      <p>
        O {BRAND_NAME} é um sistema de ponto eletrônico online para registro e gestão da jornada de trabalho de
        colaboradores.
      </p>
      <p>
        Esta Política aplica-se aos dados pessoais tratados no contexto da utilização do site, da plataforma web, do
        aplicativo e dos demais serviços disponibilizados pelo {BRAND_NAME}.
      </p>
      <p>
        No contexto da prestação do serviço, a empresa contratante é, em regra, a responsável pelas decisões
        relacionadas ao tratamento dos dados de seus colaboradores, atuando como controladora. O {BRAND_NAME} realiza
        o tratamento desses dados em nome da empresa contratante, na condição de operadora, conforme as instruções e
        finalidades estabelecidas para a prestação do serviço.
      </p>
      <p>
        Em determinadas situações, especialmente em relação aos dados necessários à operação, segurança, suporte e
        administração da própria plataforma, o {BRAND_NAME} poderá atuar como controlador, observada a finalidade
        específica do tratamento.
      </p>
      <p>
        Para assuntos relacionados à privacidade, proteção de dados e exercício de direitos, entre em contato pelo
        e-mail:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={LANDING_PROSE_LINK_CLASS}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">2. Dados pessoais tratados</h2>
      <p>
        Os dados tratados pelo {BRAND_NAME} variam de acordo com a forma de utilização da plataforma e com as
        funcionalidades contratadas ou habilitadas pela empresa.
      </p>

      <h3 className="font-display text-lg font-semibold text-landing-ink pt-2">2.1. Dados da empresa contratante</h3>
      <p>Durante o cadastro, contratação e administração da conta, poderão ser tratados dados como:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>razão social;</li>
        <li>nome fantasia, quando aplicável;</li>
        <li>CNPJ;</li>
        <li>endereço completo, incluindo logradouro, número, complemento, bairro, município, estado e CEP;</li>
        <li>nome dos responsáveis pela conta;</li>
        <li>CPF dos responsáveis, quando necessário;</li>
        <li>cargo ou função dos responsáveis;</li>
        <li>endereço de e-mail;</li>
        <li>número de telefone e celular;</li>
        <li>informações relacionadas à contratação e ao plano utilizado;</li>
        <li>informações necessárias ao faturamento e à cobrança.</li>
      </ul>

      <h3 className="font-display text-lg font-semibold text-landing-ink pt-2">2.2. Dados dos colaboradores</h3>
      <p>
        Na utilização do sistema para gestão da jornada, a empresa contratante poderá inserir e administrar dados de
        seus colaboradores, incluindo:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>nome completo;</li>
        <li>CPF;</li>
        <li>e-mail;</li>
        <li>número de telefone ou celular;</li>
        <li>endereço;</li>
        <li>matrícula ou identificador interno;</li>
        <li>cargo ou função;</li>
        <li>departamento, setor ou unidade;</li>
        <li>informações relacionadas à jornada e à escala de trabalho;</li>
        <li>registros de entrada, saída e intervalos;</li>
        <li>ajustes e justificativas de registros;</li>
        <li>informações relacionadas a férias, ausências e ocorrências;</li>
        <li>demais informações inseridas pela empresa nas funcionalidades disponibilizadas pelo sistema.</li>
      </ul>
      <p>
        A definição de quais dados dos colaboradores serão inseridos e utilizados no sistema é realizada pela empresa
        contratante, de acordo com suas necessidades e obrigações.
      </p>

      <h3 className="font-display text-lg font-semibold text-landing-ink pt-2">2.3. Dados de localização</h3>
      <p>
        Quando a funcionalidade de geolocalização estiver habilitada pela empresa contratante, o {BRAND_NAME} poderá
        tratar informações de localização associadas ao registro de ponto, como latitude e longitude no momento da
        marcação.
      </p>
      <p>
        A utilização dessa funcionalidade depende das configurações adotadas pela empresa e das permissões
        disponibilizadas no dispositivo utilizado para o registro.
      </p>

      <h3 className="font-display text-lg font-semibold text-landing-ink pt-2">2.4. Dados técnicos e de utilização</h3>
      <p>
        Para disponibilizar, proteger e aprimorar a plataforma, poderão ser registrados dados relacionados ao acesso e
        à utilização do serviço, incluindo:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>endereço IP;</li>
        <li>data e hora das requisições;</li>
        <li>navegador e sistema operacional;</li>
        <li>tipo e modelo do dispositivo;</li>
        <li>versão do aplicativo, quando aplicável;</li>
        <li>identificadores técnicos do dispositivo, quando necessários ao funcionamento ou à segurança;</li>
        <li>registros de acesso;</li>
        <li>eventos relacionados à utilização das funcionalidades;</li>
        <li>informações de erros e falhas;</li>
        <li>registros necessários à segurança e auditoria da plataforma.</li>
      </ul>

      <h3 className="font-display text-lg font-semibold text-landing-ink pt-2">2.5. Dados relacionados a pagamentos</h3>
      <p>
        Quando houver contratação de planos pagos, determinadas informações necessárias ao processamento da cobrança
        poderão ser encaminhadas ao respectivo provedor de pagamentos.
      </p>
      <p>
        Essas informações podem incluir dados de identificação do contratante, dados necessários à cobrança e
        informações relacionadas à transação.
      </p>
      <p>
        Os dados completos do cartão de pagamento não são armazenados diretamente pelo {BRAND_NAME} quando o
        processamento é realizado pelo provedor responsável.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">3. Finalidades e bases legais</h2>
      <p>
        Os dados pessoais são tratados de acordo com as finalidades relacionadas à prestação, administração, segurança
        e evolução dos serviços.
      </p>
      <p>Entre as principais finalidades estão:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong className="text-landing-ink">Prestação do serviço:</strong> disponibilizar o sistema de ponto
          eletrônico online, permitir o registro e gerenciamento da jornada de trabalho e executar as funcionalidades
          contratadas pela empresa.
        </li>
        <li>
          <strong className="text-landing-ink">Cumprimento de obrigações legais:</strong> possibilitar que a empresa
          contratante mantenha registros e informações necessários ao cumprimento de obrigações trabalhistas,
          previdenciárias, fiscais ou outras obrigações previstas na legislação aplicável.
        </li>
        <li>
          <strong className="text-landing-ink">Gestão da conta e relacionamento:</strong> realizar cadastro,
          autenticação, suporte, comunicações operacionais, atendimento de solicitações e administração da relação
          contratual.
        </li>
        <li>
          <strong className="text-landing-ink">Segurança e prevenção de irregularidades:</strong> proteger a
          plataforma, identificar acessos indevidos, prevenir fraudes, investigar incidentes e manter registros
          necessários à segurança e à auditoria.
        </li>
        <li>
          <strong className="text-landing-ink">Melhoria dos serviços:</strong> analisar informações de utilização,
          desempenho e funcionamento para identificar problemas, aprimorar funcionalidades e desenvolver melhorias na
          plataforma.
        </li>
        <li>
          <strong className="text-landing-ink">Exercício regular de direitos:</strong> manter registros e informações
          necessários para o exercício regular de direitos em processos judiciais, administrativos ou arbitrais.
        </li>
      </ul>
      <p>
        As bases legais aplicáveis dependem da natureza do tratamento realizado e podem incluir, conforme o caso, a
        execução de contrato, o cumprimento de obrigação legal ou regulatória, o exercício regular de direitos e o
        legítimo interesse, observados os requisitos previstos na LGPD.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">4. Compartilhamento de dados</h2>
      <p>O {BRAND_NAME} não comercializa dados pessoais.</p>
      <p>
        O compartilhamento de dados poderá ocorrer quando necessário para a prestação dos serviços, cumprimento de
        obrigações legais, segurança da plataforma ou execução de atividades relacionadas ao funcionamento do sistema.
      </p>
      <p>Podemos utilizar prestadores especializados em atividades como:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>infraestrutura e hospedagem em nuvem;</li>
        <li>processamento de pagamentos;</li>
        <li>envio de e-mails e comunicações operacionais;</li>
        <li>serviços de suporte e atendimento;</li>
        <li>monitoramento e segurança da infraestrutura;</li>
        <li>outros serviços tecnológicos necessários ao funcionamento da plataforma.</li>
      </ul>
      <p>
        Quando aplicável, esses fornecedores terão acesso somente às informações necessárias para a execução de suas
        respectivas atividades e estarão sujeitos a obrigações de confidencialidade e proteção de dados compatíveis com
        os serviços prestados.
      </p>
      <p>
        No ambiente contratado pela empresa, os dados de colaboradores poderão ser acessados por administradores,
        gestores e outros usuários autorizados pela própria empresa, de acordo com os níveis de acesso definidos por
        ela.
      </p>
      <p>
        A empresa contratante também poderá disponibilizar informações a terceiros por ela autorizados, como escritórios
        de contabilidade, consultorias ou profissionais responsáveis por atividades relacionadas à administração de
        pessoal.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">5. Retenção e segurança</h2>
      <p>
        Os dados pessoais são armazenados pelo período necessário à prestação dos serviços e à manutenção da conta,
        observados os prazos estabelecidos pela legislação aplicável.
      </p>
      <p>
        Após o encerramento da relação contratual, determinadas informações poderão permanecer armazenadas pelo período
        necessário ao cumprimento de obrigações legais e regulatórias, ao exercício regular de direitos, à prevenção de
        fraudes e à preservação de registros relacionados à utilização da plataforma.
      </p>
      <p>
        O {BRAND_NAME} adota medidas técnicas e administrativas destinadas a proteger os dados pessoais contra acessos
        não autorizados, perda, alteração, divulgação ou destruição indevida.
      </p>
      <p>
        Entre essas medidas estão a utilização de conexões seguras por HTTPS, criptografia de dados pessoais sensíveis
        armazenados na plataforma, mecanismos de controle de acesso, restrição de privilégios conforme as funções
        desempenhadas e registros de eventos relevantes para fins de segurança e auditoria.
      </p>
      <p>
        Os dados também poderão ser submetidos a rotinas de backup e recuperação necessárias à continuidade e à
        segurança operacional da plataforma. Esses procedimentos seguem critérios de retenção compatíveis com sua
        finalidade.
      </p>
      <p>
        Nenhum sistema é capaz de garantir segurança absoluta. Por isso, o {BRAND_NAME} mantém medidas de proteção
        compatíveis com a natureza dos dados tratados e busca aprimorá-las continuamente.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">6. Direitos dos titulares</h2>
      <p>A LGPD assegura aos titulares de dados pessoais determinados direitos em relação ao tratamento de suas informações.</p>
      <p>Entre eles estão, quando aplicáveis:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>confirmação da existência de tratamento;</li>
        <li>acesso aos dados pessoais;</li>
        <li>correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados tratados em desconformidade com a legislação;</li>
        <li>portabilidade, observados os requisitos e regulamentações aplicáveis;</li>
        <li>informação sobre o compartilhamento de dados;</li>
        <li>revogação do consentimento, quando o tratamento estiver baseado nessa hipótese;</li>
        <li>oposição ao tratamento realizado em determinadas situações previstas na legislação.</li>
      </ul>
      <p>
        No contexto da gestão de jornada, os colaboradores devem, em regra, direcionar suas solicitações à empresa
        contratante, que é responsável pelas decisões relacionadas ao tratamento dos dados de seus colaboradores.
      </p>
      <p>
        Quando necessário, o {BRAND_NAME} poderá auxiliar a empresa contratante no atendimento dessas solicitações
        dentro dos limites de sua atuação como operador.
      </p>
      <p>
        Solicitações relacionadas aos dados tratados diretamente pelo {BRAND_NAME} poderão ser encaminhadas para:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={LANDING_PROSE_LINK_CLASS}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <p>As solicitações serão analisadas e respondidas nos prazos e condições previstos na legislação aplicável.</p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">7. Cookies e tecnologias semelhantes</h2>
      <p>
        O {BRAND_NAME} utiliza cookies e tecnologias semelhantes no site e nas áreas autenticadas da plataforma.
      </p>
      <p>
        Cookies são pequenos arquivos ou identificadores armazenados no navegador ou dispositivo utilizado para acessar
        o serviço. Eles podem ser utilizados para manter sessões, preservar determinadas preferências, contribuir para a
        segurança e compreender a utilização do site e da plataforma.
      </p>
      <p>Os cookies utilizados pelo {BRAND_NAME} podem ser classificados conforme sua finalidade.</p>

      <h3 className="font-display text-lg font-semibold text-landing-ink pt-2">Cookies essenciais</h3>
      <p>
        São necessários para o funcionamento adequado do site e da plataforma, incluindo autenticação, manutenção de
        sessão, segurança e acesso às áreas restritas.
      </p>
      <p>A desativação desses cookies poderá impedir ou prejudicar o funcionamento de determinadas funcionalidades.</p>

      <h3 className="font-display text-lg font-semibold text-landing-ink pt-2">Cookies de preferência</h3>
      <p>
        Podem ser utilizados para preservar determinadas configurações e preferências técnicas do usuário, quando
        aplicável.
      </p>

      <h3 className="font-display text-lg font-semibold text-landing-ink pt-2">Cookies de audiência e desempenho</h3>
      <p>
        Podem ser utilizados para compreender como o site e a plataforma são utilizados, incluindo informações sobre
        acessos, páginas ou telas visualizadas, origem do tráfego, dispositivos e desempenho técnico.
      </p>
      <p>Essas informações são utilizadas para análise, manutenção e melhoria dos serviços.</p>
      <p>O usuário pode consultar as configurações do navegador utilizado para bloquear, excluir ou limitar cookies.</p>
      <p>
        A desativação de cookies essenciais poderá comprometer o funcionamento da plataforma. A desativação de cookies
        de audiência e desempenho não impede, em regra, o acesso às páginas públicas do {BRAND_NAME}.
      </p>
      <p>
        Os períodos de armazenamento dos cookies podem variar de acordo com sua finalidade e natureza, podendo
        permanecer durante a sessão ou por período determinado.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">8. Dados e métricas de utilização</h2>
      <p>
        O {BRAND_NAME} poderá coletar informações relacionadas à utilização do site, da plataforma web e do aplicativo
        para fins de operação, segurança, análise técnica e melhoria dos serviços.
      </p>
      <p>Essas informações podem incluir:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>páginas e telas acessadas;</li>
        <li>sequência de navegação;</li>
        <li>tempo aproximado de utilização;</li>
        <li>origem do acesso;</li>
        <li>endereço IP;</li>
        <li>data e horário das requisições;</li>
        <li>tipo e modelo de dispositivo;</li>
        <li>sistema operacional;</li>
        <li>navegador ou versão do aplicativo;</li>
        <li>eventos relacionados à utilização das funcionalidades;</li>
        <li>erros, falhas e informações de desempenho;</li>
        <li>dados estatísticos e agregados sobre utilização e audiência.</li>
      </ul>
      <p>
        A utilização dessas informações permite identificar problemas técnicos, avaliar o desempenho da plataforma,
        compreender a utilização das funcionalidades e direcionar melhorias no produto.
      </p>
      <p>
        Sempre que possível e adequado à finalidade, as informações são analisadas de forma agregada ou anonimizada.
        Quando os dados permitirem identificar uma pessoa, o tratamento continuará sujeito às disposições da LGPD e às
        finalidades previstas nesta Política.
      </p>
      <p>
        Os dados de utilização não são comercializados ou utilizados para venda de informações pessoais a terceiros.
      </p>
      <p>
        As informações serão mantidas pelo período necessário às finalidades para as quais foram coletadas, aos
        requisitos de segurança e às obrigações legais aplicáveis, podendo posteriormente ser eliminadas ou
        anonimizadas quando não houver fundamento para sua manutenção.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">9. Alterações desta Política</h2>
      <p>
        Esta Política de Privacidade poderá ser atualizada periodicamente para refletir alterações na legislação, nos
        serviços oferecidos pelo {BRAND_NAME} ou nas práticas de tratamento de dados.
      </p>
      <p>
        A versão vigente será identificada pela data de atualização indicada no início deste documento.
      </p>
      <p>
        Quando uma alteração exigir comunicação específica ou consentimento nos termos da legislação aplicável, o{" "}
        {BRAND_NAME} adotará as medidas necessárias para essa finalidade.
      </p>
      <p>
        O uso continuado dos serviços após a publicação de alterações que não dependam de novo consentimento representa
        ciência da versão atualizada da Política, sem prejuízo dos direitos assegurados pela legislação.
      </p>
      <p>
        Para informações sobre as condições de utilização da plataforma, consulte também os{" "}
        <Link to="/termos" className={LANDING_PROSE_LINK_CLASS}>
          Termos de Uso
        </Link>
        .
      </p>
      <p>
        Em caso de dúvidas sobre privacidade ou tratamento de dados pessoais:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={LANDING_PROSE_LINK_CLASS}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </section>
  </LegalPageLayout>
);

export default PrivacidadePage;
