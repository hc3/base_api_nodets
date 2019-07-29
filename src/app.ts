import {createExpressServer} from "routing-controllers";
import UserController from './modules/user/UserController';

export default createExpressServer({
    controllers:[UserController]
});