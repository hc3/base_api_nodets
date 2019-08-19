import * as express from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import jwt from 'express-jwt'

@Middleware({type:'before'})
export class SecurityMiddleware implements ExpressMiddlewareInterface {

    public use(req: express.Request, res: express.Response, next: express.NextFunction):any {
        return jwt({
            userProperty:process.env.DB_JWT_USERPROPERTY,
            secret:process.env.DB_JWT_SECRET as string,
            credentialsRequired:false,
            issuer:process.env.DB_JWT_ISSUER,
            audience:process.env.DB_JWT_AUDIENCE,
            isRevoked: (req, payload, done) => {
                console.log('req: ',req)
                console.log('payload: ',payload)
                console.log('done: ',done);
            },
            getToken: function fromHeaderOrQueryString(req) {
                let authorization = req.header('authorization') as string;
                if (/^bearer /i.test(authorization)) {
                    return authorization.split(" ")[1];
                } else if (req.query && req.query.token) {
                    return req.query.token;
                }
                return null;
            }
        })
        .unless({
            path:['/login','change-password']
        })(req, res, next);
    }
}