import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Connection } from '../../auth/entities/connection.entity';
import { Role } from '../../authorization/Role.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
