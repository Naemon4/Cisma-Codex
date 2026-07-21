import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sheet } from '../../models/sheet.model';

@Table({ tableName: 'dice_rolls' })
export class DiceRoll extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare formula: string;

  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: false })
  declare results: number[];

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare total: number;

  @ForeignKey(() => Sheet)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare sheetId: number;

  @BelongsTo(() => Sheet)
  declare sheet: Sheet;
}
