import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { sanitizeResponseObject } from 'src/core/helpers/transform-id-uid.helper';
import { AuthDto } from '../DTO/auth-credentials.dto';
import { User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';

@Controller('api/users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async register(@Body() authDto: AuthDto): Promise<User> {
    const user = await this.authService.register(authDto);
    return sanitizeResponseObject(user);
  }
  @Get()
  async findAll(): Promise<any> {
    const users = await this.authService.getUsers();
    return sanitizeResponseObject(users);
  }
  @Put('/:id')
  async editUser(@Body() auth: AuthDto, @Param('id') id: string): Promise<any> {
    const user = await this.authService.editUser(id, auth);
    return sanitizeResponseObject(user);
  }
  @Get('/:id')
  async getOneUser(@Param('id') id: string): Promise<any> {
    const user = await this.authService.getUser(id);
    return sanitizeResponseObject(user);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.authService.deleteUser(id);
  }
}
