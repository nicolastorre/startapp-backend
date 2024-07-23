import { Resource } from 'src/authorization/entities/resource.entity';
import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Article {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @OneToOne(() => Resource)
  resource: Resource;
}
