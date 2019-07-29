import {JsonController, Get} from "routing-controllers";
import {UserService} from '../user/UserService';

@JsonController('/users')
export class UserController {
    
    constructor(
        private userService: UserService
    ) { }

    @Get()
    public list() {
        return this.userService.find();
    }
}