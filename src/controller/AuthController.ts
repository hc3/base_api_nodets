import { JsonController, Post, Body } from "routing-controllers";
import { AuthService } from '../service/AuthService';

@JsonController('/auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ) {}

    @Post('/login')
    public login(@Body() user:any) {
        return this.authService.login(user);
    }
}