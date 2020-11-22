import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { sanitizeResponseObject } from 'src/core/helpers/transform-id-uid.helper';
import { CreateTaskDto } from '../DTO/create-task.dto';
import { TasksFilterDto } from '../DTO/tasksfilter.dto';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../interfaces/tasks.status-enum';
import { TaskStatusValidation } from '../pipes/task-status.validation.pipe';
import { TasksService } from '../services/tasks.service';
@Controller('api/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getTasks(
    @Query(ValidationPipe) tasksFilterDto: TasksFilterDto,
  ): Promise<any> {
    const tasks = await this.taskService.getAllTasks(tasksFilterDto);
    return sanitizeResponseObject(tasks);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const task = await this.taskService.getTaskById(id);
    return sanitizeResponseObject(task);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.taskService.findUser(createTaskDto.userId);
    createTaskDto.userId = user;
    const task = await this.taskService.createTasks(createTaskDto);
    return sanitizeResponseObject(task);
  }

  @Delete('/:id')
  async deleteOneTask(@Param('id') id: string) {
    const task = await this.taskService.deleteOneTask(id);
    return sanitizeResponseObject(task);
  }

  @Patch('/:id/state')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('state', TaskStatusValidation) state: TaskStatus,
  ): Promise<Task> {
    const task = await this.taskService.updateTaskStatus(id, state);
    return sanitizeResponseObject(task);
  }
  @Put('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body('task') task: string,
  ): Promise<Task> {
    const updatedTask = await this.taskService.updateTask(id, task);
    return sanitizeResponseObject(updatedTask);
  }
}
