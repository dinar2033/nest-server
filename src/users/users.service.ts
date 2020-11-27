import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>){
  }

  private users = []

  async getAll(): Promise<User[]> {
    return this.UserModel.find().exec()
  }

  async getById(id: string): Promise<User> {
    return this.UserModel.findById(id)
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.UserModel(userDto)
    return newUser.save()
  }

  async remove(id: string): Promise<User> {
    return this.UserModel.findByIdAndRemove(id)
  }
}