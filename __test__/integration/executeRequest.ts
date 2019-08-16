import app from '../../src/app'
import supertest = require("supertest");

export default async (verb:string, path:string, data:any) => {
    if(!data) return await (<any>supertest(app))[verb](path)
    return await (<any>supertest(app))[verb](path).send(data)
}