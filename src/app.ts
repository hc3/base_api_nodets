import 'reflect-metadata';
import dotenv from 'dotenv';
import {createExpressServer, useContainer, Action} from "routing-controllers";
import Container from 'typedi';
import { createConnection, useContainer as useContainerTypeORM } from 'typeorm';

dotenv.config();
useContainer(Container);
useContainerTypeORM(Container);

createConnection({
    "name":process.env.DB_NAME,
    "type":"postgres",
    "host":process.env.DB_HOST,
    "port":Number(process.env.DB_PORT),
    "username":process.env.DB_USERNAME,
    "password":process.env.DB_PASSWORD,
    "database":process.env.DB_DATABASE,
    "synchronize": true,
    "logging": false,
    "entities": [`${__dirname}/modules/models/*.ts`]
});

export default createExpressServer({
    controllers:[`${__dirname}/modules/controllers/*.ts`],
    authorizationChecker: async(action:Action) => {
        console.log('authorization',action);
        return true;
    }
});