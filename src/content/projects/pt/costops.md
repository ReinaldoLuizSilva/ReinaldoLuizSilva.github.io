---
slug: costops
title: CostOps
summary: Inventário e análise de custos multicloud (Azure, GCP e OCI), com coleta automatizada, relatórios agendados e alertas de anomalia.
status: em planejamento
stack:
  - Python
  - Terraform
  - GitHub Actions
repo: https://github.com/ReinaldoLuizSilva/CostOps
featured: false
order: 2
---

<!-- Fonte: README do repositório CostOps. Atualizar o status quando o código começar. -->

## Problema

Ambientes multicloud e com vários clientes dificultam responder perguntas simples: quais
recursos existem, quanto cada um custa, o que cresceu de um mês para o outro e o que está
ocioso. Cada provedor tem o próprio console e formato de faturamento, e a consolidação costuma
ser manual.

O CostOps vai automatizar essa coleta e centralizar o resultado. O desenvolvimento está previsto
para começar depois de outubro de 2026.

## Ideia

- Coletar o inventário de recursos e os dados de custo dos três provedores via API e SDK.
- Normalizar tudo num modelo comum: provedor, conta, serviço, recurso, tags, custo e período.
- Guardar o histórico para comparar períodos.
- Gerar um relatório consolidado e alertar quando houver variação fora do esperado.
- Rodar de forma agendada, sem intervenção manual.

## Stack pretendida

- **Coleta:** Python, com os SDKs oficiais de Azure, GCP e OCI.
- **Fontes:** Azure Resource Graph e Cost Management, GCP Asset Inventory e Billing, OCI Usage
  API.
- **Infraestrutura:** Terraform.
- **Automação:** GitHub Actions, com execução agendada.
- **Persistência e relatório:** a definir.

## Próximos passos

- **M0:** escopo, modelo de dados comum e estratégia de autenticação.
- **M1:** coletor de um provedor rodando localmente.
- **M2:** coletores dos demais provedores e normalização.
- **M3:** persistência e histórico.
- **M4:** relatório consolidado.
- **M5:** execução agendada e infraestrutura em Terraform.
- **M6:** alertas de anomalia de custo.
