import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { configModule } from './configure.root';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://dinar:dinarech@products.6jkeg.mongodb.net/product?retryWrites=true&w=majority`),
    configModule,
    UsersModule,
    TokenModule,
    AuthModule,
  ],
})
export class AppModule {}
