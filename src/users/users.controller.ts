
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {
  }

  @Get()
  getAll(): Promise<IUser[]>{
    return this.userService.getAll()
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<IUser>{
    return this.userService.create(createUserDto, [])
  }

  @Delete(':id')
  removeById(@Param('id') id: string): Promise<IUser>{
    return this.userService.removeById(id)
  }
}
