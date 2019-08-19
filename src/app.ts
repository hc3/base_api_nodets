import 'reflect-metadata'
import dotenv from 'dotenv'
import {createExpressServer, useContainer, Action} from "routing-controllers"
import Container from 'typedi'
import { useContainer as useContainerTypeORM } from 'typeorm'

dotenv.config()
useContainer(Container)
useContainerTypeORM(Container)

const app = createExpressServer({
    controllers:[`${__dirname}/controller/*.ts`],
    middlewares:[`${__dirname}/middleware/*.ts`],
    authorizationChecker: async(action:Action) => {
        console.log('authorization',action.request.params)
        return true;
    }
})

export default app
