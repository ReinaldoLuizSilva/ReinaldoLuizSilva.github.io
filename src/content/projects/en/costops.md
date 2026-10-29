---
slug: costops
title: CostOps
summary: Multicloud cost inventory and analysis (Azure, GCP and OCI), with automated collection, scheduled reports and anomaly alerts.
status: em planejamento
stack:
  - Python
  - Terraform
  - GitHub Actions
repo: https://github.com/ReinaldoLuizSilva/CostOps
featured: false
order: 2
---

<!-- REVIEW(reinaldo): tradução gerada -->

## Problem

Multicloud, multi-client environments make simple questions hard to answer: which resources
exist, how much each one costs, what grew from one month to the next and what is sitting idle.
Each provider has its own console and billing format, and consolidating them is usually manual.

CostOps will automate that collection and centralize the result. Development is planned to
start after October 2026.

## Idea

- Collect resource inventory and cost data from the three providers through their APIs and SDKs.
- Normalize everything into a common model: provider, account, service, resource, tags, cost and
  period.
- Keep the history to compare periods.
- Produce a consolidated report and alert on unexpected variation.
- Run on a schedule, with no manual steps.

## Planned stack

- **Collection:** Python, with the official Azure, GCP and OCI SDKs.
- **Sources:** Azure Resource Graph and Cost Management, GCP Asset Inventory and Billing, OCI
  Usage API.
- **Infrastructure:** Terraform.
- **Automation:** GitHub Actions, on a schedule.
- **Storage and reporting:** to be decided.

## Next steps

- **M0:** scope, common data model and authentication strategy.
- **M1:** a collector for one provider running locally.
- **M2:** collectors for the other providers, plus normalization.
- **M3:** storage and history.
- **M4:** consolidated report.
- **M5:** scheduled runs and Terraform infrastructure.
- **M6:** cost anomaly alerts.
