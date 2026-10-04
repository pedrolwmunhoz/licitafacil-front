# App de ponto eletrônico: como funciona e como usar

Um **app de ponto eletrônico** permite que funcionários registrem a jornada de trabalho utilizando um celular ou outro dispositivo compatível, sem depender de um relógio de ponto instalado fisicamente na empresa.

A marcação pode ser feita pelo aplicativo a partir de um celular, enquanto os registros ficam armazenados no sistema para posterior consulta e tratamento da jornada.

Esse modelo pode ser utilizado por empresas com funcionários no escritório, equipes externas, trabalhadores em diferentes locais e operações que precisam de uma forma mais flexível de registrar a jornada.

Além de registrar entrada, saída e intervalos, um aplicativo de ponto pode oferecer recursos como comprovante da marcação, consulta do espelho de ponto, geolocalização, funcionamento offline e integração com outros sistemas.

## O que é um app de ponto eletrônico?

Um app de ponto eletrônico é um aplicativo utilizado para realizar marcações de jornada por meio de um dispositivo eletrônico.

Em vez de o funcionário registrar o ponto em um relógio físico, a marcação pode ser realizada pelo celular ou outro dispositivo compatível com o sistema.

Uma marcação pode registrar informações como:

* identificação do funcionário;
* data;
* horário;
* tipo da marcação;
* identificador do dispositivo ou coletor;
* informações necessárias para o registro eletrônico.

A estrutura exata depende do sistema utilizado.

O aplicativo funciona como uma interface para realizar a marcação. Por trás dele existe uma estrutura responsável por receber, armazenar e tratar os registros de jornada.

## Como funciona o ponto eletrônico pelo celular?

O funcionamento normalmente começa com o funcionário acessando o aplicativo utilizando sua conta.

Ao realizar a marcação, o sistema identifica o trabalhador e registra a data e o horário correspondentes.

Dependendo da solução, outras informações podem ser associadas à marcação, como localização ou identificação do dispositivo.

Depois do registro, a marcação é armazenada no sistema para que possa ser utilizada no controle da jornada.

Um exemplo simples seria:

**08:01 — Entrada**

**12:04 — Início do intervalo**

**13:02 — Retorno**

**18:05 — Saída**

Esses registros posteriormente podem ser utilizados para calcular a duração da jornada, horas extras, atrasos, intervalos e outras informações relacionadas ao controle de ponto.

## App de ponto eletrônico é permitido?

Sim. A regulamentação brasileira prevê sistemas de registro eletrônico de ponto que podem utilizar software e diferentes tipos de coletores de marcação.

A Portaria nº 671/2021 classifica os registradores eletrônicos em **REP-C, REP-A e REP-P**. O Ministério do Trabalho e Emprego explica que o REP-P foi criado para possibilitar o uso de novas tecnologias, incluindo a **marcação de ponto mobile**.

No REP-P, o registrador é um programa executado em servidor dedicado ou ambiente de nuvem, utilizado para registro da jornada.

A própria regulamentação prevê diferentes tipos de coletores para as marcações realizadas pelo REP-P, incluindo aplicativo mobile, navegador e aplicativo desktop.

Portanto, um aplicativo pode fazer parte de uma solução de registro eletrônico de ponto.

## App de ponto eletrônico e REP-P

O **REP-P** significa Registrador Eletrônico de Ponto via Programa.

Diferentemente de um relógio de ponto físico, o REP-P é baseado em software.

A Portaria 671 estabelece que o REP-P deve ser executado em servidor dedicado ou ambiente de nuvem e utilizado exclusivamente para registro de jornada e controles relacionados à entrada e saída dos empregados.

Para o REP-P, a regulamentação também estabelece requisitos técnicos específicos.

Entre eles estão:

* identificação da organização e do trabalhador;
* sincronização do relógio com a Hora Legal Brasileira;
* registro por coletor conectado ao REP-P;
* possibilidade excepcional de marcação offline;
* armazenamento dos registros em estrutura própria;
* mecanismos de segurança e integridade dos dados.

Por isso, simplesmente criar um aplicativo que tenha um botão de "bater ponto" não significa, por si só, que qualquer aplicativo esteja automaticamente adequado como REP-P.

A solução utilizada pela empresa precisa atender aos requisitos aplicáveis ao sistema de registro eletrônico adotado.

## App de ponto precisa ter internet?

Não necessariamente.

Um sistema baseado em REP-P pode permitir marcações realizadas pelo coletor mesmo quando ele estiver temporariamente offline.

A Portaria 671 prevê que as marcações do REP-P sejam realizadas por coletor online, mas admite excepcionalmente o funcionamento offline. Quando isso ocorre, os registros devem ser enviados posteriormente quando o coletor voltar a ficar online.

Na prática, isso permite que um funcionário consiga registrar o ponto mesmo em situações como:

* falta temporária de internet;
* áreas com sinal instável;
* locais de trabalho afastados;
* obras;
* operações externas.

O comportamento exato depende da implementação do sistema.

## Como funciona o ponto offline?

No modo offline, o aplicativo pode registrar a marcação no próprio dispositivo e armazená-la temporariamente.

Quando a conexão é restabelecida, o registro é enviado ao sistema responsável pelo armazenamento da jornada.

Por exemplo:

**08:00 — funcionário registra o ponto**

**08:00 — celular está sem conexão**

**08:15 — conexão é restabelecida**

**08:15 — aplicativo sincroniza a marcação**

O objetivo é evitar que uma falha temporária de conexão impeça o registro da jornada.

A solução, porém, precisa implementar esse mecanismo de acordo com os requisitos técnicos aplicáveis ao REP-P.

## App de ponto pode funcionar no navegador?

Sim.

O modelo de ponto eletrônico via programa não está limitado a um aplicativo instalado no celular.

A documentação oficial do Ministério do Trabalho e Emprego prevê, entre os identificadores de coletor do REP-P, **aplicativo mobile, browser, aplicativo desktop e dispositivo eletrônico**.

Isso permite que uma solução de ponto seja disponibilizada por diferentes interfaces.

Por exemplo:

**Celular:** aplicativo mobile.

**Computador:** navegador.

**Desktop:** aplicativo instalado.

A empresa pode utilizar uma ou mais dessas interfaces de acordo com sua operação.

## App de ponto eletrônico precisa de geolocalização?

Não necessariamente.

A geolocalização pode ser uma funcionalidade adicional de um aplicativo de ponto, mas não é sinônimo de registro eletrônico de jornada.

Um aplicativo pode registrar o horário sem armazenar a localização do funcionário.

Quando a geolocalização é utilizada, ela pode ser associada à marcação para fornecer uma informação adicional sobre o local em que o registro foi realizado.

Para entender especificamente como esse recurso funciona, veja a página sobre [geolocalização no ponto](/blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve).

## App de ponto eletrônico pode usar reconhecimento facial?

Pode haver sistemas que utilizem reconhecimento facial como mecanismo adicional de identificação.

Nesse caso, o funcionário pode realizar uma autenticação antes ou durante a marcação, dependendo da solução.

Mas reconhecimento facial não é sinônimo de aplicativo de ponto e não é necessário para que um sistema utilize marcação mobile.

São tecnologias diferentes que podem ser combinadas.

O uso de reconhecimento facial também envolve tratamento de dados pessoais e deve ser analisado de acordo com a legislação aplicável.

## O funcionário recebe comprovante ao bater o ponto?

Sim, os sistemas abrangidos pela regulamentação possuem requisitos relacionados ao comprovante de registro.

A Portaria 671 estabelece que o **REP-C e o REP-P devem emitir ou disponibilizar acesso ao comprovante de registro de ponto do trabalhador**. O comprovante deve conter informações como identificação do empregador, trabalhador, data e horário do registro e dados específicos do sistema utilizado.

Quando o comprovante é eletrônico, a norma prevê que ele seja disponibilizado ao trabalhador por meio de sistema eletrônico após cada marcação.

Isso permite que o funcionário tenha acesso ao registro realizado.

Para entender especificamente o documento gerado pelo sistema, veja também [comprovante de registro de ponto](/blog/comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras).

## O funcionário consegue consultar o espelho de ponto?

O aplicativo pode permitir que o funcionário consulte suas informações de jornada.

O programa de tratamento de registro de ponto deve gerar o **Espelho de Ponto Eletrônico**, que contém informações como jornada contratual, marcações efetuadas, marcações tratadas e duração das jornadas realizadas.

O trabalhador deve ter acesso às informações do espelho por meio de sistema informatizado.

Isso permite acompanhar a jornada registrada sem depender exclusivamente do departamento pessoal para consultar cada marcação.

## App de ponto registra horas extras?

O aplicativo registra as marcações utilizadas para apuração da jornada.

A partir desses registros, o sistema pode calcular informações relacionadas à jornada, como:

* horas trabalhadas;
* horas extras;
* atrasos;
* saídas antecipadas;
* intervalos;
* faltas;
* banco de horas.

O cálculo e o tratamento dessas informações dependem das regras configuradas no sistema e da situação trabalhista aplicável.

O aplicativo não deve simplesmente impedir uma marcação porque ela resultará em uma jornada superior ao horário previsto.

A regulamentação do registro eletrônico de ponto estabelece regras para que as marcações sejam registradas fielmente.

## O app pode impedir o funcionário de bater o ponto?

Um sistema de ponto deve ser projetado para registrar a jornada, e não para eliminar uma marcação porque ela não corresponde ao horário previamente esperado.

A Portaria 671 estabelece regras para preservar a finalidade do registro eletrônico de ponto e impedir mecanismos que desvirtuem as marcações.

Por isso, uma empresa não deve tratar o aplicativo simplesmente como uma ferramenta para bloquear registros fora do horário programado.

A existência de uma jornada contratual não significa que o sistema possa apagar ou impedir automaticamente uma marcação realizada pelo trabalhador.

## App de ponto pode ser usado por funcionários externos?

Sim.

Essa é uma das situações em que o ponto por aplicativo pode ser particularmente útil.

Em vez de o funcionário precisar retornar à empresa para realizar a marcação, ele pode utilizar o dispositivo disponibilizado pela solução no local em que estiver trabalhando.

Isso pode ser aplicado a:

* vendedores externos;
* técnicos;
* instaladores;
* profissionais de manutenção;
* equipes de obras;
* trabalhadores que atendem clientes;
* equipes de campo;
* profissionais que trabalham em diferentes endereços.

A geolocalização pode ser utilizada como informação adicional quando fizer sentido para a operação.

## App de ponto para home office

O aplicativo também pode ser utilizado por funcionários que trabalham remotamente.

Nesse caso, o trabalhador pode realizar as marcações diretamente de seu computador ou celular.

O fato de o funcionário utilizar um aplicativo para registrar o ponto não determina, por si só, se existe obrigação de controle da jornada.

Essa questão depende do regime de trabalho aplicável ao empregado.

Para entender especificamente o controle de jornada no trabalho remoto, consulte [ponto eletrônico para home office](/blog/ponto-eletronico-para-home-office-como-funciona-o-controle-de-jornada).

## App de ponto para trabalho híbrido

Em um modelo híbrido, o funcionário pode trabalhar parte da semana na empresa e parte remotamente.

Um aplicativo permite utilizar a mesma solução para registrar as marcações nos diferentes locais.

Por exemplo:

**Segunda:** escritório

**Terça:** escritório

**Quarta:** home office

**Quinta:** home office

**Sexta:** escritório

O sistema pode concentrar todas as marcações em um único ambiente, independentemente do local utilizado pelo funcionário.

## App de ponto para pequenas empresas

Para uma pequena empresa, o aplicativo pode substituir a necessidade de instalar um relógio físico exclusivamente para registrar a jornada.

O funcionário pode utilizar um celular ou outro dispositivo compatível para realizar as marcações.

A empresa passa a administrar os registros por meio de um sistema online.

Além da marcação, uma solução pode concentrar informações como:

* cadastro de funcionários;
* jornadas;
* escalas;
* marcações;
* justificativas;
* banco de horas;
* horas extras;
* espelho de ponto;
* relatórios.

O conjunto de funcionalidades depende do sistema contratado.

## App de ponto para equipes grandes

O aplicativo também pode ser utilizado por empresas com muitos funcionários.

Nesse cenário, o sistema precisa lidar com múltiplas marcações, usuários, jornadas, escalas, permissões e registros simultâneos.

A vantagem de uma solução baseada em software é centralizar essas informações em uma única plataforma.

Gestores e profissionais responsáveis pelo departamento pessoal podem consultar os registros sem precisar coletar informações de vários relógios físicos.

## App de ponto substitui o relógio de ponto?

Pode substituir o equipamento físico em determinadas operações, desde que a solução utilizada esteja estruturada de acordo com o sistema de registro de ponto adotado e cumpra os requisitos aplicáveis.

A regulamentação atual não limita o registro eletrônico ao relógio físico tradicional.

O REP-P justamente permite uma estrutura baseada em programa, com diferentes tipos de coletores, incluindo dispositivos móveis e navegadores.

Por isso, o funcionário pode registrar o ponto por aplicativo sem que exista necessariamente um relógio de ponto físico na empresa.

## App de ponto eletrônico é seguro?

A segurança depende da arquitetura e da implementação da solução.

Um sistema de ponto deve proteger os registros contra alterações indevidas e garantir a integridade das informações.

No REP-P, a regulamentação estabelece requisitos relacionados ao armazenamento, segurança e integridade dos registros.

Também existem requisitos específicos para documentos eletrônicos e assinaturas utilizadas pelo sistema.

Na prática, uma empresa deve avaliar aspectos como:

* controle de acesso;
* autenticação;
* proteção das comunicações;
* armazenamento;
* backup;
* integridade dos registros;
* disponibilidade;
* rastreabilidade das operações.

## App de ponto e LGPD

Um aplicativo de ponto pode tratar diversos dados pessoais dos funcionários.

Entre eles podem estar nome, CPF, informações profissionais, registros de jornada e, dependendo da solução, localização.

A ANPD considera dados de geolocalização de telefone celular como exemplo de dado pessoal.

Por isso, a empresa deve avaliar quais informações realmente precisam ser coletadas e para quais finalidades serão utilizadas.

Quanto mais dados forem coletados pelo aplicativo, maior deve ser a atenção dada à forma como essas informações são protegidas e utilizadas.

No caso específico da geolocalização, a ANPD destaca que, para controle de jornada, a preferência deve ser pelo registro associado a eventos como entrada e saída, em vez de rastreamento contínuo.

## O que uma empresa deve analisar antes de contratar um app de ponto?

Antes de contratar uma solução, não basta verificar se o aplicativo consegue registrar um horário.

É importante avaliar toda a estrutura de registro e tratamento da jornada.

Alguns pontos importantes são:

* qual tipo de REP é utilizado;
* como as marcações são armazenadas;
* se existe funcionamento offline;
* como o funcionário recebe o comprovante;
* como o espelho de ponto é disponibilizado;
* como os registros são protegidos;
* quais recursos de administração existem;
* como são tratadas alterações e justificativas;
* se existe integração com folha de pagamento;
* como os dados são exportados;
* como os dados pessoais são tratados;
* quais mecanismos existem para evitar alterações indevidas.

A escolha deve considerar a operação da empresa e não apenas a interface do aplicativo.

## App de ponto eletrônico precisa ser homologado?

Essa questão depende do tipo de REP utilizado.

O Ministério do Trabalho e Emprego informa que o **REP-P precisa possuir certificado de registro de programa de computador no INPI**, além de atender aos requisitos previstos na Portaria 671.

Isso é diferente do modelo tradicional de equipamento físico.

Portanto, não é correto tratar todos os aplicativos de ponto como se fossem relógios eletrônicos convencionais que precisam passar pelo mesmo processo de certificação.

O tipo de sistema utilizado deve ser identificado antes de analisar seus requisitos.

## App de ponto eletrônico e folha de pagamento

O registro de ponto pode fornecer informações utilizadas posteriormente no processamento da folha.

A partir das marcações e do tratamento da jornada, a empresa pode obter informações relacionadas a:

* horas extras;
* faltas;
* atrasos;
* adicionais;
* banco de horas;
* jornadas realizadas.

Uma integração entre o sistema de ponto e a folha pode reduzir a necessidade de transferir essas informações manualmente.

A página sobre [integração do ponto com a folha de pagamento](/blog/integracao-do-ponto-com-a-folha-de-pagamento-como-funciona) explica essa etapa com mais detalhes.

## App de ponto eletrônico e banco de horas

Quando a empresa utiliza banco de horas, as marcações realizadas pelo aplicativo podem servir como base para calcular os créditos e débitos de jornada.

Por exemplo:

**Jornada prevista:** 08:00

**Jornada registrada:** 09:00

**Diferença:** 01:00

A forma como essa diferença será tratada depende das regras de jornada e do regime de banco de horas adotado pela empresa.

O aplicativo pode apresentar o saldo acumulado ao funcionário e aos responsáveis pela gestão da jornada.

Para entender o funcionamento específico do banco de horas, consulte [banco de horas e horas extras](/blog/como-funciona-o-banco-de-horas-na-pratica).

## App de ponto eletrônico: vantagens

O uso de um aplicativo pode trazer algumas vantagens operacionais para empresas que precisam de um sistema de registro de jornada mais flexível.

Entre elas:

* marcação pelo celular;
* acesso remoto;
* utilização por equipes externas;
* centralização dos registros;
* consulta do ponto pelo funcionário;
* possibilidade de funcionamento offline;
* integração com outros sistemas;
* possibilidade de utilização de recursos adicionais, como geolocalização.

Essas vantagens dependem da estrutura oferecida pela solução.

## App de ponto eletrônico: limitações

O aplicativo também possui limitações que precisam ser consideradas.

O funcionamento depende do dispositivo utilizado, das permissões concedidas, da disponibilidade de bateria e, em determinadas situações, da conectividade.

Além disso, a empresa precisa verificar se a solução escolhida atende aos requisitos do tipo de registro eletrônico adotado.

Outro ponto importante é que funcionalidades adicionais, como geolocalização e reconhecimento facial, aumentam a quantidade e o tipo de dados tratados.

Por isso, a empresa deve avaliar não apenas o que o aplicativo consegue fazer, mas também como essas funcionalidades são implementadas.

## App de ponto eletrônico ou relógio de ponto?

Os dois modelos podem atender a necessidades diferentes.

Um relógio físico pode fazer sentido em uma empresa em que os funcionários entram e saem sempre pelo mesmo local.

Um aplicativo pode ser mais adequado quando existe uma necessidade de mobilidade ou quando os funcionários trabalham em diferentes locais.

Também é possível utilizar diferentes formas de coleta dentro da mesma operação, dependendo da estrutura adotada.

A escolha deve considerar onde os funcionários trabalham, como a jornada é registrada e quais recursos a empresa precisa administrar.

Para uma comparação específica entre as duas formas de registro, veja [ponto por app vs. relógio](/blog/ponto-por-app-vs-relogio-de-ponto-qual-a-diferenca-e-como-escolher).

## Como implantar um app de ponto eletrônico?

A implantação deve começar pela definição de como a empresa controla atualmente a jornada.

É necessário identificar:

* quais funcionários registram ponto;
* quais são suas jornadas;
* onde trabalham;
* quais dispositivos utilizarão;
* quais regras de intervalo e jornada serão aplicadas;
* se haverá necessidade de geolocalização;
* se existe necessidade de funcionamento offline;
* como os registros serão tratados;
* como o sistema será integrado à folha.

Depois disso, os funcionários devem ser cadastrados e orientados sobre a utilização do sistema.

Também é importante testar as marcações antes de colocar a solução em produção.

A implantação completa do controle eletrônico pode envolver outras etapas e está detalhada em [como implantar ponto eletrônico](/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo).

## App de ponto eletrônico: perguntas frequentes

### O funcionário pode bater o ponto pelo celular?

Sim. A regulamentação do REP-P permite o uso de tecnologias móveis para realizar marcações de ponto.

### Precisa instalar um relógio de ponto?

Não necessariamente. O REP-P é baseado em programa e pode utilizar diferentes coletores, incluindo aplicativo mobile e navegador.

### O app precisa ter GPS?

Não. A geolocalização é uma funcionalidade adicional e não é requisito geral para toda marcação mobile.

### O aplicativo funciona sem internet?

Pode funcionar, desde que a solução implemente o mecanismo offline conforme os requisitos aplicáveis. A Portaria 671 prevê essa possibilidade para o REP-P.

### O funcionário recebe comprovante?

Nos sistemas em que se aplica a regra do REP-P, o comprovante de registro deve ser disponibilizado ao trabalhador conforme as regras da Portaria 671.

### O funcionário pode consultar o espelho de ponto?

Sim. O programa de tratamento deve gerar o Espelho de Ponto Eletrônico e o trabalhador deve ter acesso às informações.

### O app de ponto pode ser usado no home office?

Pode ser utilizado como ferramenta de registro quando houver controle de jornada aplicável ao trabalhador.

### O app pode ser usado por funcionários externos?

Sim. A marcação mobile é justamente uma das possibilidades proporcionadas pelas tecnologias utilizadas no REP-P.

## Conclusão

O **app de ponto eletrônico** é uma forma de registrar a jornada utilizando software e dispositivos como celulares, computadores e outros coletores compatíveis.

A regulamentação atual contempla o **REP-P**, que permite a utilização de novas tecnologias e marcação mobile. A estrutura pode utilizar aplicativo, navegador ou outros tipos de coletores previstos para o sistema.

Além da marcação de entrada, saída e intervalos, uma solução pode oferecer comprovante, espelho de ponto, funcionamento offline, integração com folha, banco de horas e recursos adicionais como geolocalização.

A escolha de um aplicativo de ponto deve considerar não apenas a facilidade de registrar o horário, mas também a estrutura utilizada para armazenar, proteger e tratar os registros de jornada.

Para a empresa, o objetivo é ter um meio de registrar e administrar a jornada de forma adequada à sua operação. Para o funcionário, é importante que as marcações realizadas possam ser consultadas e comprovadas.
