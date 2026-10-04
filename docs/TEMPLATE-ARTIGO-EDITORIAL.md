# Template editorial SegPonto (blog + landings)

Referência estrutural: [Guia da Carreira — Substantivo comum](https://www.guiadacarreira.com.br/blog/substantivo-comum).

Este documento é a regra de ouro para **qualquer** texto longo do SegPonto (posts em `/blog`, landings SEO, FAQ longas). Se o rascunho não couber neste molde, reescreva — não “melhore com linguiça”.

---

## 1. O que o template faz (mapa)

O artigo do Guia da Carreira não é uma lista de tópicos. Ele **ensina em camadas**:

| Ordem | Bloco | Função | Quantidade típica |
|------:|-------|--------|-------------------|
| 0 | **Abertura (intro)** | Situa o tema no mundo do leitor, abre curiosidade, lista as perguntas que o texto vai responder, fecha com uma linha de ponte (“Entenda…”) | 3–4 parágrafos curtos (≈ 90–140 palavras no total) |
| 1 | **Definição (“O que é…”)** | Responde direto; depois amplia com exemplos concretos dentro do parágrafo | 3–5 parágrafos (≈ 150–220 palavras) |
| 2 | **Exemplos por categoria** | Uma frase de ponte + **vários H3**, cada um com 1–2 parágrafos e **3–5 exemplos nomeados** | 1 intro + 3–6 H3 (cada H3 ≈ 40–90 palavras) |
| 3 | **Diferença / contraste** | Compara dois conceitos lado a lado, cada um em H3, com exemplo próprio | Intro curta + 2 H3 (cada um ≈ 60–100 palavras) |
| 4 | **Variações / aprofundamento** | Um aspecto que o leitor ainda não viu (ex.: flexões; no SegPonto: CCT, estabelecimento, prova) | Intro + 2–3 H3 |
| 5 | **Por que isso importa** | Consequência prática; pelo menos **um** exemplo do tipo “dizer X em vez de Y” | 3–5 parágrafos |
| 6 | **Próximo passo** | O que fazer / para onde ir (curso no Guia; no SegPonto: implantar, calcular, contratar) | 2–4 parágrafos |
| 7 | **FAQ** (opcional no Guia; obrigatório no SegPonto blog) | Pergunta real do dono/RH + resposta completa em prosa | 4–6 itens; cada resposta 2–4 frases |

**Começo / meio / fim**

- **Começo** = abertura + definição (o leitor já sabe a resposta principal).
- **Meio** = exemplos + contraste + variações (o leitor aprende a aplicar).
- **Fim** = importância + próximo passo + FAQ (o leitor decide o que fazer).

---

## 2. Abertura (copiar a distribuição)

No Guia:

1. Parágrafo 1: coloca o tema no cotidiano + gancho (“Sabe como?”).
2. Parágrafo 2: amplia o alcance do tema (pessoas, objetos, lugares…).
3. Parágrafo 3: **perguntas do leitor** em sequência (2–3 perguntas reais).
4. Parágrafo 4: uma linha de ponte (“Entenda mais sobre… e como aplicar…”).

No SegPonto, o campo `intro` + início da primeira seção cumprem isso.

**Proibido na abertura**

- Explicar o próprio título SEO (“falei X porque as pessoas pesquisam Y”).
- “Neste artigo vamos…”.
- “Muita gente se pergunta…” / “Não é X, é Y” como engodo.
- Keyword stuffing.

**Obrigatório na abertura**

- Resposta implícita ou explícita da dúvida do H1 ainda no começo.
- Perguntas que o resto do texto de fato responde.

---

## 3. Seção “O que é / O que a lei diz”

Padrão Guia:

1. Definição em linguagem simples (“Em termos simples…”).
2. Segundo parágrafo reforça com contraste útil (comum × próprio; no SegPonto: 20 × 21, obrigação formal × direito material).
3. Terceiro/quarto: **exemplos dentro da prosa** (“professor”, “cadeira”… / “loja com 12”, “obra com 8”).
4. Fecha com utilidade (sem substantivo a língua falha; sem limiar claro a PME decide errado).

Não transformar isso em bullet de duas palavras.

---

## 4. Seção de exemplos (o coração do template)

Padrão Guia:

- H2: “Exemplos de …”
- Uma frase: “podem ser agrupados em categorias… vamos explorar…”
- Vários **H3** nomeados (Objetos, Animais, Pessoas…).
- Cada H3: 1–2 frases de contexto + **lista de exemplos reais entre aspas ou em sequência clara**.

No SegPonto blog isso mapeia para `sections[].subsections[]`.

Exemplos de H3 válidos no post “até 20”:

- Empresa com 8 a 15 empregados  
- Empresa com exatamente 20  
- Empresa com 21 ou mais  
- Contagem por estabelecimento (matriz + filiais)

Cada H3 precisa de **cenário numerado** (quantas pessoas, o que acontece no dia, o que a lei exige).

---

## 5. Seção de diferença / contraste

Padrão Guia: “Diferença entre A e B” → H3 A → H3 B.

Cada lado:

- O que é.
- Como se escreve / como se aplica (no SegPonto: o que a empresa deve fazer).
- Um exemplo próprio (“cachorro” genérico × “Frida Kahlo” específica / “15 sem obrigação formal do §2º” × “22 com anotação obrigatória”).

---

## 6. Variações e importância

- **Variações**: aspectos que mudam a aplicação (gênero/número no Guia; CCT, home office, prova judicial no SegPonto).
- **Importância**: por que o leitor deveria agir; exemplo de clareza (“dizer carro em vez de veículo automotor…” → “mostrar o espelho em vez de discutir meia hora no Zap”).

---

## 7. Quantidade (régua dura)

| Elemento | Mínimo | Máximo | Nota |
|----------|--------|--------|------|
| Palavras totais do artigo (intro+seções+faq) | ~900 | ~1600 | Abaixo de 900 = raso; acima de 1600 sem fato novo = linguiça |
| Seções H2 (`sections`) | 5 | 8 | |
| H3 por seção de exemplos/contraste | 2 | 6 | |
| Parágrafos por H2 sem H3 | 3 | 5 | |
| Parágrafos por H3 | 1 | 2 | |
| Exemplos concretos nomeados no artigo | 8 | — | Número, cargo, horário, quantas pessoas |
| FAQ | 4 | 6 | |

Se uma seção só reformula a anterior, apague.

---

## 8. Tom e frases — o que é lixo

**Lixo (proibido)**

- Meta sobre o texto (“o título deste artigo…”, “como vimos acima…”).
- Antítese vazia (“não é sobre X, é sobre Y”) sem dado novo.
- Setas `→` no lugar de frase.
- Path cru (`/blog/foo`) no meio do parágrafo.
- Frases de duas/três palavras fingindo tópico.
- “Em outras palavras” repetindo o parágrafo anterior.
- CTA disfarçado de conteúdo a cada dois parágrafos.

**Conteúdo (obrigatório)**

- Artigo de lei / regra quando o tema for jurídico (ex.: art. 74, §2º CLT).
- Número (20, 21, 12 empregados, 20h, R$).
- Consequência operacional (folha, fiscal, reclamação, contador).
- Exemplo que o dono/RH reconhece na segunda-feira.

---

## 9. Mapeamento técnico no código

### Blog (`BlogPost`)

- `intro` → resumo curto (lista do blog / cards).
- `opening[]` → abertura Guia da Carreira (3–4 parágrafos: gancho, contexto, perguntas, ponte).
- `sections[]` → H2 (definição, exemplos, contraste, variações, importância, próximo passo).
- `sections[].subsections[]` → H3 (categorias de exemplo / lados do contraste).
- `sections[].paragraphs` → prosa do H2 (antes dos H3, se houver).
- `faqs[]` → perguntas da abertura respondidas.
- `related[]` → “leia também” (rótulo humano; path só no `to`).

Se `opening` existir, a página do post **não** repete `intro` no hero — H1 + abertura em parágrafos, como no Guia.

### Landings SEO (`SeoLandingContent`)

Mesma lógica de camadas do blog:

- `opening[]` → abertura Guia (3–4 parágrafos). Se existir, o hero **não** repete `subtitle`.
- `sections[]` → H2 na ordem definição → exemplos → contraste → (variações) → importância → próximo passo.
- `sections[].subsections[]` → H3 (exemplos / contraste).
- `faqs` → perguntas da abertura.
- `cards` / `steps` → **só** se forem categorias reais ou passos de aplicação; preferir H3 em prosa. Sem card decorativo.

---

## 10. Checklist antes de gravar

- [ ] Abertura com perguntas reais do leitor
- [ ] Definição clara na primeira seção longa
- [ ] Pelo menos uma seção com H3 de exemplos concretos
- [ ] Pelo menos uma seção de contraste A×B
- [ ] Seção de importância com consequência prática
- [ ] Próximo passo acionável
- [ ] FAQ respondendo as perguntas da abertura
- [ ] Zero itens da lista “Lixo”
- [ ] Contagem de palavras na régua (≈ 900–1600)

---

## 11. Exemplo de esqueleto (tema: até 20 empregados)

1. **Intro** — obrigação formal × resto da CLT; perguntas: 15 precisa? e 20? HE some? relógio físico?
2. **O que o art. 74, §2º determina** — texto da regra + “mais de 20” = 21+
3. **Exemplos por tamanho de quadro** — H3: 8–15 / exatamente 20 / 21+ / várias lojas
4. **Diferença: controle formal × direitos que continuam** — H3 cada lado
5. **Variações** — H3: CCT; home office/campo; prova na reclamação
6. **Por que organizar o registro mesmo abaixo de 21**
7. **Como registrar na prática** — livro, planilha, app
8. **FAQ**
