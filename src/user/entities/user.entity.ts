import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Connection } from '../../auth/entities/connection.entity';

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
}
