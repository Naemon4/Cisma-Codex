// Uso: node scripts/generate-model.js <pasta-do-submodulo> <NomeDaClasse> <nome_da_tabela>
// Exemplo: node scripts/generate-model.js dice-rolls DiceRoll dice_rolls
//
// Gera src/sheet/<pasta-do-submodulo>/models/<nome-em-kebab>.model.ts já com
// id, sheetId (FK) e @BelongsTo(() => Sheet) prontos. Só falta você adicionar
// os campos específicos daquele sub-módulo (ver ficha-submodulos.md).

const fs = require('fs');
const path = require('path');

const [folderName, className, tableName] = process.argv.slice(2);

if (!folderName || !className || !tableName) {
  console.error('Uso: node scripts/generate-model.js <pasta> <NomeDaClasse> <nome_tabela>');
  process.exit(1);
}

const kebabName = className
  .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  .toLowerCase();

const outDir = path.join('src', 'sheet', folderName, 'models');
const outPath = path.join(outDir, `${kebabName}.model.ts`);

if (fs.existsSync(outPath)) {
  console.error(`Já existe: ${outPath}`);
  process.exit(1);
}

const template = `import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sheet } from '../../models/sheet.model';

@Table({ tableName: '${tableName}' })
export class ${className} extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  // TODO: adicionar os campos específicos desse sub-módulo aqui
  // (consultar ficha-submodulos.md pra ver as colunas esperadas)

  @ForeignKey(() => Sheet)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare sheetId: number;

  @BelongsTo(() => Sheet)
  declare sheet: Sheet;
}
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, template);
console.log(`Criado: ${outPath}`);
console.log(`Não esquece de:`);
console.log(`  1. Preencher os campos específicos (TODO no arquivo)`);
console.log(`  2. Adicionar @HasMany(() => ${className}) no sheet.model.ts`);
console.log(`  3. Registrar o model no módulo via SequelizeModule.forFeature([${className}])`);