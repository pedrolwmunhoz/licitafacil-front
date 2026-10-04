import { Link } from "react-router-dom";
import { LegalPageLayout } from "@/components/landing/LegalPageLayout";
import FinalCTASection from "@/components/landing/FinalCTASection";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import { BRAND_NAME, CONTACT_EMAIL, SITE_ORIGIN, LANDING_PROSE_LINK_CLASS } from "@/content/landing-site";
import { jsonLd } from "@/content/jsonld/termos";

const TermosPage = () => (
  <LegalPageLayout
    seo={PUBLIC_PAGE_SEO.termos}
    jsonLd={jsonLd}
    title="Termos de Uso"
    updatedAt="25 de setembro de 2026"
    afterContent={<FinalCTASection />}
  >
    <section className="space-y-4">
      <p>
        Estes Termos de Uso estabelecem as condições aplicáveis à contratação e utilização do{" "}
        <strong className="text-landing-ink">{BRAND_NAME}</strong>, sistema de ponto eletrônico online para registro
        e gestão da jornada de trabalho.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">1. Aceite</h2>
      <p>
        Estes Termos regulam o acesso e a utilização do {BRAND_NAME}, disponível em {SITE_ORIGIN}.
      </p>
      <p>
        Ao contratar o serviço, criar uma conta, acessar a plataforma pelo navegador, utilizar o aplicativo ou utilizar
        qualquer funcionalidade disponibilizada pelo {BRAND_NAME}, a empresa contratante e os usuários autorizados por
        ela declaram que leram, compreenderam e concordam com estes Termos de Uso e com a{" "}
        <Link to="/privacidade" className={LANDING_PROSE_LINK_CLASS}>
          Política de Privacidade
        </Link>
        .
      </p>
      <p>A contratação e utilização do serviço pressupõem a aceitação integral destas condições.</p>
      <p>
        Caso a empresa ou o usuário não concorde com qualquer disposição destes Termos, deverá interromper a utilização
        do serviço.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">2. O que é o serviço</h2>
      <p>
        O {BRAND_NAME} é um sistema de ponto eletrônico online destinado ao registro e à gestão da jornada de
        trabalho.
      </p>
      <p>
        A empresa contratante acessa os recursos administrativos por meio da plataforma web, enquanto os colaboradores
        podem realizar registros de ponto pelo aplicativo ou pelos meios disponibilizados pelo {BRAND_NAME}, conforme
        as configurações estabelecidas pela própria empresa.
      </p>
      <p>Entre as funcionalidades disponibilizadas pelo serviço podem estar:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>registro de entrada, saída e intervalos;</li>
        <li>consulta e acompanhamento do espelho de ponto;</li>
        <li>gestão de jornadas e escalas;</li>
        <li>banco de horas;</li>
        <li>solicitações e ajustes de registros;</li>
        <li>justificativas de ocorrências;</li>
        <li>geolocalização, quando habilitada;</li>
        <li>relatórios e consultas;</li>
        <li>gerenciamento de colaboradores;</li>
        <li>recursos administrativos relacionados à gestão da jornada;</li>
        <li>demais funcionalidades disponibilizadas pelo {BRAND_NAME}.</li>
      </ul>
      <p>
        As funcionalidades disponíveis e os limites de utilização são definidos de acordo com o plano contratado pela
        empresa.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">3. Cadastro e conta</h2>
      <p>
        Para utilizar determinados recursos do {BRAND_NAME}, a empresa deverá realizar o cadastro das informações
        solicitadas no processo de contratação.
      </p>
      <p>
        A empresa contratante declara que as informações fornecidas são verdadeiras, completas e atualizadas,
        comprometendo-se a mantê-las corretas durante a utilização do serviço.
      </p>
      <p>
        A empresa é responsável por manter atualizados seus dados cadastrais, informações de contato, dados de cobrança
        e demais informações necessárias à administração da conta.
      </p>
      <p>
        As credenciais de acesso são de uso individual e não devem ser compartilhadas com pessoas não autorizadas.
      </p>
      <p>
        A empresa é responsável por definir os usuários que poderão acessar sua conta, atribuir permissões e administrar
        os acessos internos à plataforma.
      </p>
      <p>
        Caso identifique acesso não autorizado, perda de credenciais ou qualquer situação que possa comprometer a
        segurança da conta, a empresa deverá comunicar o {BRAND_NAME} e adotar as medidas necessárias para impedir a
        continuidade do acesso indevido.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">4. Responsabilidades da empresa contratante</h2>
      <p>
        A empresa contratante é responsável pela utilização do {BRAND_NAME} em sua organização e pelas informações
        inseridas na plataforma.
      </p>
      <p>Compete à empresa, entre outras responsabilidades:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>manter seus dados cadastrais atualizados;</li>
        <li>cadastrar corretamente seus colaboradores;</li>
        <li>definir jornadas, escalas, horários, tolerâncias e demais parâmetros utilizados pelo sistema;</li>
        <li>administrar usuários e permissões de acesso;</li>
        <li>orientar seus colaboradores quanto à utilização do sistema;</li>
        <li>informar seus colaboradores sobre as funcionalidades utilizadas e os respectivos tratamentos de dados;</li>
        <li>garantir que os dados inseridos na plataforma sejam tratados de acordo com a legislação aplicável;</li>
        <li>
          verificar os registros e informações utilizados para fins administrativos, trabalhistas e de folha de
          pagamento;
        </li>
        <li>manter sob sua responsabilidade as decisões relacionadas à gestão de seus colaboradores.</li>
      </ul>
      <p>
        Quando houver utilização de geolocalização ou outras funcionalidades que envolvam tratamento específico de dados
        pessoais, cabe à empresa avaliar sua utilização e cumprir as obrigações legais aplicáveis.
      </p>
      <p>
        O {BRAND_NAME} é uma ferramenta tecnológica destinada a auxiliar a empresa na gestão da jornada. A
        responsabilidade pelo cumprimento das obrigações trabalhistas, previdenciárias, fiscais, administrativas e de
        proteção de dados da empresa permanece com a própria empresa contratante e seus respectivos responsáveis e
        assessores.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">5. Registro de ponto e gestão da jornada</h2>
      <p>
        O {BRAND_NAME} disponibiliza recursos tecnológicos para registro, armazenamento, consulta e gestão das
        informações relacionadas à jornada de trabalho.
      </p>
      <p>
        A empresa contratante é responsável por configurar corretamente os parâmetros utilizados na plataforma,
        incluindo jornadas, escalas, intervalos, tolerâncias, colaboradores e demais regras aplicáveis à sua operação.
      </p>
      <p>
        Os registros realizados pelos colaboradores poderão ser utilizados pela empresa para acompanhamento e gestão da
        jornada, observadas as configurações e funcionalidades disponibilizadas pelo sistema.
      </p>
      <p>
        A existência de funcionalidades automáticas de cálculo, banco de horas, jornadas ou relatórios não substitui a
        responsabilidade da empresa de conferir as informações e assegurar que os parâmetros utilizados correspondam à
        realidade da relação de trabalho.
      </p>
      <p>
        O {BRAND_NAME} não presta serviços de consultoria jurídica, contábil ou trabalhista. Em caso de dúvida sobre a
        aplicação de determinada regra à relação de trabalho, a empresa deverá consultar profissional habilitado.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">6. Planos, preços e cobrança</h2>
      <p>
        Os planos, preços, limites de utilização e demais condições comerciais são apresentados na página de preços do{" "}
        {BRAND_NAME} e no processo de contratação.
      </p>
      <p>
        A contratação de um plano poderá envolver cobrança recorrente, de acordo com a modalidade escolhida pela
        empresa.
      </p>
      <p>
        Quando aplicável, o pagamento será processado por meio do provedor de pagamentos disponibilizado no momento da
        contratação.
      </p>
      <p>
        A empresa é responsável por fornecer informações corretas para cobrança e por manter um meio de pagamento válido
        durante a vigência da contratação.
      </p>
      <p>
        Alterações de plano, limites, valores ou condições comerciais poderão ocorrer, observadas as condições
        apresentadas no momento da contratação e as disposições legais aplicáveis.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">7. Cancelamento e encerramento da conta</h2>
      <p>
        A empresa poderá solicitar o cancelamento do serviço por meio do canal de atendimento disponibilizado pelo{" "}
        {BRAND_NAME}:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={LANDING_PROSE_LINK_CLASS}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <p>
        O cancelamento interromperá a renovação das cobranças futuras, observadas as condições do plano contratado e
        eventuais períodos já pagos.
      </p>
      <p>
        Após o encerramento da conta, determinadas informações poderão permanecer armazenadas pelo período necessário ao
        cumprimento de obrigações legais e regulatórias, ao exercício regular de direitos, à segurança e à preservação
        de registros, conforme descrito na{" "}
        <Link to="/privacidade" className={LANDING_PROSE_LINK_CLASS}>
          Política de Privacidade
        </Link>
        .
      </p>
      <p>
        O encerramento da conta não elimina automaticamente informações cuja conservação seja permitida ou exigida pela
        legislação aplicável.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">8. Uso permitido</h2>
      <p>
        O {BRAND_NAME} deve ser utilizado exclusivamente para finalidades legítimas relacionadas à gestão da jornada e
        às atividades autorizadas pela empresa contratante.
      </p>
      <p>É proibido utilizar o serviço para:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>acessar ou tentar acessar contas, dados ou ambientes pertencentes a terceiros sem autorização;</li>
        <li>explorar vulnerabilidades ou falhas de segurança;</li>
        <li>interferir no funcionamento normal da plataforma;</li>
        <li>realizar atividades que possam comprometer a disponibilidade ou integridade do serviço;</li>
        <li>introduzir códigos maliciosos, vírus ou qualquer mecanismo destinado a prejudicar o sistema;</li>
        <li>copiar, reproduzir, modificar, distribuir ou comercializar o software sem autorização;</li>
        <li>
          realizar engenharia reversa, desmontagem ou tentativa de obtenção do código-fonte, salvo quando expressamente
          permitido pela legislação;
        </li>
        <li>utilizar o serviço para atividades ilícitas;</li>
        <li>inserir conteúdo que viole direitos de terceiros ou a legislação aplicável;</li>
        <li>
          utilizar mecanismos automatizados de acesso de forma abusiva ou incompatível com a finalidade do serviço.
        </li>
      </ul>
      <p>
        O descumprimento destas regras poderá resultar na suspensão ou encerramento do acesso, conforme a gravidade da
        situação, sem prejuízo das demais medidas administrativas ou judiciais cabíveis.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">9. Disponibilidade e funcionamento</h2>
      <p>
        O {BRAND_NAME} busca manter a plataforma disponível e operacional de forma contínua, mas determinados serviços
        poderão sofrer interrupções temporárias.
      </p>
      <p>A indisponibilidade poderá ocorrer, entre outras situações, em razão de:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>manutenção programada;</li>
        <li>atualizações do sistema;</li>
        <li>correções de segurança;</li>
        <li>falhas de infraestrutura;</li>
        <li>problemas de conectividade;</li>
        <li>indisponibilidade de serviços de terceiros;</li>
        <li>eventos fora do controle razoável do {BRAND_NAME}.</li>
      </ul>
      <p>
        Sempre que possível, manutenções programadas que possam causar indisponibilidade relevante serão realizadas de
        forma a reduzir seus impactos.
      </p>
      <p>
        O {BRAND_NAME} não garante que o serviço permanecerá disponível de forma ininterrupta ou livre de erros em
        todas as situações.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">10. Dados e propriedade das informações</h2>
      <p>
        Os dados de colaboradores, registros de ponto, cadastros, configurações e demais informações inseridas pela
        empresa contratante no sistema permanecem sob responsabilidade da empresa, respeitados os direitos e obrigações
        previstos na legislação aplicável.
      </p>
      <p>
        A empresa concede ao {BRAND_NAME} autorização para armazenar, processar e utilizar essas informações na medida
        necessária à prestação, manutenção, segurança e evolução dos serviços contratados.
      </p>
      <p>
        O tratamento de dados pessoais realizado pelo {BRAND_NAME} é descrito na{" "}
        <Link to="/privacidade" className={LANDING_PROSE_LINK_CLASS}>
          Política de Privacidade
        </Link>
        .
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">11. Propriedade intelectual</h2>
      <p>
        O {BRAND_NAME}, sua marca, identidade visual, software, código-fonte, interface, arquitetura, documentação,
        textos, elementos gráficos, funcionalidades e demais componentes disponibilizados pela plataforma são protegidos
        pela legislação aplicável e pertencem ao {BRAND_NAME} ou a terceiros que tenham licenciado seus respectivos
        direitos.
      </p>
      <p>
        A contratação do serviço não transfere à empresa qualquer direito de propriedade sobre o software ou sobre seus
        componentes.
      </p>
      <p>
        Durante a vigência da contratação e enquanto a conta estiver regular, a empresa recebe uma licença limitada, não
        exclusiva, intransferível e revogável para utilização do {BRAND_NAME} de acordo com estes Termos e com o plano
        contratado.
      </p>
      <p>
        Nenhuma disposição destes Termos concede à empresa o direito de copiar, distribuir, comercializar, modificar,
        sublicenciar ou explorar comercialmente o software, sua estrutura ou seus componentes, salvo mediante
        autorização expressa ou quando permitido pela legislação.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">12. Limitação de responsabilidade</h2>
      <p>
        O {BRAND_NAME} fornece uma ferramenta tecnológica para auxiliar a empresa na gestão da jornada de trabalho.
      </p>
      <p>
        Na medida permitida pela legislação aplicável, o {BRAND_NAME} não será responsável por decisões administrativas,
        trabalhistas, contábeis ou jurídicas tomadas pela empresa com base nas informações disponibilizadas pelo
        sistema.
      </p>
      <p>
        A empresa permanece responsável pela conferência dos registros, configurações, jornadas, escalas, parâmetros,
        relatórios e demais informações utilizadas em suas atividades.
      </p>
      <p>O {BRAND_NAME} também não será responsável por prejuízos decorrentes de:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>informações incorretas inseridas pela empresa ou por seus usuários;</li>
        <li>utilização inadequada do sistema;</li>
        <li>compartilhamento indevido de credenciais;</li>
        <li>falhas de equipamentos ou dispositivos utilizados pelos usuários;</li>
        <li>problemas de conexão ou infraestrutura de terceiros;</li>
        <li>indisponibilidade de serviços externos necessários ao funcionamento da plataforma;</li>
        <li>eventos fora do controle razoável do {BRAND_NAME}.</li>
      </ul>
      <p>
        Na medida em que a legislação permitir e quando houver responsabilidade comprovada do {BRAND_NAME}, eventual
        indenização ficará limitada ao valor efetivamente pago pela empresa ao {BRAND_NAME} nos 12 meses anteriores ao
        evento que originou a reclamação, ressalvadas as hipóteses em que a limitação seja vedada pela legislação
        aplicável.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">13. Suporte</h2>
      <p>O {BRAND_NAME} disponibiliza suporte por meio dos canais divulgados na plataforma e no site.</p>
      <p>
        O principal canal de atendimento é:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={LANDING_PROSE_LINK_CLASS}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <p>
        O suporte poderá auxiliar em questões relacionadas à utilização das funcionalidades, configuração da
        plataforma, acesso à conta e problemas técnicos.
      </p>
      <p>O suporte não substitui orientação jurídica, trabalhista, contábil ou fiscal.</p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">14. Alterações do serviço e dos Termos</h2>
      <p>
        O {BRAND_NAME} poderá realizar melhorias, correções, atualizações e alterações nas funcionalidades da
        plataforma para aprimorar sua segurança, desempenho e funcionamento.
      </p>
      <p>
        Determinadas funcionalidades poderão ser modificadas, substituídas ou descontinuadas, especialmente quando
        houver necessidade técnica, de segurança ou alteração relevante na estrutura do serviço.
      </p>
      <p>
        Estes Termos também poderão ser atualizados para refletir alterações na legislação, no serviço ou nas condições
        de utilização.
      </p>
      <p>A versão vigente será identificada pela data de atualização indicada no início deste documento.</p>
      <p>
        Quando uma alteração relevante exigir comunicação específica, o {BRAND_NAME} poderá informar os usuários por
        meio dos canais de contato disponíveis.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">15. Suspensão ou encerramento do acesso</h2>
      <p>O {BRAND_NAME} poderá suspender ou restringir temporariamente o acesso à conta quando necessário para:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>proteger a segurança da plataforma;</li>
        <li>investigar atividades potencialmente fraudulentas ou abusivas;</li>
        <li>cumprir obrigação legal ou determinação de autoridade competente;</li>
        <li>impedir utilização que viole estes Termos;</li>
        <li>solucionar situações que possam comprometer outros usuários ou a infraestrutura do serviço.</li>
      </ul>
      <p>
        Quando a situação permitir, o {BRAND_NAME} buscará comunicar a empresa antes ou após a suspensão, conforme a
        natureza e urgência do caso.
      </p>
      <p>
        A suspensão ou encerramento do acesso não elimina obrigações que, por sua natureza, devam permanecer após o
        término da relação contratual.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">16. Lei aplicável e foro</h2>
      <p>Estes Termos são regidos pelas leis da República Federativa do Brasil.</p>
      <p>
        Eventuais controvérsias relacionadas à utilização do {BRAND_NAME} serão, sempre que possível, solucionadas
        inicialmente por meio dos canais de atendimento disponibilizados pelo {BRAND_NAME}.
      </p>
      <p>
        Na ausência de solução consensual, fica eleito o foro competente de acordo com a legislação aplicável, sem
        prejuízo de eventual foro que seja assegurado à parte por norma de natureza obrigatória.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-landing-ink">17. Contato</h2>
      <p>
        Dúvidas, solicitações ou informações relacionadas a estes Termos poderão ser encaminhadas para:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={LANDING_PROSE_LINK_CLASS}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </section>
  </LegalPageLayout>
);

export default TermosPage;
