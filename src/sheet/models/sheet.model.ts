import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Attribute } from '../attributes/models/attribute.model';
import { Ability } from '../abilities/models/ability.model';
import { DiceRoll } from '../dice-rolls/models/dice-roll.model';
import { Marker } from '../markers/models/marker.model';
import { Note } from '../notes/models/note.model';
import { Resource } from '../resources/models/resource.model';
import { Setting } from '../settings/models/setting.model';
import { Skill } from '../skills/models/skill.model';
import { Status } from '../statuses/models/status.model';

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

  @HasMany(() => Ability) declare abilities: Ability[];
  @HasMany(() => Attribute) declare attributes: Attribute[];
  @HasMany(() => DiceRoll) declare diceRolls: DiceRoll[];
  @HasMany(() => Marker) declare markers: Marker[];
  @HasMany(() => Note) declare notes: Note[];
  @HasMany(() => Resource) declare resources: Resource[];
  @HasMany(() => Setting) declare settings: Setting[];
  @HasMany(() => Skill) declare skills: Skill[];
  @HasMany(() => Status) declare statuses: Status[];
}