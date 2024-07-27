import { Resource } from 'src/authorization/entities/resource.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @OneToOne(() => Resource, { cascade: true, eager: true })
  @JoinColumn()
  resource: Resource;
}
