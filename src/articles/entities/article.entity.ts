import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.uuid)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
