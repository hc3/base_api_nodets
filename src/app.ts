import 'reflect-metadata';
import {createExpressServer, useContainer} from "routing-controllers";
import Container from 'typedi';
import { createConnection, useContainer as useContainerTypeORM } from 'typeorm';

useContainer(Container);
useContainerTypeORM(Container);

createConnection({
    "name":"default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "root",
    "database": "baseDB",
    "synchronize": true,
    "logging": false,
    "entities": [`${__dirname}/modules/models/*.ts`]
});

export default createExpressServer({
    controllers:[`${__dirname}/modules/controllers/*.ts`]
});