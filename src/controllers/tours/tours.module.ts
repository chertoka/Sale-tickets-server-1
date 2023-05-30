import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Tour, TourSchema} from "../../schemas/tour";
import {ToursService} from "../../services/tours/tours.service";
import {jwtConstants} from "../../static/private/constants";
import {JwtStrategyService} from "../../services/authentication/jwt-strategy/jwt-strategy.service";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

@Module({
  controllers: [ToursController],
  imports: [MongooseModule.forFeature([{name: Tour.name, schema: TourSchema}]),
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret
  })],
  providers: [ToursService, JwtStrategyService]
})
export class ToursModule {}
