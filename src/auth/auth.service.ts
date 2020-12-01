import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { SignOptions } from 'jsonwebtoken';
import moment from 'moment';

import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { roleEnum } from 'src/users/enums/role.enum';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { CreateUserTokenDto } from './../token/dto/create-user-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ){}

  async singUp(createUserDto: CreateUserDto){
    const user = await this.userService.create(createUserDto, [roleEnum.kursant])
    await this.sendConfirmation(user)
    return true
  }

  async sendConfirmation(user: IUser) {
    const expiresIn = 60 * 60 * 24;  // 24 hours
    const tokenPayload = {
      _id: user._id,
      roles: user.role,
    };
    const expireAt = moment()
      .add(1, 'day')
      .toISOString();

    const token = await this.generateToken(tokenPayload, {expiresIn});    
    await this.saveToken({ token, uId: user._id, expireAt});  
  }

  private async generateToken(data, options?: SignOptions) : Promise<string>{
    return this.jwtService.sign(data, options)
  }

  // singIn(login, password){

  // }

  async confirm(token: string): Promise<IUser>{
    const data = await this.verifyToken(token);
    const user = await this.userService.getById(data._id);

    await this.tokenService.delete(data._id, token);
    if (user) {
      return user.save();
    }
    throw new BadRequestException('Confirmation error');
  }

  private async verifyToken(token): Promise<any>{
    try {
      const data = this.jwtService.verify(token);
      const tokenExists = this.tokenService.exists(data._id, token);
      if(tokenExists){
        return data;
      }
      throw new UnauthorizedException();
    } catch (err) {
      throw new UnauthorizedException();
    }
  
  }

  private async saveToken(createUserTokenDto: CreateUserTokenDto){
    const userToken = await this.tokenService.create(createUserTokenDto);
    return userToken;
  }


}
