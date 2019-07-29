import {JsonController, Get} from "routing-controllers";
import UserService from './UserService';

@JsonController('/users')
export default class UserController {

    constructor(private userService:UserService) {}

    @Get()
    public list() {
        return this.userService.list();
    }
}