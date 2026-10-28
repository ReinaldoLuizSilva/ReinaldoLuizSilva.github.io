# Portfólio — Reinaldo Luiz da Silva

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
| Qualidade     | `astro check`, ESLint, Prettier                      |
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
├── content/projects/    um arquivo por projeto, em pt/ e en/
├── data/                perfil, experiência, certificações, stack, formação
├── i18n/                textos de interface (pt.json, en.json) e utilitários
├── layouts/
├── pages/               rotas: / (PT) e /en/ (EN)
└── styles/              tokens e estilos globais
```

Todo conteúdo vem de `src/data` e `src/content`; textos de interface vêm de `src/i18n`. O
`pt.json` é a fonte de verdade: se faltar uma chave no `en.json`, o `astro check` falha.

## Documentação do projeto

- [CLAUDE.md](CLAUDE.md) — requisitos, conteúdo, design aprovado e plano de milestones
- [GLOSSARY.md](GLOSSARY.md) — vocabulário usado no site e no código
