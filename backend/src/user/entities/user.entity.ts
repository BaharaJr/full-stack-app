import { customUID } from 'src/core/helpers/generate-uid.helper';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  uid: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @OneToMany(() => Task, (tasks) => tasks.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];
  @BeforeInsert()
  beforInsertEntityCoreProps() {
    this.uid = customUID();
  }
}
