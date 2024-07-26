import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  type: string;

  @OneToMany(() => Permission, (permission) => permission.resource, {
    cascade: true,
  })
  permissions: Permission[];
}
