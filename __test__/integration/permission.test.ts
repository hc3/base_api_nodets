import { createConnection, getCustomRepository } from "typeorm"
import { PermissionRepository } from "../../src/repository/PermissionRepository";
import app from '../../src/app'
import supertest = require("supertest");

let token:string;

beforeAll(async (done) => {
    await createConnection()
    let repository = await getCustomRepository(PermissionRepository)
    repository.delete({})

    const response = await supertest(app).post('/auth/login').send({email:'name@mail.com',password:'novasenha'})
    token = response.body;

    done()
})

test('[PERMISSION] @Get List()', async (done) => {
    const response = await supertest(app).get('/permissions').set('Authorization',token)
    expect(response.status).toBe(404)
    done()
})

test('[PERMISSION] @Get Insert(body) [ sucesso ]', async (done) => {
    const permission = { name:'ADMIN_CAN_CREATE', isEnabled:true }
    const response = await supertest(app).post('/permissions').set('Authorization',token).send(permission)
    expect(response.status).toBe(200)
    done()
})

test('[PERMISSION] @Get Insert(body) [ error ]', async (done) => {

    done()
})

test('[PERMISSION] @Get List()', async (done) => {

    done()
})

test('[PERMISSION] @Get List()', async (done) => {

    done()
})

test('[PERMISSION] @Get List()', async (done) => {

    done()
})