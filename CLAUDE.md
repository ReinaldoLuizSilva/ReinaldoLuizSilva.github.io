# CLAUDE.md — Portfólio pessoal de Reinaldo Luiz Silva

Este arquivo é a fonte de verdade para construir e manter este repositório.
Leia-o inteiro antes de qualquer tarefa e siga-o à risca. Em caso de dúvida
sobre algo que não está aqui, **pergunte antes de decidir**.

---

## 1. Objetivo

Site pessoal estático e bilíngue (PT-BR / EN) que apresenta Reinaldo como
profissional de **Cloud / DevOps** em início de carreira, com diferencial em
**multicloud (GCP + OCI)** e base sólida em **Oracle DBA / infraestrutura**.

Público-alvo, em ordem de prioridade:

1. Recrutadores técnicos e tech leads avaliando candidatos para vagas
   Cloud/DevOps, CloudOps, SRE júnior e DBRE/Cloud DBA (Brasil e exterior).
2. Recrutadores não técnicos fazendo triagem rápida (30 segundos na página).

O site precisa responder em menos de 30 segundos: **quem é, o que faz, o que já
construiu e como entrar em contato.**

O próprio repositório também é peça de portfólio: o pipeline de CI/CD, a
organização do código e o README devem demonstrar boas práticas de DevOps.

---

## 2. Stack e hospedagem

| Item          | Decisão                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| Framework     | **Astro** (última versão estável), saída 100% estática                  |
| Linguagem     | TypeScript (modo `strict`)                                              |
| Estilo        | CSS puro com custom properties (sem Tailwind, sem framework de UI)      |
| JS no cliente | Mínimo possível. O site deve funcionar com JS desabilitado              |
| i18n          | Roteamento nativo do Astro: PT-BR na raiz (`/`), EN em `/en/`           |
| Hospedagem    | **GitHub Pages**, repositório `ReinaldoLuizSilva.github.io`             |
| URL           | `https://reinaldoluizsilva.github.io` (domínio próprio pode vir depois) |
| Deploy        | GitHub Actions (`actions/deploy-pages`), nunca deploy manual            |
| Node          | **24** (LTS ativa), fixada em `.nvmrc` e em `package.json > engines`    |
| Gerenciador   | npm (com `package-lock.json` versionado)                                |

Dependências aprovadas (todas de desenvolvimento/build, nada vai ao cliente):
`astro`, `typescript`, `@astrojs/check`, `@astrojs/sitemap`, `eslint`,
`typescript-eslint`, `eslint-plugin-astro`, `prettier`,
`prettier-plugin-astro`, `@lhci/cli`. O lychee roda como GitHub Action
(fixada por SHA), não como pacote npm.

**Não adicionar** nenhuma dependência fora desta lista sem pedir aprovação,
explicando o motivo e a alternativa sem dependência.

---

## 3. Estrutura de páginas

Site de página única por idioma (one-page com âncoras), mais uma página de
detalhe por projeto.

```
/                 → Home PT-BR
/en/              → Home EN
/projetos/<slug>  → Detalhe do projeto (PT-BR)
/en/projects/<slug> → Detalhe do projeto (EN)
/404              → Página de erro bilíngue
```

### Seções da home (nesta ordem)

1. **Hero** — nome, título profissional, uma frase de posicionamento, links
   para GitHub, LinkedIn, currículo (PDF) e contato.
2. **Projetos** — destaque para TicketOps e CostOps (ver seção 5). É a seção
   mais importante do site; deve aparecer cedo e com peso visual.
3. **Experiência** — linha do tempo profissional.
4. **Certificações** — com link para verificação (Credly ou emissor).
5. **Stack / competências** — agrupado por área, sem barras de "nível %".
6. **Formação**.
7. **Contato** — e-mail e links. Sem formulário (site estático).

### Página de detalhe de projeto

- Problema que o projeto resolve
- Arquitetura (diagrama em SVG feito à mão como componente Astro — sem
  Mermaid — com descrição textual equivalente)
- Stack e por que cada peça foi escolhida
- Decisões técnicas e trade-offs
- O que aprendi / próximos passos
- Links: repositório, demo (se houver)

---

## 4. Conteúdo — fonte de verdade

**Regra absoluta: não invente fatos.** Use apenas o que está nesta seção.
Tudo que estiver faltando deve virar um marcador `TODO(reinaldo): ...` visível
no código e listado no PR, nunca um dado plausível inventado (métricas,
datas, empresas, números de usuários, etc.).

Todo o conteúdo fica em arquivos de dados (`src/content/` ou `src/data/`),
nunca hardcoded nos componentes. Textos de interface ficam em
`src/i18n/pt.json` e `src/i18n/en.json`.

### Identidade

- Nome: Reinaldo Luiz da Silva (igual ao LinkedIn e ao currículo)
- Localização: Novo Hamburgo, RS, Brasil
- Título (PT): Analista de Sistemas · Cloud & DevOps
- Título (EN): Systems Analyst · Cloud & DevOps
- Frase do hero (PT): "Infraestrutura multicloud, do banco de dados ao pipeline."
- Frase do hero (EN): "Multicloud infrastructure, from the database to the pipeline."
- Posicionamento (parágrafo abaixo da frase do hero): experiência prática em
  GCP e OCI e background em Oracle DBA. Não usar "em transição" no hero.
- GitHub: https://github.com/ReinaldoLuizSilva
- LinkedIn: https://www.linkedin.com/in/reinaldoluizdasilva
- E-mail de contato: reinaldoluisdasilva@gmail.com (pessoal; nunca usar o
  e-mail corporativo)
- Currículo PDF: `TODO(reinaldo): arquivos public/cv-pt.pdf e public/cv-en.pdf`
  — enquanto não existirem, o link fica oculto (não quebrado).
- Foto: não usar nesta versão; o layout deve permitir adicionar depois.

Links de dados ainda pendentes (Credly, currículo etc.) ficam **ocultos** até
existirem — nunca um link quebrado ou placeholder clicável.

### Experiência

- **BEG Support Informática Aplicada** (Novo Hamburgo, RS)
  - Analista de Sistemas — jun/2025 até o momento
  - Estagiário de TI — jun/2024 a jun/2025
  - Atuação: Oracle DBA (OCI e on-premises), desenvolvimento Oracle APEX,
    administração Linux, Docker, monitoramento com Zabbix, gestão de
    infraestrutura de múltiplos clientes.
  - `TODO(reinaldo): 2–3 conquistas concretas para destacar`

### Formação

- Tecnólogo em Análise e Desenvolvimento de Sistemas — IENH — concluído em jul/2026

### Certificações

- Google Cloud Associate Cloud Engineer (ACE) — `TODO(reinaldo): link Credly`
- Oracle Cloud Infrastructure 2023 Certified Foundations Associate — `TODO(reinaldo): link`
- Google Cloud Computing Foundations Certificate — `TODO(reinaldo): link`
- Em andamento: Microsoft Azure Administrator (AZ-104)

### Stack (agrupada)

- **Cloud:** Google Cloud (Cloud Run, Secret Manager, Cloud Monitoring, IAM /
  Workload Identity Federation), Oracle Cloud Infrastructure (Autonomous Database)
- **IaC & CI/CD:** Terraform, GitHub Actions
- **Containers:** Docker
- **Bancos de dados:** Oracle Database (DBA), Oracle Autonomous Database
- **Desenvolvimento:** Python (FastAPI), Oracle APEX
- **Sistemas & observabilidade:** Linux, Zabbix, Cloud Monitoring

---

## 5. Projetos

Cada projeto é um arquivo em uma content collection (`src/content/projects/`),
com versão PT e EN. Schema mínimo (validar com Zod):

```ts
{
  slug: string;
  title: string;
  summary: string;          // 1 frase, aparece no card
  status: "concluído" | "em desenvolvimento" | "em planejamento"; // traduzido na UI
  stack: string[];
  repo: string;             // URL
  demo?: string;
  featured: boolean;
  order: number;
}
```

### TicketOps (featured, order 1)

- Repositório: https://github.com/ReinaldoLuizSilva/TicketOps
- O que é: API REST multicloud para gestão de tickets.
- Stack: FastAPI, Docker, Google Cloud Run, Oracle Autonomous Database
  (conexão via wallet mTLS), Terraform, GitHub Actions com Workload Identity
  Federation (sem chaves de service account), Secret Manager, Cloud Monitoring.
- Status: **concluído** (versão M5). Concluído não quer dizer fechado: a
  página de detalhe lista melhorias possíveis em "próximos passos".
- Demo: **nenhuma**. Não linkar o ambiente do Cloud Run (está parado e uma API
  pública com escrita no ADB convida abuso e custo).
- Destaque: é o exemplo central do diferencial multicloud (compute no GCP,
  banco na OCI). O diagrama de arquitetura deve deixar isso evidente.

### CostOps (não featured, order 2 — "próximo projeto")

- Repositório: https://github.com/ReinaldoLuizSilva/CostOps
- O que é: projeto de FinOps — inventário e análise de custos multicloud
  (Azure, GCP e OCI).
- Status: **em planejamento** (o repositório tem só o README; desenvolvimento
  previsto para depois de out/2026). Aparece como card secundário de "próximo
  projeto", com menos peso visual que o TicketOps. Ao começar o código, basta
  trocar o status no arquivo.
- Stack pretendida (segundo o README do repo): Python com SDKs oficiais,
  Terraform, GitHub Actions agendado; persistência e relatório a definir.

Novos projetos devem ser adicionáveis criando apenas um arquivo novo na
collection, sem mexer em componentes.

---

## 6. Internacionalização (PT-BR / EN)

- PT-BR é o idioma padrão (raiz). EN em `/en/`.
- Toda página existe nos dois idiomas. Build deve falhar se faltar tradução
  de uma chave em `src/i18n/*.json` ou de um projeto em algum idioma.
- Seletor de idioma visível no topo, levando para a **mesma página** no outro
  idioma (não para a home).
- `<html lang>` correto, `hreflang` alternates e `x-default` apontando para PT.
- Não detectar idioma automaticamente nem redirecionar.
- Traduções para EN: o Claude Code pode rascunhar a partir do PT, mas deve
  marcar o arquivo com `<!-- REVIEW(reinaldo): tradução gerada -->` até
  revisão humana. Usar inglês técnico natural, não tradução literal.

---

## 7. Design

O tema é **infraestrutura e operação**. O design deve ser sóbrio, técnico e
legível, mas com identidade própria, não um template de portfólio genérico.

Processo obrigatório antes de escrever CSS:

1. Propor um plano de design curto: paleta (4–6 cores nomeadas em hex),
   tipografia (1–2 famílias e seus papéis), conceito de layout com wireframe
   ASCII e 2–3 princípios.
2. Revisar o plano contra os padrões genéricos abaixo e ajustar o que soar
   como default.
3. **Aguardar aprovação do Reinaldo** antes de implementar.

Evitar (são marcas de site gerado/template):

- Fundo quase preto com um único acento verde-neon, ou estética "terminal
  hacker" com tudo em monospace.
- Fundo creme com serifa e acento terracota.
- Tudo cortado em cards arredondados idênticos com a mesma sombra cinza.
- Rótulos em CAIXA ALTA espaçada acima de cada título; destacar uma única
  palavra do título com cor ou itálico; setas "→" em todo link.
- Animação de fade/slide em cada seção; barras de habilidade com porcentagem.
- Numeração 01/02/03 em conteúdo que não é sequência.

Diretrizes:

- Um único elemento memorável (sugestão: o diagrama de arquitetura do
  TicketOps, mostrando GCP ↔ OCI). O resto quieto e disciplinado.
- Light e dark mode via `prefers-color-scheme`, com tokens em `:root`. Sem
  botão de alternar tema (zero JS).
- Linhas de texto com no máximo ~75 caracteres.
- Responsivo a partir de 360 px de largura.
- Fontes: no máximo 2 famílias, self-hosted (sem Google Fonts em runtime),
  formato woff2 com `font-display: swap`.
- Movimento só em resposta a ação do usuário; respeitar
  `prefers-reduced-motion`. **Exceções aprovadas** (CSS nativo, zero JS, ambas
  desligadas com `prefers-reduced-motion`):
  1. View Transitions entre a home e a página de detalhe do projeto.
  2. Um único efeito ligado à rolagem: o diagrama GCP ↔ OCI do TicketOps se
     desenhando conforme o usuário rola. Nenhuma outra seção anima.

Traços aprovados a partir das referências (vanholtz.co, dennissnellenberg.com,
michaelpumo.com):

- Hero com uma frase em tipografia muito grande.
- Projetos como lista tipográfica grande, não grade de cards; o visual de cada
  projeto é o seu diagrama de arquitetura (simplificado na home, completo no
  detalhe).
- Rodapé "versionado" com dados reais do pipeline: SHA curto do commit, data
  do deploy e link para o run do GitHub Actions, injetados no build pelo CI.

### Plano de design aprovado (M2)

Paleta "Concreto & duas nuvens" (contraste WCAG medido sobre o fundo):

| Token    | Claro     | Escuro    | Papel                                              |
| -------- | --------- | --------- | -------------------------------------------------- |
| Concreto | `#F2F3EF` | `#121419` | fundo                                              |
| Grafite  | `#16181D` | `#E6E7E2` | texto (15.9 / 14.8)                                |
| Névoa    | `#5B606A` | `#9A9FA8` | texto secundário, datas, metadados (5.7 / 6.9)     |
| Cobalto  | `#2445D6` | `#8FA3FF` | links, foco e lado **GCP** do diagrama (6.5 / 7.8) |
| Óxido    | `#B23A22` | `#F0856B` | **somente** lado **OCI** do diagrama (5.4 / 7.3)   |
| Junta    | `#C9CCC4` | `#2C3038` | linhas divisórias decorativas                      |

Tipografia (woff2 com subset latino, commitados em `public/fonts/` com a
licença OFL; sem pacotes `@fontsource`):

- **Mona Sans** (variável em peso e largura): tudo. Frase do hero na largura
  expandida e peso alto, em `clamp()` de ~2.6rem (360 px) a ~8rem.
- **IBM Plex Mono**: só metadados (rodapé de build, rótulos do diagrama,
  datas, stack). Nunca títulos ou parágrafos.

Princípios:

1. A tipografia faz o trabalho pesado: escala grande, poucas caixas, linhas
   finas (Junta) no lugar de cards.
2. Uma cor por nuvem: Cobalto = ação e GCP; Óxido existe só para a OCI. A
   ponte multicloud é a única coisa "colorida" do site.
3. O site mostra o próprio pipeline: o rodapé de build é real.

Layout da home (seções separadas por linhas finas, títulos em caixa normal):

```
 Reinaldo Luiz da Silva                         PT · EN
 ───────────────────────────────────────────────────────
 Infraestrutura multicloud, do banco de dados ao pipeline.   ← gigante
 Analista de Sistemas · Cloud & DevOps / posicionamento
 GitHub   LinkedIn   E-mail
 ───────────────────────────────────────────────────────
 Projetos
   TicketOps (título grande) ......................... Concluído
   [GCP · Cloud Run ══ mTLS ══▶ OCI · Autonomous DB]  ← se desenha na rolagem
   resumo · stack
   ─────────────────────────────────────────────────
   CostOps (linha menor) ....................... Próximo projeto
 ───────────────────────────────────────────────────────
 Experiência     tabela período | cargo
 Certificações   nome · emissor · verificar
 Stack           colunas por área
 Formação
 ───────────────────────────────────────────────────────
 Vamos conversar?  reinaldoluisdasilva@gmail.com     ← tipo grande
 build a1b2c3d · deploy 2026-10-28 · CI ✓     © 2026 ← Plex Mono, Névoa
```

- Em 360 px: colunas de rótulo empilham; o diagrama fica vertical (GCP em
  cima, OCI embaixo).
- Cada seção é um componente independente que recebe dados; novas seções
  podem ser adicionadas no futuro sem reestruturar o layout.

Página de detalhe: cabeçalho (título, status, resumo, repositório) → diagrama
completo (Actions ─WIF→ GCP {Cloud Run, Artifact Registry, Secret Manager,
Logging, Monitoring} ─mTLS→ OCI ADB) com descrição textual → Problema, Stack
e por quê, Decisões e trade-offs, O que aprendi, Próximos passos, em texto
corrido. O título faz View Transition a partir da home.

Este plano está aprovado; mudanças de design exigem nova aprovação.

---

## 8. Requisitos não funcionais

### Performance

- Lighthouse (mobile) ≥ 95 em Performance, Accessibility, Best Practices e SEO.
- JS total enviado ao cliente < 20 KB (idealmente zero).
- Imagens otimizadas com `astro:assets` (AVIF/WebP, dimensões explícitas).

### Acessibilidade

- WCAG 2.2 AA: contraste, foco visível, navegação completa por teclado,
  link "pular para o conteúdo", landmarks semânticos, `alt` em imagens.
- Diagramas com descrição textual equivalente.

### SEO e compartilhamento

- `<title>` e `meta description` por página e por idioma.
- Open Graph e Twitter Card com imagem OG (1200×630) por idioma.
- `sitemap.xml` (via `@astrojs/sitemap`), `robots.txt`, URL canônica.
- JSON-LD `Person` na home.

### Privacidade e segurança

- Sem analytics, cookies ou rastreadores nesta versão.
- Nenhum segredo, token ou dado pessoal sensível no repositório.
- Links externos com `rel="noopener noreferrer"`.

---

## 9. CI/CD (GitHub Actions)

O pipeline faz parte da vitrine; manter limpo e bem comentado.

**`ci.yml`** — em todo pull request e push:

1. `npm ci` com cache
2. `astro check` (tipos) + ESLint + Prettier (`--check`)
3. `astro build`
4. Verificação de links quebrados (lychee) no build gerado
5. Lighthouse CI com os limites da seção 8 (falha o job se não atingir)

**`deploy.yml`** — em push na `main`, após CI verde:

- Build e publicação via `actions/upload-pages-artifact` + `actions/deploy-pages`.
- Permissões mínimas declaradas por job (`contents: read`, `pages: write`,
  `id-token: write` só onde necessário).

Boas práticas obrigatórias:

- Actions de terceiros fixadas por **SHA de commit**, com a versão em comentário.
- `concurrency` configurado para não haver deploys simultâneos.
- Dependabot habilitado para npm e github-actions (semanal).
- Badge de status do CI no README.

Passos manuais (o Claude Code deve listar, não tentar fazer):

- Renomear o repositório `Portifolio` para `ReinaldoLuizSilva.github.io`
  (Settings → General) e atualizar o `origin` local.
- Ativar GitHub Pages com source "GitHub Actions".
- Proteção de branch na `main` exigindo CI verde.

---

## 10. Estrutura de diretórios esperada

```
.
├── .github/
│   ├── workflows/ (ci.yml, deploy.yml)
│   └── dependabot.yml
├── public/ (favicon, cv-pt.pdf, cv-en.pdf, robots.txt, fontes)
├── src/
│   ├── components/
│   ├── content/projects/ (pt/, en/)
│   ├── data/ (experiência, certificações, stack, formação)
│   ├── i18n/ (pt.json, en.json, utils.ts)
│   ├── layouts/
│   ├── pages/ (index.astro, projetos/, en/)
│   └── styles/ (tokens.css, global.css)
├── .nvmrc
├── astro.config.mjs
├── lighthouserc.json
├── CLAUDE.md
└── README.md
```

---

## 11. Plano de entrega (milestones)

Trabalhe **um milestone por vez**. Ao terminar cada um: rodar build e lint,
resumir o que foi feito, listar TODOs pendentes e **parar para revisão**.

| #   | Entrega                                                                              | Critério de pronto                                       |
| --- | ------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| M0  | Setup: Astro + TS strict, lint/format, estrutura de pastas, `.nvmrc`, README inicial | `npm run build` passa sem warnings                       |
| M1  | CI/CD: `ci.yml`, `deploy.yml`, Dependabot                                            | Página placeholder publicada no GitHub Pages via Actions |
| M2  | Plano de design (seção 7)                                                            | Aprovado pelo Reinaldo                                   |
| M3  | Layout base, tokens, header com seletor de idioma, footer, i18n funcionando          | Troca de idioma preserva a página; `hreflang` correto    |
| M4  | Seções da home com conteúdo real da seção 4                                          | Todas as seções nos dois idiomas; TODOs listados         |
| M5  | Projetos: collection, cards, páginas de detalhe, diagrama do TicketOps               | Adicionar projeto = criar 1 arquivo                      |
| M6  | SEO, OG images, sitemap, 404, acessibilidade                                         | Lighthouse CI ≥ 95 nos 4 critérios                       |
| M7  | Polimento e README final (com arquitetura do próprio site e decisões)                | Revisão final aprovada                                   |

---

## 12. Regras de trabalho para o Claude Code

- Não inventar conteúdo. Faltou informação → `TODO(reinaldo)` + perguntar.
- Pedir aprovação antes de: adicionar dependência, mudar a stack, alterar a
  estrutura de páginas ou mexer no design aprovado.
- Commits pequenos no padrão **Conventional Commits** (`feat:`, `fix:`,
  `ci:`, `docs:`, `chore:`), mensagens em inglês.
- Componentes pequenos e sem lógica de conteúdo; dados vêm de `src/data` e
  `src/content`.
- Código e nomes de variáveis em inglês; conteúdo do site em PT e EN.
- Antes de encerrar qualquer tarefa: `npm run build`, `npm run lint` e
  `astro check` sem erros.
- Manter o README atualizado com: como rodar localmente, como adicionar um
  projeto, como funciona o pipeline.
