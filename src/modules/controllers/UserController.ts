import {JsonController, Get, Post, Body, Put, Param, Authorized} from "routing-controllers";
import {UserService} from '../user/UserService';

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
}