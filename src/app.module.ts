import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule, 
    MongooseModule.forRoot(`mongodb+srv://dinar:dinarech@products.6jkeg.mongodb.net/products?retryWrites=true&w=majority`)],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
