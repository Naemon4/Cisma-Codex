import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sheet } from '../../models/sheet.model';

@Table({ tableName: 'statuses' })
export class Status extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "New status" })
  declare title: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare isActive: boolean;

  @ForeignKey(() => Sheet)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare sheetId: number;

  @BelongsTo(() => Sheet)
  declare sheet: Sheet;
}
