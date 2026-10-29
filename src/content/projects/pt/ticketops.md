---
slug: ticketops
title: TicketOps
summary: API REST de chamados de suporte com a aplicação no Google Cloud e o banco na Oracle Cloud, provisionada com Terraform e publicada por um pipeline sem nenhuma credencial no repositório.
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
diagramDescription: Um merge na main dispara o GitHub Actions, que se autentica no Google Cloud por Workload Identity Federation, sem chave de service account. No Google Cloud (us-central1), a API roda no Cloud Run; as imagens ficam no Artifact Registry, a wallet e as credenciais do banco no Secret Manager, os logs no Cloud Logging e os alertas no Cloud Monitoring. O Cloud Run conecta por mTLS, usando a wallet, ao Oracle Autonomous Database na Oracle Cloud (sa-vinhedo-1).
---

<!-- REVIEW(reinaldo): texto escrito a partir da documentação do repositório TicketOps (README e docs/). -->

## Problema

O TicketOps é uma API de chamados de suporte (um mini-helpdesk): clientes abrem chamados,
analistas atualizam o status e comentam, e um endpoint de dashboard resume o atendimento. A
aplicação é deliberadamente simples, com três tabelas e regras diretas, para que o esforço
fique na infraestrutura em volta dela: containers, IaC, pipeline, gestão de segredos e
observabilidade.

A meta do pipeline: um merge na `main` vira um container publicado, sem ninguém rodar comando
e sem uma única credencial do Google Cloud no repositório.

## Entregas por milestone

- **M0–M1:** API em container e CRUD contra um Oracle local via docker-compose.
- **M2:** Terraform cria Cloud Run, Artifact Registry e Secret Manager, com uma service account
  de runtime dedicada.
- **M3:** CI/CD com Workload Identity Federation; a imagem é marcada com o SHA do commit.
- **M4:** a API passa a gravar no Oracle Autonomous Database, na OCI, por mTLS, com a wallet
  montada a partir do Secret Manager.
- **M5:** logs estruturados em JSON, duas políticas de alerta (respostas 5xx e serviço
  inalcançável) e uptime check, tudo em Terraform.

## Stack e por quê

- **Cloud Run:** escalar a zero é o argumento do serviço; com `cpu_idle`, a CPU só é cobrada
  durante as requisições.
- **Oracle Autonomous Database:** workload Transaction Processing, porque é uma API OLTP. A
  região `sa-vinhedo-1` foi escolhida pela proximidade de quem opera o banco, não por latência.
- **python-oracledb em modo thin, com SQL escrito à mão e bind variables, sem ORM:** por
  desempenho e para manter o domínio de banco explícito. O modo thin dispensa o Oracle Instant
  Client.
- **Workload Identity Federation:** chave de service account é credencial de longa duração; com
  WIF, o GitHub Actions troca um token OIDC de curta duração por acesso ao Google Cloud.
- **Oracle Database Free em container no CI, em vez de mock:** teste de integração precisa de
  um banco descartável, e o container é exatamente isso.
- **Alertas por e-mail, não Slack:** o Slack exige autorização manual pela console; o e-mail fica
  100% em código.

<!-- TODO(reinaldo): os docs não registram por que FastAPI, Docker, Terraform e GitHub Actions; adicionar se quiser. -->

## Decisões e trade-offs

- **mTLS com wallet em vez de TLS simples.** O TLS simples exigiria liberar o acesso por IP, e o
  Cloud Run não tem IP de saída fixo; ter um exigiria Serverless VPC Access e Cloud NAT, cobrados
  por hora e fora do Always Free. A wallet foi o caminho mais barato.
- **Nenhum valor de segredo passa pelo Terraform.** Gravar o valor pelo Terraform o deixaria em
  texto claro no state. O custo é um apply em duas fases quando entra um segredo novo.
- **Wallet montada como arquivo, não como variável de ambiente.** Como variável, ela apareceria
  na descrição do serviço e contaria no limite de tamanho das variáveis.
- **Permissões no recurso, nunca no projeto.** A service account de deploy não aparece no IAM
  do projeto, e a service account padrão (com `roles/editor`) não é usada.
- **`terraform apply` fora do CI.** Se o pipeline aplicasse o Terraform, a service account de
  deploy poderia reescrever as próprias permissões. O CI só valida.
- **O Terraform define como o serviço é; o pipeline define qual imagem ele roda.** O deploy troca
  apenas a imagem, marcada pelo SHA do commit, nunca `latest`.
- **`/health` não toca o banco, `/ready` toca.** Assim o banco fora do ar não derruba o deploy, e
  o smoke test do pipeline checa os dois.
- **Alerta por contagem de erros, não por taxa.** Com tráfego perto de zero, taxa de erro é ruído.

## O que aprendi

- Um `terraform plan` limpo não prova que a infraestrutura é destruível: a proteção contra
  exclusão ativada por padrão só aparece na hora do `destroy`.
- Uma revisão do Cloud Run pode estar `Ready` com o banco fora do ar. Foi isso que levou à rota
  `/ready` e ao smoke test que a verifica.
- Sem `exec` no `CMD` do Dockerfile, o SIGTERM não chega ao uvicorn e o pool de conexões não é
  fechado.
- Um alerta mal filtrado simplesmente nunca dispara. A prova foi real: banco parado de propósito
  na console da OCI e e-mail de alerta recebido.
- No Windows, o pipe do PowerShell 5.1 grava BOM e CRLF no arquivo, o que é fatal quando o
  conteúdo é uma credencial.

## Próximos passos

- Tratar como 503 os erros de rede que acontecem depois de obter a conexão do pool.
- Fazer o `GET /chamados/{id}` com uma query em vez de duas.
- Provisionar o Autonomous Database também com Terraform, com state próprio.
- Mover o Cloud Run para `southamerica-east1` se a latência entre as nuvens incomodar.
- Tracing distribuído quando houver um segundo serviço, e SLOs quando houver tráfego real.

A documentação completa, com as armadilhas de cada etapa, está no repositório:
[infraestrutura](https://github.com/ReinaldoLuizSilva/TicketOps/tree/main/docs/infra),
[CI/CD](https://github.com/ReinaldoLuizSilva/TicketOps/tree/main/docs/cicd),
[Autonomous Database](https://github.com/ReinaldoLuizSilva/TicketOps/tree/main/docs/adb) e
[observabilidade](https://github.com/ReinaldoLuizSilva/TicketOps/tree/main/docs/observabilidade).
