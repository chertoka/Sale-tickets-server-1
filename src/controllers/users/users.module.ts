import { Module } from '@nestjs/common';
import {UsersController} from "./users.controller";
import {UsersService} from "../../services/users/users.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../../schemas/user";
import {AuthService} from "../../services/authentication/auth/auth.service";
import {jwtConstants} from "../../static/private/constants";
import {register} from "tsconfig-paths";
import {JwtStrategyService} from "../../services/authentication/jwt-strategy/jwt-strategy.service";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";


@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}],),
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
            })],

    controllers: [UsersController],
    providers: [UsersService, AuthService, JwtStrategyService]
})
export class UsersModule {}
