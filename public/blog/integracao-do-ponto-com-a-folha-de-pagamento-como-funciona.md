# Integração do ponto com a folha de pagamento: como funciona

A **integração do ponto com a folha de pagamento** conecta as informações de jornada dos funcionários ao sistema utilizado para processar a remuneração.

Quando o ponto e a folha trabalham de forma integrada, dados como horas extras, faltas, atrasos, adicional noturno e banco de horas podem ser disponibilizados para o processamento da folha sem que o responsável precise lançar todas essas informações manualmente.

Mas integração não significa que ponto e folha sejam o mesmo sistema.

O ponto registra e trata a jornada. A folha utiliza os resultados dessa jornada junto com outras informações para calcular a remuneração.

## O que é integração do ponto com a folha de pagamento?

A integração do ponto com a folha de pagamento é o processo de comunicação entre o sistema de controle de jornada e o sistema de folha.

O sistema de ponto registra as ocorrências da jornada e, depois do tratamento e fechamento do período, disponibiliza os resultados necessários para a folha.

A folha recebe essas informações e as utiliza no processamento dos eventos correspondentes.

De forma simplificada:

**Registro da jornada → tratamento do ponto → fechamento → integração → folha de pagamento**

A integração pode ser automática ou depender de uma etapa de exportação e importação, dependendo da tecnologia utilizada pelos sistemas.

## Para que serve integrar o ponto com a folha?

A principal finalidade é evitar que o responsável pelo departamento pessoal precise consultar o ponto e digitar novamente na folha as informações que já foram registradas e tratadas pelo sistema.

Sem integração, o processo pode envolver: consultar o sistema de ponto; identificar as ocorrências; conferir as jornadas; calcular ou verificar os resultados; lançar as informações na folha.

Com a integração, os resultados tratados podem ser transferidos diretamente para o sistema de folha.

Isso pode reduzir:

* lançamentos manuais;
* erros de digitação;
* retrabalho;
* divergências entre sistemas;
* tempo gasto no fechamento.

A integração, porém, não elimina a necessidade de conferência.

## Como funciona a integração do ponto com a folha?

O processo normalmente começa no registro da jornada.

O funcionário registra suas entradas, saídas e intervalos utilizando o método adotado pela empresa.

O sistema de ponto recebe esses registros e aplica as regras configuradas para interpretar a jornada.

A partir disso, podem ser identificadas ocorrências como horas extras, atrasos, faltas, adicional noturno e banco de horas.

Depois da conferência e do fechamento do período, os resultados necessários são enviados para o sistema de folha.

A folha utiliza esses dados juntamente com salário, benefícios, descontos e demais informações necessárias para realizar o processamento da remuneração.

### Exemplo

Um funcionário possui uma jornada de 8 horas por dia e realizou horas extras durante o período.

O sistema de ponto registra os horários realizados e trata a jornada conforme as regras configuradas.

Depois do fechamento, a quantidade de horas extras apurada pode ser disponibilizada para a folha.

A folha recebe essa informação e a utiliza no evento correspondente ao processamento da remuneração.

O ponto, portanto, não precisa calcular toda a folha para que exista integração.

Ele precisa fornecer corretamente os resultados relacionados à jornada.

## Quais informações do ponto podem ser integradas à folha?

A integração pode envolver diferentes resultados da jornada, dependendo da configuração da empresa e dos sistemas utilizados.

### Horas extras

As horas trabalhadas além da jornada prevista podem ser disponibilizadas para a folha.

A forma como essas horas serão classificadas e remuneradas depende das regras aplicáveis e da configuração dos eventos da folha.

### Adicional noturno e horas noturnas

Quando existe trabalho em período noturno, o tratamento da jornada pode gerar informações utilizadas no cálculo correspondente.

### Faltas e atrasos

Ocorrências de ausência, atraso ou saída antecipada também podem ser utilizadas no processamento da folha.

### Banco de horas

Quando a empresa utiliza banco de horas, o sistema precisa identificar as horas acumuladas, compensadas ou eventualmente convertidas em outros eventos.

O resultado utilizado pela folha depende das regras adotadas pela empresa.

### Outras ocorrências da jornada

Dependendo da configuração, também podem existir informações relacionadas a compensações, feriados, descansos e outras situações que tenham impacto no processamento.

Por isso, não existe um único conjunto de campos que sirva para todas as integrações.

## Ponto e folha de pagamento são a mesma coisa?

Não.

O **sistema de ponto** trabalha principalmente com a jornada.

A **folha de pagamento** trabalha com a remuneração.

O ponto registra informações como:

* entrada;
* saída;
* intervalo;
* horas trabalhadas;
* horas extras;
* atrasos;
* faltas;
* horas noturnas;
* banco de horas;
* compensações.

A folha utiliza os resultados da jornada junto com outras informações para calcular a remuneração.

Essa separação é importante porque uma integração não transforma o sistema de ponto em um sistema de folha.

O objetivo é fazer com que os resultados de um processo sejam utilizados pelo outro.

## O sistema de ponto calcula a folha de pagamento?

Não necessariamente.

Um sistema de ponto pode calcular ou tratar diversos resultados da jornada, mas isso não significa que ele realize todos os cálculos da folha.

A folha pode envolver informações que não existem no sistema de ponto, como salário, benefícios, descontos, férias, rescisão e outros eventos.

Por isso, o ponto fornece informações relacionadas à jornada e a folha utiliza essas informações dentro do seu próprio processamento.

## Quais são as formas de integrar o ponto à folha?

A forma de integração depende da arquitetura dos sistemas.

### Integração por API

Uma API permite que os sistemas troquem informações de forma automatizada.

O sistema de ponto pode disponibilizar os resultados da jornada para o sistema de folha conforme uma estrutura previamente definida.

Esse modelo é útil quando os sistemas possuem integração por serviços.

### Integração por arquivo

Outra possibilidade é gerar um arquivo com os resultados do ponto e importá-lo no sistema de folha.

Nesse caso, os dois sistemas precisam utilizar um formato compatível.

Também é necessário estabelecer como funcionários, períodos, eventos e demais informações serão identificados.

### Integração por sistema intermediário

Empresas que utilizam vários sistemas também podem utilizar uma camada intermediária para receber, transformar e distribuir os dados.

Nesse modelo, o sistema intermediário pode adaptar os dados do ponto ao formato esperado pela folha.

## O que precisa ser configurado para integrar ponto e folha?

A conexão entre os sistemas é apenas uma parte da integração.

Também é necessário definir como os dados serão interpretados.

### Identificação dos funcionários

A matrícula ou outro identificador utilizado no ponto precisa corresponder ao funcionário correto na folha.

Uma divergência pode fazer com que uma informação não seja importada ou seja associada incorretamente.

### Período de apuração

Os sistemas precisam estar alinhados quanto ao período utilizado para apuração e fechamento.

Isso evita que uma jornada de um período seja enviada para uma folha de período diferente.

### Eventos da folha

Os resultados do ponto precisam ser relacionados aos eventos correspondentes no sistema de folha.

Por exemplo, as horas extras apuradas pelo ponto precisam ser associadas ao evento utilizado pela folha para esse tipo de ocorrência.

### Regras de jornada

Também é necessário configurar corretamente as jornadas, escalas, intervalos, horas extras, banco de horas e demais regras utilizadas pelo sistema de ponto.

Uma integração não corrige uma configuração errada na origem.

## Como é feito o fechamento antes de enviar o ponto para a folha?

A integração normalmente acontece depois do tratamento da jornada.

Antes de enviar os dados, o responsável pode verificar:

* registros faltantes;
* atrasos;
* faltas;
* horas extras;
* jornadas incompletas;
* banco de horas;
* adicional noturno;
* marcações duplicadas;
* funcionários sem movimentação;
* outras inconsistências.

Depois das correções e aprovações necessárias, o período é fechado.

Só então os resultados são disponibilizados para a folha.

Essa etapa é importante porque uma integração automática pode transferir corretamente um dado que foi gerado a partir de uma configuração incorreta.

## A integração do ponto elimina a conferência do RH?

Não.

A integração reduz o trabalho manual, mas não substitui a conferência.

O responsável pelo fechamento ainda precisa verificar se os resultados fazem sentido antes que sejam utilizados na folha.

Por exemplo, uma empresa pode identificar que determinado funcionário possui uma quantidade de horas extras muito acima do esperado.

O sistema pode transferir esse resultado corretamente, mas isso não significa que a informação esteja correta.

A integração automatiza a transferência.

A validação continua sendo necessária.

## AFD, AEJ e espelho de ponto fazem parte da integração com a folha?

Esses elementos estão relacionados ao tratamento e à documentação do registro eletrônico de ponto, mas não devem ser confundidos com a integração da folha.

O **AFD** contém os dados de registro do ponto.

O **AEJ** reúne informações eletrônicas de jornada após o tratamento previsto para o sistema.

O **espelho de ponto** apresenta as informações da jornada do trabalhador.

Já a integração com a folha tem outra finalidade: disponibilizar os resultados necessários para o processamento da remuneração.

Portanto, gerar um AFD, um AEJ ou um espelho de ponto não significa, por si só, que o sistema esteja integrado à folha.

Para entender especificamente AFD e AEJ, veja [o que é AFD e AEJ](/blog/o-que-e-afd-e-aej).

Para entender o documento gerado a partir do tratamento da jornada, veja [o que é espelho de ponto](/blog/o-que-e-espelho-de-ponto).

## O espelho de ponto é enviado para a folha?

Não necessariamente.

O espelho de ponto é utilizado para apresentar as informações da jornada e permitir sua consulta e conferência.

A folha precisa dos resultados necessários para realizar seus próprios cálculos.

Por isso, uma integração normalmente trabalha com dados estruturados da jornada, e não simplesmente com o envio de um arquivo PDF do espelho.

## Como fica a integração do ponto com o eSocial?

O eSocial e o sistema de ponto possuem funções diferentes.

O ponto está relacionado ao registro e tratamento da jornada.

A folha participa do processamento dos eventos trabalhistas e da remuneração.

Em muitos ambientes, o fluxo pode ser representado assim:

**Ponto → folha de pagamento → obrigações trabalhistas**

Isso não significa que todo sistema de ponto precise se comunicar diretamente com o eSocial.

A arquitetura depende dos sistemas utilizados pela empresa.

Por isso, integração entre ponto e folha e integração com eSocial são assuntos relacionados, mas não são a mesma coisa.

## O que acontece quando existe erro na integração?

Uma integração precisa ter mecanismos para identificar falhas.

Alguns exemplos são:

* funcionário não encontrado;
* matrícula divergente;
* evento inexistente;
* período incompatível;
* informação obrigatória ausente;
* arquivo rejeitado;
* dado não processado.

O ideal é que o sistema permita identificar o problema, corrigir a origem e realizar novamente o processamento.

Sem esse controle, um erro pode passar despercebido e afetar o fechamento da folha.

## Como testar uma integração entre ponto e folha?

Antes de colocar a integração em produção, é importante testar diferentes situações de jornada.

Alguns cenários relevantes são:

* jornada normal;
* horas extras;
* adicional noturno;
* atraso;
* falta;
* banco de horas positivo;
* banco de horas negativo;
* feriado trabalhado;
* funcionário admitido durante o período;
* funcionário desligado;
* alteração de jornada;
* funcionário sem registro;
* divergência de identificação.

O objetivo não é apenas verificar se a informação chegou à folha.

É necessário confirmar se **o resultado recebido pela folha corresponde ao resultado calculado pelo ponto**.

## O que avaliar ao escolher um sistema de ponto integrado à folha?

A existência da palavra "integração" na descrição de um sistema não é suficiente.

É importante verificar como essa integração realmente funciona.

Algumas perguntas ajudam nessa avaliação:

* O sistema possui integração com a folha utilizada pela empresa?
* A integração funciona por API ou arquivo?
* Quais informações podem ser enviadas?
* Como os funcionários são identificados?
* Como os eventos da jornada são relacionados aos eventos da folha?
* É possível conferir os dados antes do envio?
* Como os erros são apresentados?
* É possível reprocessar uma integração?
* Existe histórico das transmissões?
* Como são tratadas alterações depois do fechamento?
* A integração funciona para diferentes estabelecimentos?
* É possível exportar os dados caso a empresa troque de sistema?

Essas informações são mais relevantes do que simplesmente saber se o fornecedor possui uma integração anunciada comercialmente.

## Integração do ponto com a folha em pequenas empresas

Em uma empresa pequena, a integração pode reduzir principalmente o trabalho manual do responsável pelo departamento pessoal.

Mesmo com poucos funcionários, informações como horas extras, faltas e atrasos precisam ser conferidas e utilizadas no processamento da folha.

Quando o volume de funcionários aumenta, o benefício tende a ser ainda mais relevante porque a quantidade de lançamentos também cresce.

O sistema de ponto passa a funcionar como a origem dos dados de jornada, enquanto a folha utiliza os resultados tratados.

## Integração do ponto com a folha em empresas com vários estabelecimentos

Quando a empresa possui diferentes unidades, a integração precisa considerar também a estrutura organizacional.

É necessário manter corretamente associados:

* funcionário;
* estabelecimento;
* jornada;
* período;
* eventos;
* regras;
* sistema de folha.

Uma divergência de cadastro pode causar problemas mesmo quando a comunicação entre os sistemas está funcionando tecnicamente.

Por isso, em estruturas maiores, a integração precisa ser acompanhada por regras claras de cadastro e validação.

## Como funciona a integração do SegPonto com a folha?

O SegPonto centraliza o controle da jornada e o tratamento das informações relacionadas ao ponto.

A partir dos registros realizados pelos funcionários, o sistema pode trabalhar com os resultados da jornada e disponibilizá-los para os processos relacionados ao departamento pessoal.

A forma de integração depende do sistema de folha utilizado pela empresa e dos dados que precisam ser transferidos.

O objetivo é evitar que os resultados já tratados no controle de jornada precisem ser digitados novamente no sistema de folha.

## Conclusão

A **integração do ponto com a folha de pagamento** permite que os resultados do controle de jornada sejam utilizados no processamento da remuneração sem depender de lançamentos manuais para cada ocorrência.

O ponto continua responsável pelo registro e tratamento da jornada, enquanto a folha utiliza essas informações junto com os demais dados necessários para calcular a remuneração.

Uma integração bem estruturada depende de mais do que conectar dois sistemas. É necessário alinhar funcionários, períodos, jornadas, eventos, regras e mecanismos de validação.

Para empresas que querem reduzir o trabalho manual no fechamento da folha, integrar o controle de jornada ao sistema de pagamento pode transformar o ponto em uma fonte estruturada de informações para o departamento pessoal.

## Perguntas frequentes sobre integração do ponto com a folha

### O que é integração do ponto com a folha?

É a comunicação entre o sistema de controle de jornada e o sistema de folha de pagamento para que os resultados da jornada possam ser utilizados no processamento da remuneração.

### Quais informações podem ser integradas?

Podem ser integrados resultados como horas extras, faltas, atrasos, horas noturnas, banco de horas e outras ocorrências relacionadas à jornada, dependendo da configuração dos sistemas.

### A integração calcula automaticamente a folha?

Não necessariamente. O sistema de ponto fornece informações relacionadas à jornada, enquanto a folha realiza o processamento da remuneração conforme sua própria estrutura.

### A integração elimina os lançamentos manuais?

Ela pode reduzir ou eliminar diversos lançamentos manuais, dependendo da integração disponível, mas a conferência das informações continua sendo necessária.

### AFD e AEJ substituem a integração com a folha?

Não. AFD e AEJ estão relacionados ao registro e tratamento eletrônico da jornada. A integração com a folha é um processo diferente.

### O espelho de ponto pode ser enviado para a folha?

O espelho é um documento de consulta e conferência da jornada. A integração normalmente trabalha com os dados estruturados necessários para o processamento da folha.

### É possível integrar ponto e folha por API?

Sim. Quando os sistemas possuem APIs compatíveis, a comunicação pode ser automatizada. Também existem integrações realizadas por arquivos.

### O ponto precisa estar integrado diretamente ao eSocial?

Não necessariamente. O fluxo depende da arquitetura utilizada pela empresa. Em muitos ambientes, o ponto alimenta a folha, que participa do processamento das obrigações trabalhistas.

### O que acontece se houver erro na integração?

O erro precisa ser identificado, corrigido e processado novamente conforme os mecanismos disponíveis nos sistemas. Por isso, validação e rastreabilidade são importantes em uma integração.
