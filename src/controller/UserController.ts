import {JsonController, Get, Post, Body, Put, Param, Authorized} from "routing-controllers";
import {UserService} from '../service/UserService';

@JsonController('/users')
export class UserController {
    
    constructor(
        private userService: UserService
    ) { }

    @Get()
    public list() {
        return this.userService.list();
    }

    @Post()
    public insert(@Body() user:any) {
        return this.userService.insert(user);
    }

    @Put('/:id')
    public update(@Param('id') id:string, @Body() user:any) {
        return this.userService.update(id, user);
    }

    @Authorized()
    @Get('/:id')
    public findOne(@Param('id') id:string) {
        return this.userService.findOne(id);
    }

    @Put('/change-password')
    public changePassword(@Body({required:true}) request:any) {
        return this.userService.changePassword(request);
    }
}