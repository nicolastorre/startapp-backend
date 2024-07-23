import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Connection } from '../../auth/entities/connection.entity';
import { Permission, Role } from 'src/authorization/entities/permission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword?: string;

  @OneToMany(() => Connection, (connection) => connection.user, {
    eager: false,
  })
  connections: Connection[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => Permission, (permission) => permission.user, {
    eager: false,
    nullable: true,
  })
  permissions: Permission[];
}
