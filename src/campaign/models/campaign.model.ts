import { Table, Column, Model, DataType } from 'sequelize-typescript';
 
@Table({ tableName: 'campaign' })
export class Campaign extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;
 
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;
 
  @Column({ type: DataType.STRING, allowNull: true, })
  declare notes: string;
 
}