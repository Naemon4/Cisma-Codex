import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sheet } from '../../models/sheet.model';

@Table({ tableName: 'markers' })
export class Marker extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "New Marker" })
  declare title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare hexColor: string; // hex, ex: "#C8860A"

  @Column({ type: DataType.STRING, allowNull: false })
  declare icon: string; // classe tabler, ex: "ti-shield"

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare maxQuantity: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare currentQuantity: number;

  @ForeignKey(() => Sheet)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare sheetId: number;

  @BelongsTo(() => Sheet)
  declare sheet: Sheet;
}
