import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sheet } from '../../models/sheet.model';

@Table({ tableName: 'attributes' })
export class Attribute extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "New Attribute" })
  declare title: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare value: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare doubleValue: number;

  @Column({ type: DataType.ENUM('normal', 'double'), allowNull: false, defaultValue: 'normal' })
  declare type: 'normal' | 'double';

  @ForeignKey(() => Sheet)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare sheetId: number;

  @BelongsTo(() => Sheet)
  declare sheet: Sheet;
}