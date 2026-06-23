import { Table, Column, Model, DataType } from 'sequelize-typescript';
 
@Table({ tableName: 'user' })
export class User extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;
 
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;
 
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;
 
  // Sempre salve aqui o HASH da senha (bcrypt/argon2), nunca texto puro
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;
}