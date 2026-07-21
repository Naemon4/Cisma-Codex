# Módulo Ficha (Sheet)

A `Sheet` é a entidade raiz do sistema: representa a ficha de um personagem dentro de uma
mesa/campanha. Todos os sub-módulos abaixo são "filhos" dela — cada linha de cada sub-entidade
pertence exclusivamente a uma única ficha (relação 1-N, com FK `sheetId` no lado da sub-entidade).
Não existe catálogo compartilhado entre fichas (ver decisão de arquitetura registrada no
histórico do projeto).

Convenção usada nas tabelas abaixo: toda sub-entidade tem `id` (PK, auto-increment) e `sheetId`
(FK, not null) — por isso essas duas colunas não são repetidas em cada tabela, só citadas uma vez aqui.

---

## `sheet` — Ficha (raiz)

| coluna | tipo | obrigatório | descrição |
|---|---|---|---|
| id | integer (PK, auto-increment) | sim | |
| name | string | sim | Nome da ficha/personagem |
| userId | integer (FK → users) | sim | Dono da ficha |

---

## `dice-rolls` — Rolagem de dados

Cobre as três variações de regra de rolagem do mapa mental num modelo só, diferenciadas pela coluna `type`.

| coluna | tipo | obrigatório | descrição |
|---|---|---|---|
| name | string | sim | Nome da rolagem (ex: "Ataque", "Teste de Furtividade") |
| type | enum('success_count', 'keep', 'sum') | sim | Qual das 3 regras essa rolagem usa |
| dice | string | sim | Dado usado (ex: "d6", "d20") |
| quantity | integer | sim | Quantidade de dados rolados |
| bonus | integer | sim, default 0 | Bônus somado ao resultado |
| critical | integer | não | Valor considerado crítico (usado em `success_count` e `keep`) |
| criticalMargin | integer | não | Margem do crítico |
| successThreshold | integer | não | Valor mínimo pra contar como sucesso — só usado quando `type = success_count` |
| keepMode | enum('highest', 'lowest') | não | Mantém maior ou menor — só usado quando `type = keep` |
| keepAmount | integer | não | Quantos resultados manter — só usado quando `type = keep` |

> Os campos marcados "não obrigatório" só se aplicam a alguns dos 3 tipos. Se preferir, dá pra
> separar em 3 tabelas (uma por tipo) em vez de uma tabela com colunas opcionais — mais
> "correto" no sentido relacional, mas mais arquivos pra manter. Fica a seu critério.

---

## `statuses` — Checkbox de status

| coluna | tipo | obrigatório | descrição |
|---|---|---|---|
| name | string | sim | Nome do status (ex: "Envenenado", "Atordoado") |
| active | boolean | sim, default false | Estado do checkbox |

---

## `abilities` — Habilidades

| coluna | tipo | obrigatório | descrição |
|---|---|---|---|
| name | string | sim | Nome da habilidade |
| description | text | sim | Descrição da habilidade |
| diceRollId | integer (FK → dice-rolls) | não | Rolagem atrelada a essa habilidade, se houver |

---

## `settings` — Configurações

> Diferente dos outros, normalmente só existe **uma linha de settings por ficha** (não várias) —
> a relação ainda é com FK simples, só que na prática funciona como 1-1. Se preferir, pode validar
> isso na camada de aplicação (service) em vez de uma constraint de banco.

| coluna | tipo | obrigatório | descrição |
|---|---|---|---|
| structureType | enum('columns', 'tabs') | sim | Como a ficha é organizada visualmente |
| columns | integer | não | Número de colunas, se `structureType = columns` |
| tabs | integer | não | Número de abas, se `structureType = tabs` |

---

## `resources` — Fracionáveis (vida, PE, etc.)

| coluna | tipo | obrigatório | descrição |
|---|---|---|---|
| name | string | sim | Nome do recurso (ex: "Vida", "Pontos de Energia") |
| color | string | sim | Cor de exibição (hex, ex: `#D85A30`) |
| min | integer | sim | Valor mínimo |
| max | integer | sim | Valor máximo |
| current | integer | sim | *(sugestão — não estava no mapa mental)* Valor atual, pra acompanhar o uso durante a sessão |

---

## `markers` — Marcadores

| coluna | tipo | obrigatório | descrição |
|---|---|---|---|
| name | string | sim | *(sugestão)* Nome do marcador, pra identificar o que ele representa |
| color | string | sim | Cor de exibição (hex) |
| icon | string | sim | Identificador do ícone |
| maxQuantity | integer | sim | Quantidade máxima de marcações |
| currentQuantity | integer | sim | *(sugestão)* Quantidade atual marcada |

---

## `attributes` — Atributos

| coluna | tipo | obrigatório | descrição |
|---|---|---|---|
| name | string | sim | Nome do atributo (ex: "Força") |
| value | integer | sim, default 0 | Valor do atributo |
| type | enum('normal', 'double') | sim, default 'normal' | Se o atributo é normal ou duplo |

*(já implementado em `attributes/models/attribute.model.ts`)*

---

## `skills` — Perícias

| coluna | tipo | obrigatório | descrição |
|---|---|---|---|
| name | string | sim | Nome da perícia |
| attributeId | integer (FK → attributes) | sim | Atributo relacionado |
| baseBonus | integer | sim, default 0 | Bônus base |
| bonus | integer | sim, default 0 | Bônus |
| otherBonus | integer | sim, default 0 | Bônus de outras fontes |
| total | integer | calculado | Soma de `baseBonus + bonus + otherBonus` (mais o valor do atributo relacionado). Recomendo calcular isso no service em vez de guardar no banco, pra nunca ficar desincronizado — mas se preferir cachear, dá pra guardar como coluna normal também. |

---

## `notes` — Anotações

| coluna | tipo | obrigatório | descrição |
|---|---|---|---|
| content | text | sim | Conteúdo da anotação |
| authorId | integer (FK → users) | não | *(sugestão — não estava no mapa mental)* Quem escreveu a anotação, já que tanto mestre quanto jogadores podem anotar na mesma ficha |

---

## Padrão de implementação

Cada sub-módulo segue a mesma receita:
1. Model próprio em `sheet/<sub-modulo>/models/<nome>.model.ts`, com FK `sheetId` e `@BelongsTo(() => Sheet)`
2. No `Sheet`, o lado inverso da relação via `@HasMany(() => <Entidade>)`
3. Cada model registrado no respectivo módulo via `SequelizeModule.forFeature([...])`
4. O `SheetModule` importa todos os 9 sub-módulos