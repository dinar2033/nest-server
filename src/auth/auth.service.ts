import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { SignOptions } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'
import * as _ from 'lodash';
import * as moment from 'moment';

import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { roleEnum } from 'src/users/enums/role.enum';
import { IReadableUser } from 'src/users/interfaces/readable-user.interface';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { CreateUserTokenDto } from './../token/dto/create-user-token.dto';
import { SignInDto } from './dto/signin.dto';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { userSensitiveFieldsEnum } from 'src/users/enums/protected-fields.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ){}

  async signUp(createUserDto: CreateUserDto){
    const user = await this.userService.create(createUserDto, [roleEnum.kursant])
    // await this.sendConfirmation(user)
    const expiresIn = 60 * 60 * 24;  // 24 hours
    const tokenPayload = {
      _id: user._id,
      roles: user.role,
    };
    const expireAt = moment().add(1, 'day').toISOString();

    const token = await this.generateToken(tokenPayload, {expiresIn});    
    await this.saveToken({ token, uId: user._id, expireAt});
    return true
  }

  // async sendConfirmation(user: IUser) {
  //   const expiresIn = 60 * 60 * 24;  // 24 hours
  //   const tokenPayload = {
  //     _id: user._id,
  //     roles: user.role,
  //   };
  //   const expireAt = moment().add(1, 'day').toISOString();

  //   const token = await this.generateToken(tokenPayload, {expiresIn});    
  //   await this.saveToken({ token, uId: user._id, expireAt});  
  // }

  private async generateToken(data: ITokenPayload, options?: SignOptions) : Promise<string>{
    return this.jwtService.sign(data, options)
  }

  async signIn({ login, password }: SignInDto): Promise<IReadableUser>{
    const user = await this.userService.findByLogin(login);
    if(user && (await bcrypt.compare(password, user.password))){
      const tokenPayload: ITokenPayload = {
        _id: user._id,
        roles: user.role
      }
      const token = await this.generateToken(tokenPayload);
      // const expireAt = moment().add(1, 'day').toISOString();
    
      // await this.saveToken({
      //   token,
      //   expireAt,
      //   uId: user._id
      // });
      const readableUser = user.toObject() as IReadableUser;
      readableUser.accessToken = token;
      
      return _.omit<any>(readableUser, Object.values(userSensitiveFieldsEnum)) as IReadableUser;
    }
    throw new BadRequestException('Invalid credintials')
  }

  // async confirm(token: string): Promise<IUser>{
  //   const data = await this.verifyToken(token);
  //   const user = await this.userService.getById(data._id);

  //   await this.tokenService.delete(data._id, token);
  //   if (user) {
  //     return user.save();
  //   }
  //   throw new BadRequestException('Confirmation error');
  // }

  // private async verifyToken(token): Promise<any>{
  //   try {
  //     const data = this.jwtService.verify(token) as ITokenPayload;
  //     const tokenExists = this.tokenService.exists(data._id, token);
  //     if(tokenExists){
  //       return data;
  //     }
  //     throw new UnauthorizedException();
  //   } catch (err) {
  //     throw new UnauthorizedException();
  //   }
  
  // }

  private async saveToken(createUserTokenDto: CreateUserTokenDto){
    const userToken = await this.tokenService.create(createUserTokenDto);
    return userToken;
  }


}
