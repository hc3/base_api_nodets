import { createConnection, getCustomRepository } from "typeorm"
import { PermissionRepository } from "../../src/repository/PermissionRepository";
import executeRequest from './executeRequest';
// const permission = {

// }

// let permissionId:number

beforeAll(async (done) => {
    await createConnection()
    let repository = await getCustomRepository(PermissionRepository)
    repository.delete({})
    done()
})

test('[PERMISSION] @Get List()', async (done) => {
    const response = await executeRequest('get','/permissions',null)
    expect(response.status).toBe(200)
    done()
})

test('[PERMISSION] @Get Insert(body) [ sucesso ]', async (done) => {
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