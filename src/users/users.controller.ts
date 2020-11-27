
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {
  }

  @Get()
  getAll(): Promise<User[]>{
    return this.userService.getAll()
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User>{
    return this.userService.create(createUserDto)
  }

}
