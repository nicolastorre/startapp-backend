import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeUpdate,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  refreshToken: string;

  @Column({
    type: 'timestamp',
    default: () => "NOW() + interval '1 year'",
  })
  expirationDate: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.connections, { cascade: ['remove'] })
  user: User;

  @BeforeUpdate()
  addOneYearToExpirationDate() {
    const currentDate = new Date();
    this.expirationDate = new Date(
      currentDate.setFullYear(currentDate.getFullYear() + 1),
    );
  }

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updatedAt = new Date();
  }
}
