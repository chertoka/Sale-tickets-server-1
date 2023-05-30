import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {User} from "../../schemas/user";
import {UserDto} from "../../dto/user-dto";
import { AuthGuard} from "@nestjs/passport";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}


    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }


    @Get(":id")
    getUserById(@Param('id') id): Promise<User> {
        return this.userService.getUserById(id);
    }
    //@UseGuards(JwtAuthGuard)
    @Post()
    sendUser(@Body() data: UserDto): Promise<User> {

        return this.userService.checkRegUser(data.login).then((queryRes) => {
            console.log('data reg', queryRes)
            if (queryRes.length === 0) {
                return this.userService.sendUser(data);
            } else {
                console.log('err - user is exists')
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    errorText: 'Пользователь уже зарегистрирован',
                }, HttpStatus.CONFLICT);
            }
        });
    }

    @UseGuards(AuthGuard('local'))
    @Post(":login")
    authUser(@Body() data: UserDto, @Param('login') login): any {
        return this.userService.login(data);
    }


    @Put(":id")
    updateUsers(@Param('id') id, @Body() data) : Promise<User> {
        return this.userService.updateUsers(id, data);
    }

    @Delete()
    deleteUsers(): Promise<User> {
        return this.userService.deleteUsers();
    }


    @Delete(":id")
    deleteUserById(@Param('id') id): Promise<User> {
        return this.userService.deleteUserById(id);
    }

}

/** до практики 2
 import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
 import {UsersService} from "../../services/users/users.service";
 import {User} from "../../schemas/user";

 @Controller('users')
 export class UsersController {
    constructor(private userService: UsersService) {
    }


    @Get()
    getAllUsers(): Promise<User[]> {
       return this.userService.getAllUsers();
    }

    @Get(":id")
    getUserById(@Param('id') id): Promise<User> {
        return this.userService.sendUser(id);
    }

    @Post()
    sendUser(@Body() data): Promise<User> {
        return this.userService.sendUser(data);
    }


    @Post(":login")
    authUser(@Body() data: any, @Param('login') login): any{
        return this.userService.login(data);
    }

    @Put(":id")
    updateUsers(@Param('id') id, @Body() data): Promise<User> {
        return this.userService.updateUsers(id, data);
    }

    @Delete()
    deleteUsers(): Promise<User> {
        return this.userService.deleteUsers();
    }

    @Delete(":id")
    deleteUser(@Param('id') id): Promise<User> {
        return this.userService.deleteUser(id);
    }

   }

 **/

