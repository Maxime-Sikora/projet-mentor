import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './interface/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async createUser({
    firstName,
    lastName,
    email,
    password,
  }: CreateUserDto): Promise<UserEntity> {
    const passwordHash = await hash(password, 10);
    return this.userRepository.save({
      firstName,
      lastName,
      email,
      passwordHash,
    });
  }

  async findOne(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({
      email,
    });
  }
}
