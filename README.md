# Cisma Codex

Plataforma para centralizar mesas de RPG de forma gratuita e open-source. Reúne fichas de personagem, rolagem de dados, anotações de mestre e jogadores em um só lugar.

---

## Stack

- **Backend**: NestJS + TypeScript
- **Banco de dados**: PostgreSQL
- **ORM**: Sequelize (`sequelize-typescript`)

---

## Pré-requisitos

- Node.js
- PostgreSQL rodando localmente (ou em um servidor)

---

## Instalação

```bash
# Instalar dependências
npm install

# Copiar e preencher as variáveis de ambiente
cp .env.example .env
```

Preencha o `.env` com os dados da sua conexão Postgres:
```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_NAME=cisma_codex
```

```bash
# Rodar em modo desenvolvimento
npm run start:dev
```

O banco e as tabelas são criados automaticamente na primeira execução (via `ensure-database` + `synchronize`).

---

## Estrutura do projeto

```
src/
  database/
    database.module.ts        # Conexão com o PostgreSQL
    ensure-database.ts        # Cria o banco automaticamente se não existir
  user/
    models/user.model.ts
    user.module.ts
    user.controller.ts
    user.service.ts
  sheet/                      # Módulo principal de fichas
    models/sheet.model.ts
    sheet.module.ts
    abilities/
    attributes/
    dice-rolls/
    markers/
    notes/
    resources/
    settings/
    skills/
    statuses/
  app.module.ts
  main.ts
```

Para detalhes sobre cada sub-módulo da ficha (campos, tipos, relações), consulte [`sheet/ficha-submodulos.md`](./sheet/ficha-submodulos.md).

---

## Módulos

### Usuário (`/user`)
CRUD de usuários + autenticação (login/logout).

### Ficha (`/sheet`)
Entidade raiz que representa a ficha de um personagem. Cada ficha pertence a um usuário e pode conter:

| Sub-módulo | Descrição |
|---|---|
| `abilities` | Habilidades com descrição e rolagem atrelada |
| `attributes` | Atributos do personagem (normal ou duplo) |
| `dice-rolls` | Histórico de rolagens (limite de 50 por ficha) |
| `markers` | Marcadores visuais com ícone, cor e quantidade |
| `notes` | Anotações livres de mestre e jogadores |
| `resources` | Fracionáveis como vida e pontos de energia |
| `settings` | Configuração visual da ficha (colunas ou abas) |
| `skills` | Perícias com cálculo de bônus total automático |
| `statuses` | Checkboxes de status (ex: Envenenado, Atordoado) |