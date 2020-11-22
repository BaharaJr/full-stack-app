import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { TaskStatus } from '../interfaces/tasks.status-enum';

export class TasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.OPEN])
  state: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  search: string;
}
