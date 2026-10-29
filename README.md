# Portfólio — Reinaldo Luiz da Silva

[![CI](https://github.com/ReinaldoLuizSilva/ReinaldoLuizSilva.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/ReinaldoLuizSilva/ReinaldoLuizSilva.github.io/actions/workflows/ci.yml)

Site pessoal bilíngue (PT-BR / EN) de Reinaldo Luiz da Silva, analista de sistemas com foco
em Cloud & DevOps. Estático, gerado com [Astro](https://astro.build) e publicado no GitHub
Pages por GitHub Actions.

> 🚧 Em construção. O plano de entrega está no [CLAUDE.md](CLAUDE.md#11-plano-de-entrega-milestones).

## Stack

| Item          | Escolha                                              |
| ------------- | ---------------------------------------------------- |
| Framework     | Astro, saída 100% estática                           |
| Linguagem     | TypeScript (`strict`)                                |
| Estilo        | CSS puro com custom properties                       |
| JS no cliente | Zero (o site funciona com JavaScript desabilitado)   |
| i18n          | Roteamento nativo do Astro: PT na raiz, EN em `/en/` |
| Qualidade     | `astro check`, ESLint, Prettier, lychee, Lighthouse  |
| Hospedagem    | GitHub Pages via GitHub Actions                      |

## Como rodar localmente

Pré-requisitos: Node 24 (versão fixada em [.nvmrc](.nvmrc)) e npm.

```bash
nvm use            # ou: nvm use 24 (nvm-windows)
npm ci
npm run dev        # http://localhost:4321
```

O `.npmrc` usa `engine-strict=true`: a instalação falha de propósito em outra versão do Node.

## Scripts

| Comando                | O que faz                                     |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento                   |
| `npm run build`        | Gera o site estático em `dist/`               |
| `npm run preview`      | Serve o build localmente                      |
| `npm run check`        | Checagem de tipos (`astro check`)             |
| `npm run lint`         | ESLint                                        |
| `npm run format`       | Formata com Prettier                          |
| `npm run format:check` | Verifica formatação sem alterar (usado no CI) |

## Estrutura

```text
src/
├── components/          componentes sem lógica de conteúdo
│   └── diagrams/        diagramas de arquitetura em SVG, um por projeto (opcional)
├── content/projects/    um arquivo por projeto, em pt/ e en/
├── data/                perfil, experiência, certificações, stack, formação, projetos
├── i18n/                textos de interface (pt.json, en.json) e utilitários
├── layouts/
├── pages/               rotas: / e /projetos/<slug>/ (PT), /en/ e /en/projects/<slug>/ (EN)
└── styles/              tokens e estilos globais
```

Todo conteúdo vem de `src/data` e `src/content`; textos de interface vêm de `src/i18n`. O
`pt.json` é a fonte de verdade: se faltar uma chave no `en.json`, o `astro check` falha.

## Como adicionar um projeto

1. Crie `src/content/projects/pt/<slug>.md` e `src/content/projects/en/<slug>.md`. O nome do
   arquivo é o `slug` (minúsculas, números e hífens).
2. Preencha o frontmatter; o esquema é validado no build
   ([src/content.config.ts](src/content.config.ts)):

   ```yaml
   slug: meu-projeto
   title: Meu Projeto
   summary: Uma frase, mostrada na home.
   status: em desenvolvimento # concluído | em desenvolvimento | em planejamento
   stack: [Terraform, GitHub Actions]
   repo: https://github.com/ReinaldoLuizSilva/meu-projeto
   featured: false # true = destaque na home, com diagrama
   order: 3 # posição na lista
   # demo: https://...                 opcional
   # diagramDescription: ...           texto equivalente do diagrama, se houver
   ```

3. Escreva o corpo em Markdown com as seções `##` da página de detalhe (problema, stack e por
   quê, decisões e trade-offs, o que aprendi, próximos passos).
4. Opcional: um diagrama em `src/components/diagrams/<slug>.astro` (veja o do TicketOps). Sem
   ele, a página simplesmente não mostra diagrama.

Nenhum componente precisa ser alterado: a home e as páginas `/projetos/<slug>/` e
`/en/projects/<slug>/` são geradas a partir da coleção. O build falha se o projeto existir em
um idioma e não no outro, ou se o nome do arquivo não bater com o `slug`.

## Pipeline (GitHub Actions)

```text
PR / push ──▶ CI ──────────────────────────────────────────┐
              npm ci → astro check → ESLint → Prettier     │ verde na main?
              → build → lychee (links) → Lighthouse CI     ▼
                                              Deploy ──▶ GitHub Pages
                                              (mesmo commit verificado pelo CI)
```

- [ci.yml](.github/workflows/ci.yml) roda em todo pull request e push. O Lighthouse (mobile)
  falha o job abaixo de 95 em Performance, Accessibility, Best Practices ou SEO; os limites
  estão em [lighthouserc.json](lighthouserc.json) e os relatórios ficam como artefato do run.
- [deploy.yml](.github/workflows/deploy.yml) é disparado pelo fim do CI (`workflow_run`) e só
  publica se o CI passou num push na `main`. Ele faz o build do SHA exato que o CI verificou e
  publica com `actions/deploy-pages`. Não existe deploy manual.
- Permissões mínimas por job: só o job de deploy tem `pages: write` e `id-token: write`.
- Actions de terceiros fixadas por SHA de commit, com a versão em comentário.
- `concurrency` cancela CI obsoleto e enfileira deploys (nunca dois ao mesmo tempo).
- [Dependabot](.github/dependabot.yml) abre PRs semanais para npm e GitHub Actions.

Para rodar o Lighthouse localmente (precisa do Chrome instalado):

```bash
npm run build
npx lhci autorun
```

## Documentação do projeto

- [CLAUDE.md](CLAUDE.md) — requisitos, conteúdo, design aprovado e plano de milestones
- [GLOSSARY.md](GLOSSARY.md) — vocabulário usado no site e no código
