import { customUID } from 'src/core/helpers/generate-uid.helper';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { TaskStatus } from '../interfaces/tasks.status-enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  state: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User[];
  @BeforeInsert()
  beforInsertEntityCoreProps() {
    this.uid = customUID();
    this.state = TaskStatus.OPEN;
  }
}
