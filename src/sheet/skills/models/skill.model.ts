import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sheet } from '../../models/sheet.model';

@Table({ tableName: 'skills' })
export class Skill extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "New Skill" })
  declare title: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare baseBonus: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare secondBonus: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare otherBonus: number;

  @Column({
    type: DataType.VIRTUAL, get() {
      const self = this as Skill;
      return self.baseBonus + self.secondBonus + self.otherBonus;
    }
  })
  declare totalBonus: number;

  @ForeignKey(() => Sheet)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare sheetId: number;

  @BelongsTo(() => Sheet)
  declare sheet: Sheet;
}