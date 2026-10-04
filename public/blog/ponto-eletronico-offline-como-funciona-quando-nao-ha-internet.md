# Ponto eletrônico offline: como funciona quando não há internet

Um sistema de ponto eletrônico depende de uma comunicação entre o dispositivo usado pelo funcionário e o sistema responsável por armazenar os registros. Quando essa comunicação é interrompida, surge uma dúvida comum: **é possível bater o ponto sem internet?**

Em determinados sistemas, sim.

A marcação pode ser registrada localmente pelo dispositivo e enviada ao sistema posteriormente, quando a conexão for restabelecida. Essa possibilidade é especialmente relevante para empresas com funcionários que trabalham em locais com internet instável, áreas externas, obras, operações móveis ou ambientes onde a conexão não pode ser garantida durante toda a jornada.

No caso do **REP-P**, a Portaria nº 671/2021 prevê expressamente a possibilidade excepcional de marcações realizadas por coletores offline.

## O que é um ponto eletrônico offline?

Ponto eletrônico offline é aquele que permite realizar a marcação da jornada mesmo quando o dispositivo utilizado para registrar o ponto está temporariamente sem conexão com o sistema.

Em uma operação online, o fluxo normalmente funciona assim:

**Funcionário → dispositivo → internet → sistema de ponto**

Quando a conexão cai, um sistema preparado para trabalhar offline pode alterar temporariamente esse fluxo:

**Funcionário → dispositivo → armazenamento local → internet → sistema de ponto**

A marcação não depende necessariamente de estar conectada ao servidor no exato momento em que o funcionário registra a entrada ou saída.

Quando a conexão retorna, os registros armazenados localmente são enviados para o sistema.

Isso é diferente de simplesmente deixar o aplicativo aberto sem conexão. Para funcionar corretamente, o sistema precisa ter uma arquitetura preparada para registrar, proteger e sincronizar as marcações posteriormente.

## Como funciona a marcação de ponto sem internet?

Imagine um funcionário chegando a uma obra onde o sinal de internet está indisponível.

Ele abre o aplicativo de ponto e registra a entrada às 8h.

Como o dispositivo está offline, a marcação não é imediatamente transmitida ao servidor.

O sistema registra localmente as informações necessárias para aquela marcação. Quando o dispositivo recuperar a conexão, o registro é enviado ao sistema central.

O fluxo fica:

1. o funcionário realiza a marcação;
2. o dispositivo identifica o trabalhador;
3. a marcação é registrada localmente;
4. a conexão continua indisponível;
5. o dispositivo recupera a conexão;
6. a marcação é enviada ao sistema;
7. o sistema central recebe e armazena o registro.

A sincronização posterior é uma parte importante desse funcionamento.

## O ponto offline é permitido pela Portaria 671?

Sim, a Portaria nº 671/2021 prevê a possibilidade de marcações offline no **REP-P**.

O Anexo IX determina que as marcações realizadas no REP-P devem ser provenientes de coletor online, mas podem, excepcionalmente, ocorrer de forma offline. A mesma norma determina que, nesse caso, as marcações sejam enviadas posteriormente, no primeiro momento em que o coletor voltar ao modo online, observadas as regras de segurança da informação.

Existe, porém, uma distinção importante: **a marcação offline não é obrigatória para todo REP-P**.

O próprio Ministério do Trabalho esclarece em seu documento de Perguntas e Respostas que a marcação offline não é obrigatória para o REP-P, pois existem arquiteturas nas quais esse tipo de marcação não é possível.

Portanto, uma empresa pode encontrar sistemas REP-P com funcionamento offline e sistemas que dependem de conexão para realizar a marcação.

## O que acontece com o registro quando a internet volta?

Quando o dispositivo volta a ficar online, as marcações realizadas offline devem ser transmitidas posteriormente ao REP-P.

A Portaria estabelece que esse envio deve ocorrer **no primeiro momento em que o coletor entrar novamente em modo online**.

Isso permite que uma interrupção temporária de conexão não faça com que o funcionário simplesmente fique sem conseguir registrar sua entrada ou saída.

O sistema precisa, portanto, controlar não apenas o momento em que a marcação foi realizada, mas também o processo de armazenamento e transmissão posterior.

## Ponto offline perde a hora da marcação?

Não é correto tratar o ponto offline como uma simples fila de registros sem controle de data e hora.

O REP-P deve possuir ou acessar relógio sincronizado com a Hora Legal Brasileira, disseminada pelo Observatório Nacional, com variação máxima de 30 segundos. Além disso, os requisitos do REP-P estabelecem informações relacionadas à marcação, incluindo CPF, data e hora da marcação, data e hora de gravação, identificador do coletor e código hash.

Isso é especialmente importante quando o dispositivo passa algum tempo sem conexão.

A ausência de internet não significa que o aparelho deixa de saber o horário ou que a marcação possa ser registrada posteriormente como se tivesse ocorrido naquele momento.

## Ponto offline funciona em celular?

Pode funcionar.

O Ministério do Trabalho explica que o **REP-P** possibilita o uso de novas tecnologias para registro de ponto, incluindo a marcação por dispositivos móveis.

Um celular pode atuar como coletor de marcações de um sistema REP-P quando a solução estiver estruturada dessa forma.

Nesse cenário, o aplicativo pode continuar realizando marcações durante uma indisponibilidade temporária de internet e sincronizá-las posteriormente, desde que a solução tenha suporte ao funcionamento offline.

Por isso, ao contratar um aplicativo de ponto, não basta verificar se ele permite bater ponto pelo celular. Também é necessário verificar **como ele se comporta quando o celular perde a conexão**.

Para entender especificamente o funcionamento dos aplicativos de ponto, veja também [app de ponto eletrônico](/blog/app-de-ponto-eletronico-como-funciona-e-como-usar).

## Ponto offline é a mesma coisa que ponto sem servidor?

Não.

O funcionamento offline significa que o **coletor de marcação pode ficar temporariamente sem comunicação com o sistema central**.

Isso não significa que a empresa deixa de possuir um sistema responsável pelo armazenamento e tratamento dos registros.

No REP-P, a própria estrutura regulamentar contempla os coletores de marcações, o armazenamento de registro de ponto e o Programa de Tratamento de Registro de Ponto.

A conexão pode ser interrompida temporariamente, mas os registros precisam posteriormente chegar ao ambiente responsável pelo armazenamento e tratamento.

## O que acontece se a internet cair durante a marcação?

Depende da arquitetura utilizada.

Em um sistema que possui suporte ao funcionamento offline, a marcação pode ser armazenada pelo coletor e sincronizada posteriormente.

Em um sistema que exige conexão para realizar a marcação, a indisponibilidade pode impedir o registro naquele momento.

Por isso, **ter um aplicativo de ponto não significa automaticamente ter ponto offline**.

São características diferentes:

* ponto pelo celular;
* funcionamento online;
* funcionamento offline;
* sincronização posterior;
* armazenamento local;
* tratamento das marcações.

Uma empresa que possui operação em regiões com internet instável deve verificar especificamente se a solução contratada suporta o cenário offline.

## Onde o ponto offline é mais útil?

O funcionamento offline pode ser relevante em operações nas quais a conexão não é constante.

### Obras e construção

Canteiros de obras podem apresentar conexão de internet limitada ou depender de redes móveis com cobertura variável.

Nessas situações, o funcionário pode precisar registrar a jornada mesmo durante uma indisponibilidade temporária da conexão.

A solução de ponto eletrônico para construção pode se beneficiar desse tipo de funcionamento, principalmente em operações distribuídas por diferentes locais.

Veja também [ponto eletrônico para construção](/ponto-eletronico-para-construcao).

### Trabalho externo

Funcionários que passam parte da jornada fora da empresa podem trabalhar em locais onde a conexão não esteja disponível no momento da marcação.

O funcionamento offline permite separar o momento da marcação do momento em que o registro é efetivamente sincronizado com o sistema.

### Operações móveis

Equipes que utilizam celulares ou tablets como coletores podem enfrentar regiões com sinal fraco, áreas sem cobertura ou interrupções temporárias de internet.

Nesse caso, o suporte ao modo offline evita que toda a operação de registro dependa da disponibilidade contínua da rede.

### Locais com internet instável

Mesmo dentro de um estabelecimento, problemas no Wi-Fi, na rede móvel ou no provedor podem interromper temporariamente a comunicação com o servidor.

Um sistema preparado para trabalhar offline pode continuar registrando as marcações durante esse intervalo.

## Ponto offline funciona com geolocalização?

Pode funcionar, mas são recursos diferentes.

A geolocalização registra informações relacionadas à localização do dispositivo no momento da marcação. O funcionamento offline trata da possibilidade de realizar e armazenar uma marcação sem comunicação imediata com o sistema central.

Os dois recursos podem existir simultaneamente.

Por exemplo, um aplicativo pode registrar uma marcação offline e armazenar as informações necessárias para posteriormente sincronizá-la com o sistema.

A forma como os dados de localização são tratados depende da arquitetura e das funcionalidades oferecidas pelo sistema.

Veja como funciona esse recurso em [geolocalização no ponto](/blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve).

## Ponto offline funciona sem energia?

Aqui é importante separar **falta de internet** de **falta de energia**.

O funcionamento offline normalmente se refere à ausência de comunicação com o sistema, e não à ausência de energia no dispositivo.

Se um celular estiver sem internet, mas continuar ligado, uma solução preparada para operar offline pode registrar a marcação.

Se o aparelho estiver completamente sem bateria, entretanto, não há dispositivo disponível para realizar a marcação.

Também existem características próprias de equipamentos físicos de registro de ponto. O REP-C, por exemplo, possui requisitos específicos relacionados ao seu relógio interno e ao funcionamento na ausência de energia elétrica.

Portanto:

**sem internet ≠ sem energia.**

São problemas diferentes e precisam ser tratados de maneiras diferentes pelo sistema.

## Como escolher um sistema de ponto eletrônico offline?

Para uma empresa que precisa desse recurso, não basta procurar pela expressão "ponto offline".

É importante verificar como a funcionalidade realmente funciona.

Alguns pontos devem ser avaliados:

### A marcação continua funcionando sem internet?

O sistema deve deixar claro se o funcionário consegue registrar entrada, saída e intervalo durante a indisponibilidade da conexão.

### Onde a marcação fica armazenada?

É importante entender como o dispositivo mantém temporariamente os registros antes da sincronização.

### Como ocorre a sincronização?

A solução deve informar o que acontece quando a conexão retorna e como as marcações pendentes são transmitidas ao sistema.

### Existe proteção contra alteração do registro?

O funcionamento offline precisa respeitar os requisitos de segurança aplicáveis ao sistema de registro eletrônico de ponto.

No REP-P, os requisitos incluem informações relacionadas à marcação e mecanismos de armazenamento e segurança, incluindo código hash SHA-256 associado ao registro.

### O sistema informa quais marcações foram sincronizadas?

Para a gestão da jornada, é importante conseguir identificar o estado dos registros e eventuais problemas de sincronização.

### O sistema continua funcionando em áreas sem Wi-Fi?

Se os funcionários utilizam dispositivos móveis, é necessário verificar se o modo offline funciona tanto quando não existe Wi-Fi quanto quando não há conexão de dados móveis.

## Ponto offline e segurança dos registros

O funcionamento offline cria uma etapa adicional no ciclo da marcação: existe um período em que o registro está no coletor antes de ser enviado ao sistema.

Por isso, a segurança dessa etapa é relevante.

A própria regulamentação do REP-P determina que, quando uma marcação é realizada offline, seu envio posterior deve observar as normas de segurança da informação previstas na Portaria.

A solução precisa, portanto, tratar o armazenamento temporário e a sincronização como parte do controle de jornada, e não simplesmente como uma funcionalidade de conveniência.

## Ponto offline substitui o controle de jornada?

Não.

O funcionamento offline é uma característica do mecanismo utilizado para registrar a jornada.

O controle de jornada envolve o conjunto de registros e procedimentos utilizados para acompanhar entrada, saída, intervalos, horas trabalhadas e demais ocorrências da jornada.

Uma empresa pode utilizar controle manual, mecânico ou eletrônico, conforme a solução adotada e as regras aplicáveis. O Ministério do Trabalho mantém atualmente os três tipos de registradores eletrônicos previstos na Portaria 671: REP-C, REP-A e REP-P, além das modalidades manual e mecânica de controle de jornada.

Para entender o conceito mais amplo, veja [controle de jornada](/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios).

## Qual a diferença entre ponto online e ponto offline?

A diferença principal está na dependência de comunicação imediata com o sistema central.

| Característica                            | Ponto online               | Ponto offline         |
| ----------------------------------------- | -------------------------- | --------------------- |
| Precisa de conexão no momento da marcação | Sim                        | Não necessariamente   |
| Registro pode ser feito sem internet      | Depende da solução         | Sim                   |
| Armazenamento temporário no dispositivo   | Pode não existir           | Pode existir          |
| Sincronização posterior                   | Não é necessária           | Necessária            |
| Indicado para locais com conexão instável | Pode apresentar limitações | Pode ser adequado     |
| REP-P pode utilizar                       | Sim                        | Sim, excepcionalmente |

A existência do modo offline, porém, depende da arquitetura do sistema. A própria orientação oficial do Ministério do Trabalho esclarece que essa funcionalidade não é obrigatória para todo REP-P.

## Ponto eletrônico offline é confiável?

A confiabilidade não depende simplesmente de o sistema funcionar sem internet.

É necessário analisar como ele registra a marcação, como mantém os dados enquanto está offline, como controla o horário, como protege o registro e como realiza a sincronização posterior.

No REP-P, a regulamentação estabelece requisitos específicos para o funcionamento dos coletores offline e para o envio posterior das marcações.

Por isso, para empresas que possuem operações externas, equipes móveis, obras ou locais com conexão instável, o funcionamento offline pode ser um requisito técnico importante na escolha do sistema de ponto eletrônico.

## Perguntas frequentes sobre ponto eletrônico offline

### O funcionário consegue bater ponto sem internet?

Em sistemas que possuem suporte ao modo offline, sim. A marcação pode ser registrada no dispositivo e enviada posteriormente quando a conexão for restabelecida.

### Todo sistema de ponto eletrônico funciona offline?

Não. O funcionamento offline depende da arquitetura e das funcionalidades da solução utilizada.

### Todo REP-P precisa funcionar offline?

Não. O Ministério do Trabalho esclarece que a marcação offline não é obrigatória para o REP-P.

### O que acontece com o ponto quando a internet volta?

No REP-P, as marcações realizadas offline devem ser enviadas posteriormente no primeiro momento em que o coletor voltar a ficar online, observados os requisitos de segurança da informação.

### Ponto offline é a mesma coisa que ponto pelo celular?

Não. Ponto pelo celular descreve o dispositivo ou meio utilizado para realizar a marcação. Offline descreve a capacidade de realizar a marcação sem conexão naquele momento.

### Ponto offline precisa ter geolocalização?

Não. Geolocalização e funcionamento offline são recursos diferentes e podem existir separadamente.

### Ponto offline funciona em home office?

Pode funcionar. Se o funcionário utiliza um aplicativo ou outro coletor compatível com funcionamento offline, a marcação pode ser realizada mesmo durante uma interrupção temporária da internet.

Para o contexto específico do trabalho remoto, veja [ponto eletrônico para home office](/blog/ponto-eletronico-para-home-office-como-funciona-o-controle-de-jornada).

## Ponto eletrônico offline no SegPonto

O funcionamento offline é especialmente relevante para empresas que não podem depender de uma conexão contínua para registrar a jornada.

Em uma solução de ponto eletrônico, o objetivo é permitir que a marcação seja registrada corretamente mesmo diante de uma indisponibilidade temporária da rede, com posterior sincronização dos dados quando a conexão for recuperada.

Para avaliar uma solução, é importante verificar não apenas se ela possui "modo offline", mas **como a marcação é armazenada, protegida e sincronizada posteriormente**.

Esse funcionamento pode ser útil em empresas com trabalho externo, construção civil, operações móveis, unidades com internet instável e outras situações em que a conexão não é garantida durante toda a jornada.
