import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  refreshToken: string;

  @Column({ default: () => "NOW() + interval '1 year'" })
  expirationDate: Date;

  @Column({ default: () => 'NOW()' })
  datetime: Date;

  @ManyToOne(() => User, (user) => user.connections, { cascade: ['remove'] })
  user: User;
}
