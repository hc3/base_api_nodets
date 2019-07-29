import 'reflect-metadata';
import {createExpressServer, useContainer} from "routing-controllers";
import {UserController} from './modules/user/UserController';
import Container from 'typedi';

useContainer(Container);

export default createExpressServer({
    controllers:[UserController]
});