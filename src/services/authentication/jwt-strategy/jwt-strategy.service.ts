import { Injectable } from '@nestjs/common';
import {Strategy} from "passport-local";
import {ExtractJwt} from "passport-jwt";
import {jwtConstants} from "../../../static/private/constants";
import {PassportStrategy} from "@nestjs/passport";

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {

    constructor() {
        super ({
            jwtFromRequest: ExtractJwt. fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        console.log('payload', payload)
        return { userId: payload.sub, username: payload.username};
    }
}
