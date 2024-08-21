import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resource } from './resource.entity';
import { User } from '../../user/entities/user.entity';
import { Role } from '../Role.enum';
import { Action } from '../Action.enum';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'enum',
    enum: Action,
    default: Action.READ,
  })
  action: Action;

  @Column({ type: 'json', nullable: true })
  conditions?: string;

  @ManyToOne(() => User, (user) => user.connections, {
    cascade: ['remove'],
    nullable: true,
  })
  user: User;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @ManyToOne(() => Resource, (resource) => resource.permissions)
  resource?: Resource;
}
