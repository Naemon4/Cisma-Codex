import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sheet } from '../../models/sheet.model';

@Table({ tableName: 'resources' })
export class Resource extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, defaultValue: "New resource" })
  declare title: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare max: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare min: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "#898989" })
  declare hexColor: string;

  @ForeignKey(() => Sheet)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare sheetId: number;

  @BelongsTo(() => Sheet)
  declare sheet: Sheet;
}
