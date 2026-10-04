# O que é AFD e AEJ? Entenda a diferença no ponto eletrônico

**AFD e AEJ são arquivos utilizados no controle eletrônico de jornada de trabalho e previstos nas regras da [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico).** Apesar de estarem relacionados ao [registro de ponto](/blog/registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras), eles têm funções diferentes dentro do sistema.

O **AFD (Arquivo Fonte de Dados)** reúne os dados originados pelo sistema de [registro eletrônico de ponto](https://segponto.com). Já o **AEJ (Arquivo Eletrônico de Jornada)** contém as informações resultantes do tratamento desses dados pelo Programa de Tratamento de Registro de Ponto.

Entender essa diferença é importante para empresas que utilizam [ponto eletrônico](https://segponto.com), principalmente quando precisam verificar a conformidade do sistema ou disponibilizar informações para uma fiscalização trabalhista.

## O que é AFD?

AFD significa **Arquivo Fonte de Dados**. É o arquivo que contém os dados gerados pelo sistema de [registro eletrônico de ponto](https://segponto.com), principalmente as informações relacionadas às marcações realizadas pelos trabalhadores.

O AFD possui um **formato padronizado pela [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico)**. Ele é um arquivo de texto, com os registros organizados em linhas e em uma ordem determinada pelo **Número Sequencial de Registro (NSR)**.

## O que tem dentro do AFD?

O arquivo é formado por diferentes tipos de registros. Entre as informações previstas estão:

- **Identificação do registro**, incluindo o tipo de registro e o número sequencial (NSR);
- **Identificação do empregador**, como razão social e CNPJ ou CPF;
- **Identificação do [REP](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas)**, como número de fabricação ou identificação do registro do equipamento ou sistema;
- **Período abrangido pelo arquivo**, com data inicial e final dos registros;
- **Data e hora em que o arquivo foi gerado**;
- **Identificação do fabricante ou desenvolvedor** do [REP](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas);
- **Versão do leiaute do AFD**;
- **Dados das marcações de ponto**, incluindo as informações necessárias para identificar os registros de jornada;
- **Códigos de verificação**, utilizados para verificar a integridade dos registros;
- **Assinatura digital**, quando aplicável ao tipo de [REP](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas).

Por exemplo, o cabeçalho do AFD contém informações como a identificação do empregador, o período dos registros, a data e hora de geração do arquivo e a versão do leiaute.

As marcações não ficam simplesmente armazenadas como uma planilha com colunas de "funcionário", "entrada" e "saída". O AFD segue um **leiaute técnico definido pela regulamentação**, com campos, posições e formatos específicos para cada tipo de registro.

Além dos dados, o formato possui mecanismos para verificar se os registros foram alterados. Os registros previstos utilizam **CRC-16** e o arquivo possui regras específicas de assinatura digital conforme o tipo de [REP](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas).

Por isso, o AFD pode ser entendido como o **arquivo padronizado que reúne os dados originados do [registro eletrônico de ponto](https://segponto.com)**, permitindo que essas informações sejam disponibilizadas para fiscalização e demais finalidades previstas na regulamentação.

## O que é AEJ?

AEJ significa **Arquivo Eletrônico de Jornada**. É o arquivo gerado pelo **Programa de Tratamento de Registro de Ponto (PTRP)** depois que os dados das marcações de ponto são tratados pelo sistema.

Enquanto o **AFD** reúne os dados originados do [registro de ponto](/blog/registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras), o **AEJ** apresenta os dados da jornada **após o processamento realizado pelo programa de tratamento de ponto**.

O AEJ possui um **leiaute padronizado pela [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico)** e é formado por registros organizados em uma estrutura específica. Ele reúne informações relacionadas às marcações e ao tratamento da jornada, permitindo identificar os dados utilizados para a apuração do ponto.

## O que tem dentro do AEJ?

Entre as informações previstas no arquivo estão dados como:

- **Identificação do empregador**, como CNPJ ou CPF;
- **Identificação do trabalhador**;
- **Data e horário das marcações**;
- **Origem das marcações**, conforme o tipo de registro utilizado;
- **Informações resultantes do tratamento da jornada**;
- **Identificação de alterações ou inclusões realizadas no tratamento**, quando aplicável;
- **Informações utilizadas para a apuração da jornada**;
- **Identificação do programa de tratamento de registro de ponto**.

O AEJ é gerado pelo **PTRP** e deve seguir o leiaute estabelecido pela [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico).

A regulamentação determina que o programa de tratamento de registro de ponto gere o **AEJ** e o [Espelho de Ponto Eletrônico](/blog/o-que-e-espelho-de-ponto), cada um com uma finalidade diferente.

Em resumo, o **AFD contém os dados originados pelas marcações**, enquanto o **AEJ contém as informações da jornada após o tratamento realizado pelo [sistema de ponto](https://segponto.com)**.

## Qual a diferença entre AFD e AEJ?

A principal diferença está **na origem e no momento em que cada arquivo é produzido**.

| AFD | AEJ |
| --- | --- |
| Arquivo Fonte de Dados | Arquivo Eletrônico de Jornada |
| Contém os dados originados do registro eletrônico | Contém os dados após o tratamento da jornada |
| É gerado pelo sistema de [registro eletrônico de ponto](https://segponto.com) | É gerado pelo Programa de Tratamento de Registro de Ponto |
| É a fonte dos dados das marcações | Representa os dados da jornada após o processamento |
| É utilizado para fiscalização | Também é utilizado para fiscalização e análise da jornada |

A própria [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) estabelece essa sequência: o sistema de registro eletrônico gera o **AFD**, enquanto o programa de tratamento utiliza esses dados e gera o **AEJ** e o [Espelho de Ponto Eletrônico](/blog/o-que-e-espelho-de-ponto).

## AFD e AEJ são a mesma coisa?

Não.

Embora os dois arquivos estejam relacionados ao controle eletrônico de jornada, **AFD e AEJ possuem funções diferentes**.

O AFD está relacionado aos dados produzidos pelo próprio sistema de [registro eletrônico de ponto](https://segponto.com).

O AEJ é produzido posteriormente pelo Programa de Tratamento de Registro de Ponto, a partir dos dados que foram registrados e processados.

Uma forma simples de visualizar é:

**Marcação do ponto → AFD → tratamento dos dados → AEJ + Espelho de Ponto**

Essa sequência ajuda a entender onde cada arquivo se encaixa dentro do sistema.

## Quem gera o AFD?

O AFD é gerado pelo **sistema de [registro eletrônico de ponto](https://segponto.com)**.

A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) estabelece regras diferentes conforme o tipo de REP utilizado.

### REP-C

No [REP-C](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), o AFD deve ser gravado em dispositivo externo de memória por meio da **Porta Fiscal**, destinada ao uso do Auditor-Fiscal do Trabalho.

### REP-A

No [REP-A](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), o AFD deve ser prontamente gerado e entregue quando solicitado pelo Auditor-Fiscal do Trabalho.

### REP-P

No [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), também deve ser possível gerar o AFD e disponibilizá-lo quando solicitado pela fiscalização.

As especificações atuais do Ministério do Trabalho incluem o leiaute do AFD para os sistemas de [registro eletrônico de ponto](https://segponto.com).

## Quem gera o AEJ?

O **Programa de Tratamento de Registro de Ponto (PTRP)** é responsável pela geração do AEJ.

A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) determina que o PTRP trate os dados relativos às marcações de entrada e saída contidas no AFD e gere o **AEJ** e o [Espelho de Ponto Eletrônico](/blog/o-que-e-espelho-de-ponto).

Isso significa que o AFD e o AEJ não são simplesmente dois arquivos diferentes gerados aleatoriamente pelo mesmo sistema.

Eles fazem parte de etapas diferentes do processamento da jornada.

## O que é o Programa de Tratamento de Registro de Ponto?

O **Programa de Tratamento de Registro de Ponto (PTRP)** é o conjunto de rotinas informatizadas responsável pelo tratamento dos dados das marcações de entrada e saída.

De acordo com a [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico), o programa recebe os dados contidos no AFD e, a partir deles, gera o [Espelho de Ponto Eletrônico](/blog/o-que-e-espelho-de-ponto) e o **AEJ**.

O tratamento não significa simplesmente alterar livremente os horários registrados.

A norma estabelece que a função de tratamento deve se limitar a acrescentar informações para complementar eventuais omissões, incluindo ausências e movimentações do [banco de horas](/blog/como-funciona-o-banco-de-horas-na-pratica), ou indicar marcações indevidas.

## O AFD pode ser alterado?

O AFD está relacionado aos dados originados das marcações realizadas no sistema de registro eletrônico.

Por isso, ele possui papel importante na preservação e fiscalização dos registros de jornada.

No caso do [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), por exemplo, a [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) estabelece requisitos de integridade dos dados armazenados e determina que os dados da memória não sejam apagados ou alterados direta ou indiretamente durante o prazo mínimo legal. O sistema também deve ser capaz de gerar o AFD a partir desses dados.

O tratamento da jornada ocorre em etapa própria, no PTRP.

## O AEJ pode ser alterado?

O AEJ é um arquivo produzido pelo Programa de Tratamento de Registro de Ponto conforme o processamento das informações da jornada.

Isso não significa que o sistema possa simplesmente modificar os registros originais de forma arbitrária.

A própria [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) estabelece limites para o tratamento dos dados, permitindo complementar informações ou indicar situações relacionadas às marcações, sem transformar o tratamento em uma ferramenta para apagar ou modificar livremente o registro original.

## AFD, AEJ e Espelho de Ponto: qual a diferença?

Os três documentos estão relacionados, mas possuem finalidades diferentes.

### AFD

É o **Arquivo Fonte de Dados**, formado a partir dos dados do sistema de [registro eletrônico de ponto](https://segponto.com).

### AEJ

É o **Arquivo Eletrônico de Jornada**, gerado pelo Programa de Tratamento de Registro de Ponto após o processamento dos dados.

### Espelho de Ponto Eletrônico

É o relatório que apresenta as informações da jornada do trabalhador de maneira adequada para consulta e conferência. Confira o artigo completo sobre [espelho de ponto](/blog/o-que-e-espelho-de-ponto).

A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) determina que o PTRP gere tanto o AEJ quanto o [Espelho de Ponto Eletrônico](/blog/o-que-e-espelho-de-ponto).

Na prática, podemos representar assim:

**[Sistema de ponto](https://segponto.com) → AFD → PTRP → AEJ + Espelho de Ponto**

## AFD e AEJ são obrigatórios no ponto eletrônico?

Para os sistemas de [registro eletrônico de ponto](https://segponto.com) abrangidos pela [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico), o **AFD deve ser gerado**.

A norma também determina que o Programa de Tratamento de Registro de Ponto gere o **AEJ** e o [Espelho de Ponto Eletrônico](/blog/o-que-e-espelho-de-ponto).

Portanto, uma empresa que utiliza um [sistema eletrônico de registro de ponto](/blog/registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras) precisa considerar esses arquivos na estrutura de conformidade do sistema.

Isso é diferente de dizer que toda empresa é obrigada a utilizar [ponto eletrônico](https://segponto.com). A obrigatoriedade do controle de jornada depende das regras aplicáveis à empresa e aos trabalhadores.

## AFD e AEJ substituíram o AFDT e o ACJEF?

Sim.

Com a entrada em vigor da [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico), o **AEJ passou a substituir o AFDT (Arquivo Fonte de Dados Tratados) e o ACJEF (Arquivo de Controle de Jornada para Efeitos Fiscais)** no novo modelo de arquivos de controle eletrônico de jornada.

O próprio Ministério do Trabalho informa que, com a [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico), esses arquivos foram substituídos pelo AEJ.

Por isso, ao pesquisar sobre arquivos de [ponto eletrônico](https://segponto.com), ainda é possível encontrar referências a **AFDT e ACJEF** em materiais antigos relacionados à Portaria 1510.

Para os sistemas submetidos às regras atuais, é importante verificar o leiaute e as exigências vigentes da [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico).

## Qual arquivo é usado em uma fiscalização trabalhista?

Tanto o **AFD** quanto o **AEJ** fazem parte da documentação relacionada ao controle eletrônico de jornada.

A forma de disponibilização do AFD depende do tipo de REP utilizado. No [REP-C](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), por exemplo, ele deve ser gravado pela Porta Fiscal. No [REP-A](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas) e no [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), deve ser prontamente gerado e entregue quando solicitado pelo Auditor-Fiscal do Trabalho.

O AEJ, por sua vez, é gerado pelo Programa de Tratamento de Registro de Ponto e segue o leiaute definido pelo Ministério do Trabalho e Emprego.

## O funcionário precisa acessar o AFD ou o AEJ?

Não são arquivos destinados à consulta cotidiana do trabalhador.

Para acompanhar sua jornada, o trabalhador normalmente consulta o [Espelho de Ponto Eletrônico](/blog/o-que-e-espelho-de-ponto), que reúne as informações necessárias para conferência das marcações e da jornada.

A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) estabelece requisitos específicos para o conteúdo do Espelho de Ponto e determina que o trabalhador tenha acesso às informações correspondentes.

O AFD e o AEJ têm uma função mais relacionada à estrutura de controle, processamento e fiscalização do registro de jornada.

## AFD e AEJ no ponto eletrônico pelo celular

O uso de aplicativo ou [sistema de ponto pelo celular](https://segponto.com) não elimina essas exigências quando o sistema utilizado se enquadra nas regras de [registro eletrônico de ponto](https://segponto.com).

A [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico) passou a contemplar o [REP-P](/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas), permitindo o uso de soluções baseadas em programas de computador, inclusive sistemas que utilizam novas tecnologias.

O sistema precisa atender aos requisitos aplicáveis ao tipo de REP utilizado, incluindo a geração dos arquivos exigidos pela regulamentação.

Por isso, simplesmente permitir que o funcionário [bata ponto pelo celular](https://segponto.com) não é suficiente para determinar se um sistema está adequado à legislação. Confira também [ponto por celular é legal](/blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular).

É necessário verificar **qual é o tipo de REP utilizado e se o sistema atende aos requisitos correspondentes**.

## AFD e AEJ no sistema de ponto eletrônico

Em um [sistema de ponto eletrônico](https://segponto.com), o fluxo pode ser entendido da seguinte forma:

1. O trabalhador realiza a marcação;
2. O sistema registra os dados da marcação;
3. Os dados são disponibilizados no AFD;
4. O Programa de Tratamento de Registro de Ponto processa as informações;
5. O sistema gera o AEJ;
6. O sistema gera o Espelho de Ponto Eletrônico;
7. O trabalhador pode consultar as informações da sua jornada;
8. Os arquivos podem ser disponibilizados para fiscalização quando solicitado.

Essa estrutura permite separar o **registro original**, o **tratamento da jornada** e a **apresentação das informações trabalhistas**.

Veja também [o que é espelho de ponto](/blog/o-que-e-espelho-de-ponto).

## Perguntas frequentes sobre AFD e AEJ

### O que significa AFD no ponto eletrônico?

AFD significa Arquivo Fonte de Dados. É o arquivo relacionado aos dados gerados pelo sistema de registro eletrônico de ponto.

### O que significa AEJ no ponto eletrônico?

AEJ significa Arquivo Eletrônico de Jornada. É o arquivo gerado pelo Programa de Tratamento de Registro de Ponto após o processamento dos dados da jornada.

### Qual a diferença entre AFD e AEJ?

O AFD contém os dados provenientes do registro eletrônico de ponto. O AEJ é gerado posteriormente pelo Programa de Tratamento de Registro de Ponto a partir do processamento dessas informações.

### Quem gera o AFD?

O AFD é gerado pelo sistema de registro eletrônico de ponto, conforme as regras aplicáveis ao REP-C, REP-A ou REP-P.

### Quem gera o AEJ?

O Programa de Tratamento de Registro de Ponto (PTRP) gera o AEJ.

### AFD e AEJ são a mesma coisa?

Não. São arquivos diferentes, gerados em etapas diferentes do processo de registro e tratamento da jornada.

### O AEJ substituiu o ACJEF?

Sim. O AEJ passou a substituir o ACJEF e o AFDT no modelo estabelecido pela Portaria 671.

### O funcionário recebe o AFD?

Não. O AFD não é o relatório utilizado normalmente pelo funcionário para consultar sua jornada. Para essa finalidade, existe o Espelho de Ponto Eletrônico.

### O sistema de ponto precisa gerar AFD e AEJ?

Os sistemas eletrônicos submetidos à Portaria 671 possuem requisitos específicos de geração desses arquivos. O AFD é exigido para os sistemas de registro eletrônico de ponto, enquanto o AEJ é gerado pelo Programa de Tratamento de Registro de Ponto.

## Conclusão

**AFD e AEJ são arquivos diferentes dentro da estrutura do [ponto eletrônico](https://segponto.com).**

O **AFD (Arquivo Fonte de Dados)** está relacionado aos dados gerados pelo sistema de [registro eletrônico de ponto](https://segponto.com). O **AEJ (Arquivo Eletrônico de Jornada)** é gerado pelo Programa de Tratamento de Registro de Ponto depois do processamento dessas informações.

A sequência básica é:

**Registro eletrônico → AFD → tratamento dos dados → AEJ + Espelho de Ponto**

Essa separação é importante porque permite distinguir os dados originados no [registro de ponto](/blog/registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras) dos dados processados pelo sistema de tratamento da jornada.

Para empresas que utilizam [ponto eletrônico](https://segponto.com), conhecer o AFD, o AEJ e o [espelho de ponto](/blog/o-que-e-espelho-de-ponto) ajuda a entender como o sistema deve estruturar e disponibilizar as informações de jornada de acordo com a [Portaria 671](/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico).
