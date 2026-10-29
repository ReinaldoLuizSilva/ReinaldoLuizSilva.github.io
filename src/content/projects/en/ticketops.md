---
slug: ticketops
title: TicketOps
summary: A support-ticket REST API with the application on Google Cloud and the database on Oracle Cloud, provisioned with Terraform and shipped by a pipeline with no credentials in the repository.
status: concluído
stack:
  - FastAPI
  - Docker
  - Cloud Run
  - Oracle Autonomous Database
  - Terraform
  - GitHub Actions
  - Workload Identity Federation
  - Secret Manager
  - Cloud Monitoring
repo: https://github.com/ReinaldoLuizSilva/TicketOps
featured: true
order: 1
diagramDescription: A merge to main triggers GitHub Actions, which authenticates to Google Cloud through Workload Identity Federation, with no service account key. On Google Cloud (us-central1), the API runs on Cloud Run; images live in Artifact Registry, the database wallet and credentials in Secret Manager, logs in Cloud Logging and alerts in Cloud Monitoring. Cloud Run connects over mTLS, using the wallet, to Oracle Autonomous Database on Oracle Cloud (sa-vinhedo-1).
---

<!-- REVIEW(reinaldo): tradução gerada -->

## Problem

TicketOps is a support-ticket API (a mini help desk): customers open tickets, analysts update
their status and comment, and a dashboard endpoint summarizes the workload. The application is
deliberately simple, with three tables and straightforward rules, so that the effort goes into
the infrastructure around it: containers, IaC, the pipeline, secrets management and
observability.

The pipeline's goal: a merge to `main` becomes a published container, with nobody running a
command and not a single Google Cloud credential in the repository.

## Milestones

- **M0–M1:** containerized API and CRUD against a local Oracle database via docker-compose.
- **M2:** Terraform creates Cloud Run, Artifact Registry and Secret Manager, with a dedicated
  runtime service account.
- **M3:** CI/CD with Workload Identity Federation; images are tagged with the commit SHA.
- **M4:** the API writes to Oracle Autonomous Database on OCI over mTLS, with the wallet mounted
  from Secret Manager.
- **M5:** structured JSON logs, two alert policies (5xx responses and service unreachable) and an
  uptime check, all in Terraform.

## Stack and why

- **Cloud Run:** scaling to zero is the whole point of the service; with `cpu_idle`, CPU is only
  billed while requests are being served.
- **Oracle Autonomous Database:** Transaction Processing workload, because this is an OLTP API.
  The `sa-vinhedo-1` region was chosen for proximity to whoever operates the database, not for
  latency.
- **python-oracledb in thin mode, hand-written SQL with bind variables, no ORM:** for performance
  and to keep the database domain explicit. Thin mode removes the need for Oracle Instant Client.
- **Workload Identity Federation:** a service account key is a long-lived credential; with WIF,
  GitHub Actions exchanges a short-lived OIDC token for access to Google Cloud.
- **Oracle Database Free in a container in CI, instead of mocks:** integration tests need a
  disposable database, and a container is exactly that.
- **Email alerts, not Slack:** Slack requires a manual authorization in the console; email stays
  100% in code.

<!-- TODO(reinaldo): the docs don't record why FastAPI, Docker, Terraform and GitHub Actions were chosen; add if you want. -->

## Decisions and trade-offs

- **mTLS with a wallet instead of plain TLS.** Plain TLS would require an IP allowlist, and Cloud
  Run has no fixed egress IP; getting one would need Serverless VPC Access and Cloud NAT, billed
  hourly and outside the Always Free tier. The wallet was the cheapest path.
- **No secret value goes through Terraform.** Writing it through Terraform would leave it in
  plain text in the state. The cost is a two-phase apply whenever a new secret is added.
- **The wallet is mounted as a file, not an environment variable.** As a variable it would show
  up in the service description and count against the variable size limit.
- **Permissions on the resource, never on the project.** The deploy service account does not
  appear in the project's IAM, and the default service account (with `roles/editor`) is not used.
- **`terraform apply` runs outside CI.** If the pipeline applied Terraform, the deploy service
  account could rewrite its own permissions. CI only validates.
- **Terraform defines what the service is; the pipeline defines which image it runs.** The
  deploy only swaps the image, tagged with the commit SHA, never `latest`.
- **`/health` doesn't touch the database, `/ready` does.** A database outage doesn't break the
  deploy, and the pipeline's smoke test checks both.
- **Alerts on error count, not error rate.** With near-zero traffic, an error rate is just noise.

## What I learned

- A clean `terraform plan` doesn't prove the infrastructure can be destroyed: deletion
  protection, on by default, only shows up at `destroy` time.
- A Cloud Run revision can be `Ready` while the database is down. That is what led to the
  `/ready` route and the smoke test that checks it.
- Without `exec` in the Dockerfile's `CMD`, SIGTERM never reaches uvicorn and the connection pool
  is never closed.
- A badly filtered alert simply never fires. The proof was real: the database stopped on purpose
  in the OCI console, and the alert email arrived.
- On Windows, piping in PowerShell 5.1 writes a BOM and CRLF to the file, which is fatal when the
  content is a credential.

## Next steps

- Return 503 for network errors that happen after a connection is taken from the pool.
- Make `GET /chamados/{id}` a single query instead of two.
- Provision the Autonomous Database with Terraform as well, with its own state.
- Move Cloud Run to `southamerica-east1` if the cross-cloud latency becomes a problem.
- Distributed tracing once there is a second service, and SLOs once there is real traffic.

The full documentation, with the pitfalls of each stage, is in the repository (in Portuguese):
[infrastructure](https://github.com/ReinaldoLuizSilva/TicketOps/tree/main/docs/infra),
[CI/CD](https://github.com/ReinaldoLuizSilva/TicketOps/tree/main/docs/cicd),
[Autonomous Database](https://github.com/ReinaldoLuizSilva/TicketOps/tree/main/docs/adb) and
[observability](https://github.com/ReinaldoLuizSilva/TicketOps/tree/main/docs/observabilidade).
