import { Body, Controller, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { IReadableUser } from 'src/users/interfaces/readable-user.interface';
import { AuthService } from './auth.service';
// import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { SignInDto } from './dto/signin.dto';

@ApiTags('authentication')
@Controller('authentication')
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
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<string> {
    return this.authService.signIn(signInDto);
  }

  @Post('/deleteToken')
  async deleteToken(uId: string, token: string): Promise<boolean> {
    return this.authService.deleteToken(uId, token);
  }

  @Post('/deleteAllTokens')
  async deleteAllTokens(@Param('uId') uId: string): Promise<{ ok?: number, n?: number}> {
    return this.authService.deleteAllTokens(uId);
  }
}
