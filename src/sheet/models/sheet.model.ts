import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Attribute } from '../attributes/models/attribute.model';

@Table({ tableName: 'sheets' })
export class Sheet extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @HasMany(() => Attribute)
  declare attributes: Attribute[];

  // Conforme for criando os outros 8 sub-módulos, adiciona o HasMany correspondente aqui
  // seguindo o mesmo padrão do Attribute acima:
  //
  // @HasMany(() => DiceRoll) declare diceRolls: DiceRoll[];
  // @HasMany(() => Status) declare statuses: Status[];
  // @HasMany(() => Ability) declare abilities: Ability[];
  // @HasMany(() => Setting) declare settings: Setting[];
  // @HasMany(() => Resource) declare resources: Resource[];
  // @HasMany(() => Marker) declare markers: Marker[];
  // @HasMany(() => Skill) declare skills: Skill[];
  // @HasMany(() => Note) declare notes: Note[];
}