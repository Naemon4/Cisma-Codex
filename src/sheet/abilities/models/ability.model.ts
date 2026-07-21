import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sheet } from '../../models/sheet.model';

@Table({ tableName: 'abilities' })
export class Ability extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: true, })
  declare body: string;

  @Column({ type: DataType.STRING, allowNull: true, })
  declare roll: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare checkbox: boolean;

  @ForeignKey(() => Sheet)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare sheetId: number;

  @BelongsTo(() => Sheet)
  declare sheet: Sheet;
}
