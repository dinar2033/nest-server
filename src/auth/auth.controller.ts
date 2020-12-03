import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IReadableUser } from 'src/users/interfaces/readable-user.interface';
import { AuthService } from './auth.service';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { SignInDto } from './dto/signin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('/signUp')
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<boolean> {
    return this.authService.signUp(createUserDto);
  }

  // @Get('/confirm')
  // async confirm(@Query(new ValidationPipe()) query: ConfirmAccountDto): Promise<boolean> {
  //   await this.authService.confirm(query.token);
  //   return true
  // }

  @Post('/signIn')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
    return this.authService.signIn(signInDto);
  }

}
