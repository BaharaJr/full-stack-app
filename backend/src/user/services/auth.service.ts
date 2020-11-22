import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { AuthDto } from '../DTO/auth-credentials.dto';
import { User } from '../entities/user.entity';
@EntityRepository(User)
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async register(authDto: AuthDto): Promise<User> {
    const user = new User();
    Object.keys(authDto).forEach((key) => {
      user[key] = authDto[key];
    });
    try {
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async getUsers() {
    const users = await this.userRepository.find();
    return { users: users };
  }
  async editUser(id: any, auth: AuthDto) {
    const { firstname, lastname } = auth;
    const user = await this.userRepository.findOne({ uid: id });
    if (lastname) {
      user.lastname = lastname;
    }
    if (firstname) {
      user.firstname = firstname;
    }
    const userSaved = await this.userRepository.save(user);
    return userSaved;
  }
  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ uid: id });
    if (user) {
      await this.userRepository.delete(user.id);
      return {
        statusCode: 200,
        message: `User ${user.firstname} deleted successfully`,
      };
    } else {
      throw new NotFoundException(`User with ID ${id} is not available`);
    }
  }
  async getUser(id: string): Promise<any> {
    const user = await this.userRepository.findOne({ uid: id });
    return user;
  }
}
