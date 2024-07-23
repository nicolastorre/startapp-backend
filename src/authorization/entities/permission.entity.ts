import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resource } from './resource.entity';
import { User } from 'src/user/entities/user.entity';

export enum Actions {
  READ = 'READ',
  WRITE = 'WRITE',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  PUBLISH = 'PUBLISH',
}

export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  AUTHOR = 'AUTHOR',
  CONTRIBUTOR = 'CONTRIBUTOR',
  USER = 'USER',
}

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'enum',
    enum: Actions,
    default: Actions.READ,
  })
  action: Actions;

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
  resource: Resource;
}
