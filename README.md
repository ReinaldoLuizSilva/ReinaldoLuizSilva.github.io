# Portfólio — Reinaldo Luiz da Silva

[![CI](https://github.com/ReinaldoLuizSilva/ReinaldoLuizSilva.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/ReinaldoLuizSilva/ReinaldoLuizSilva.github.io/actions/workflows/ci.yml)

Site pessoal bilíngue (PT-BR / EN) de Reinaldo Luiz da Silva, analista de sistemas com foco
em Cloud & DevOps: **<https://reinaldoluizsilva.github.io>**

O site é estático, gerado com [Astro](https://astro.build), sem JavaScript no navegador, e
publicado no GitHub Pages por um pipeline que só deixa chegar à produção o commit que passou
por tipos, lint, formatação, links quebrados e Lighthouse. O repositório também é peça de
portfólio: o pipeline e as decisões abaixo fazem parte do que ele mostra.

## Arquitetura

```text
 conteúdo                         build (Astro)                      saída
 ─────────────────────────────    ─────────────────────────────      ──────────────────────
 src/data/*.ts                    valida o frontmatter (Zod)         dist/
   perfil, experiência, stack ─┐  falha se faltar tradução             HTML + CSS
 src/content/projects/         ├─▶ de chave ou de projeto       ──▶   fontes woff2
   pt/<slug>.md  en/<slug>.md ─┤  gera PT (/) e EN (/en/)             SVG inline
 src/i18n/pt.json  en.json    ─┘  sitemap, 404, JSON-LD             0 KB de JavaScript
                                  injeta SHA e run do CI no rodapé

 dist/ ──▶ CI: check · lint · format · lychee · Lighthouse ──▶ Deploy ──▶ GitHub Pages
```

- **Conteúdo separado da apresentação.** Tudo que é fato (perfil, experiência, certificações,
  projetos) mora em `src/data/` e `src/content/`; textos de interface em `src/i18n/`. Os
  componentes só recebem dados.
- **Uma rota, dois idiomas.** Cada página é identificada por uma `Route` independente de
  idioma (`{ page: 'project', slug: 'ticketops' }`), que vira `/projetos/ticketops/` em PT e
  `/en/projects/ticketops/` em EN. O seletor de idioma, a URL canônica e os `hreflang` saem
  dessa mesma função, então nunca divergem.
- **O build é a primeira barreira.** Frontmatter inválido, chave faltando no `en.json`,
  projeto sem tradução ou arquivo com nome diferente do `slug` quebram o build, não a página
  publicada.

## Decisões técnicas

| Decisão                                             | Por quê                                                                                                              | O que custou                                                                                |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Astro estático, **zero JS** no cliente              | Site rápido (Lighthouse 98–100), funciona com JS desabilitado e não tem nada para quebrar no navegador               | Sem botão de tema: claro/escuro segue o sistema operacional                                 |
| CSS puro com tokens em `:root`                      | Claro/escuro e paleta definidos num só arquivo ([tokens.css](src/styles/tokens.css)); sem framework de UI            | Mais CSS escrito à mão                                                                      |
| Movimento só com CSS nativo                         | O diagrama do TicketOps se desenha com scroll-driven animations e o título faz View Transition entre páginas, sem JS | Navegadores sem suporte veem a versão estática; ambos desligam com `prefers-reduced-motion` |
| Diagrama em SVG feito à mão, não Mermaid            | Mermaid no build exigiria Chromium headless no CI; à mão há controle do traço e das cores por nuvem                  | Editar o diagrama é editar coordenadas                                                      |
| Fontes self-hosted (woff2, subset latino)           | Nenhuma requisição a terceiros, nada de rastreamento                                                                 | Atualizar fonte é trocar arquivo                                                            |
| Imagens Open Graph geradas por script e versionadas | Usam as fontes e cores do site; o build e o CI não precisam de navegador                                             | Rodar `npm run og` ao mudar nome, cargo ou frase                                            |
| Deploy disparado pelo fim do CI (`workflow_run`)    | Só o SHA exato que passou em todas as verificações é publicado                                                       | O deploy espera o CI (~4 min)                                                               |
| lychee checa links do próprio site contra o `dist/` | Uma página nova é verificada no build, antes de existir em produção                                                  | —                                                                                           |
| Rodapé com SHA, data do deploy e link do run        | Cada versão no ar aponta para o commit e o pipeline que a publicaram                                                 | —                                                                                           |

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
| `npm run og`           | Regera as imagens de compartilhamento         |

## Estrutura

```text
scripts/                 geração das imagens Open Graph
public/                  favicon, robots.txt, fontes (com licenças OFL), imagens OG
src/
├── components/          componentes sem lógica de conteúdo
│   └── diagrams/        diagramas de arquitetura em SVG, um por projeto (opcional)
├── content/projects/    um arquivo por projeto, em pt/ e en/
├── content.config.ts    esquema (Zod) dos projetos
├── data/                perfil, experiência, certificações, stack, formação, projetos
├── i18n/                textos de interface (pt.json, en.json) e rotas por idioma
├── layouts/             layout base: head (SEO, OG, hreflang), header e rodapé
├── pages/               / e /projetos/<slug>/ (PT), /en/ e /en/projects/<slug>/ (EN), 404
└── styles/              tokens e estilos globais
```

O `pt.json` é a fonte de verdade dos textos de interface: se faltar uma chave no `en.json`, o
`astro check` falha.

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

Nenhum componente precisa ser alterado: a home, as páginas de detalhe, o sitemap e a auditoria
do Lighthouse incluem o projeto novo automaticamente. O build falha se o projeto existir em um
idioma e não no outro, ou se o nome do arquivo não bater com o `slug`.

## SEO e compartilhamento

- `<title>`, `meta description`, URL canônica e `hreflang` (com `x-default` em PT) em todas as
  páginas, nos dois idiomas.
- Open Graph e Twitter Card com uma imagem 1200×630 por idioma, em `public/og/`, gerada por
  [scripts/og-images.ts](scripts/og-images.ts) a partir do nome, título e frase do hero em
  `src/data/profile.ts`. O script usa o Chrome instalado na máquina (ou `CHROME_PATH`), num
  perfil temporário.
- `sitemap-index.xml` gerado pelo `@astrojs/sitemap` (a 404 fica de fora) e
  [robots.txt](public/robots.txt) apontando para ele.
- JSON-LD `Person` na home, montado só com os dados de `src/data/`.
- Página 404 bilíngue: o GitHub Pages serve o mesmo `404.html` para qualquer endereço
  inexistente, em qualquer idioma.
- Sem analytics, cookies ou rastreadores.

## Pipeline (GitHub Actions)

```text
PR / push ──▶ CI ──────────────────────────────────────────┐
              npm ci → astro check → ESLint → Prettier     │ verde na main?
              → build → lychee (links) → Lighthouse CI     ▼
                                              Deploy ──▶ GitHub Pages
                                              (mesmo commit verificado pelo CI)
```

- [ci.yml](.github/workflows/ci.yml) roda em todo pull request e push. O Lighthouse (mobile)
  falha o job abaixo de 95 em Performance, Accessibility, Best Practices ou SEO, em **todas** as
  páginas do build (inclusive as de projeto e a 404); os limites estão em
  [lighthouserc.json](lighthouserc.json) e os relatórios ficam como artefato do run.
- O lychee checa os links do próprio site (canonical, `hreflang`) contra o `dist/` do build,
  não contra o site no ar, então uma página nova é verificada antes de existir em produção.
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
