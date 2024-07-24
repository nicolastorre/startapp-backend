import { Resource } from 'src/authorization/entities/resource.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @OneToOne(() => Resource)
  resource: Resource;
}
