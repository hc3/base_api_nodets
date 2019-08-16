import * as express from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({type:'before'})
export class SecurityMiddleware implements ExpressMiddlewareInterface {

    public use(req: express.Request, res: express.Response, next: express.NextFunction):any {
        console.log('to no security')
        console.log('req: ',req)
        console.log('res: ',res)
        console.log('next: ',next)
        return next()
    }
}