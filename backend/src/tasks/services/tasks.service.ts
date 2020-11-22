import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../DTO/create-task.dto';
import { TasksFilterDto } from '../DTO/tasksfilter.dto';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../interfaces/tasks.status-enum';

@EntityRepository(Task)
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllTasks(tasksFilterDto: TasksFilterDto): Promise<any> {
    const { state, search } = tasksFilterDto;
    const query = this.taskRepository.createQueryBuilder('task');
    if (state) {
      query.andWhere('task.state=:state', { state });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return { tasks: tasks };
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ uid: id });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTasks(createTaskDto: CreateTaskDto): Promise<Task> {
    const { userId } = createTaskDto;
    const task = new Task();
    Object.keys(createTaskDto).forEach((key) => {
      task[key] = createTaskDto[key];
    });
    task.user = userId;
    const taskSaved = await this.taskRepository.save(task);
    const returnedTask = await this.getTaskById(taskSaved.uid);
    return returnedTask;
  }

  async deleteOneTask(id: string): Promise<any> {
    const found = await this.taskRepository.delete({ uid: id });
    if (found.affected === 0) {
      throw new NotFoundException(`Can not delete task with ID ${id} `);
    }
    return {
      statusCode: 200,
      message: `Task with ID ${id} deleted successfully`,
    };
  }

  async updateTaskStatus(id: string, state: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.state = state;
    await this.taskRepository.save(task);
    return task;
  }

  async updateTask(id: string, updateTaskDTO): Promise<Task> {
    const task = await this.getTaskById(id);
    Object.keys(updateTaskDTO).forEach((key) => {
      task[key] = updateTaskDTO[key];
    });
    await this.taskRepository.save(task);
    return task;
  }
  async findUser(user: any) {
    const userId = (await this.userRepository.findOne({ uid: user.id })).id;
    return userId;
  }
}
