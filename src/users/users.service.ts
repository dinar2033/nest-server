import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import * as _ from 'lodash'

import { CreateUserDto } from './dto/create-user.dto'
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private UserModel: Model<IUser>){}

  private users = []

  async getAll(): Promise<IUser[]> {
    return this.UserModel.find().exec()
  }

  async findByLogin(login: string): Promise<IUser> {
    return await this.UserModel.findOne({ login }).exec();
  }

  async create(createUserDto: CreateUserDto, roles: Array<string>): Promise<IUser> {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(createUserDto.password, salt)
    const newUser = new this.UserModel(_.assignIn(createUserDto, { password: hash, roles }))
    return await newUser.save()
  }

  async removeById(id: string): Promise<IUser> {
    return this.UserModel.findByIdAndRemove(id)
  }


}