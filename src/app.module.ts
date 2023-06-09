import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersService} from "./services/users/users.service";
import {UsersModule} from "./controllers/users/users.module";
import {MongooseModule} from "@nestjs/mongoose";
import {ToursModule} from "./controllers/tours/tours.module";
import {OrderModule} from "./controllers/order/order.module";



@Module({
  imports: [
    UsersModule,
    ToursModule,
    OrderModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest')],  //mongodb://27017/nest
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
