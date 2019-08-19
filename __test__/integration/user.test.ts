import { UserRepository } from '../../src/repository/UserRepository';
import { getCustomRepository, createConnection } from 'typeorm';
import executeRequest from './executeRequest';

const user = {
    firstName:'nameTest',
    lastName:'lastTest',
    email:'name@mail.com',
    username:'userTest',
    password:'102030'
}

let userId:string;

beforeAll(async (done) => {
    await createConnection();
    let repository = await getCustomRepository(UserRepository);
    repository.delete({});
    done();
})

test('[USER] @Get List()', async (done) => {
    const response = await executeRequest('get','/users',null);
    expect(response.charset).toBe("utf-8");
    expect(response.status).toBe(200);
    done();
})

test('[USER] @Post insert(body) [ sucesso ]', async (done) => {
    const response = await executeRequest('post','/users',user);
    expect(response.body.id).not.toBeNull();
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.email).toBe(user.email);
    expect(response.body.username).toBe(user.username);
    expect(response.body.isEnabled).toBe(true);
    expect(response.body.lasLoginAt).not.toBeNull();
    expect(response.status).toBe(200);
    userId = response.body.id;
    done();
})

test('[USER] @Post insert(body) [ error ]', async (done) => {
    const response = await executeRequest('post','/users',user);
    expect(response.body.httpCode).toBe(400);
    expect(response.body.message).toBe("Usuário já existe!");
    expect(response.body.name).toBe("BadRequestError");
    done();
})


test('[USER] @Get findOne(id)', async (done) => {
    const response = await executeRequest('get',`/users/${userId}`,null);
    expect(response.body.id).not.toBeNull();
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.email).toBe(user.email);
    expect(response.body.username).toBe(user.username);
    expect(response.body.isEnabled).toBe(true);
    expect(response.body.lasLoginAt).not.toBeNull();
    expect(response.status).toBe(200);
    done();
})

test('[USER] @Put update(id)', async (done) => {
    const response = await await executeRequest('put',`/users/${userId}`,{firstName:'alterado'})
    expect(response.body.id).not.toBeNull();
    expect(response.body.firstName).toBe('alterado');
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.email).toBe(user.email);
    expect(response.body.username).toBe(user.username);
    expect(response.body.isEnabled).toBe(true);
    expect(response.body.lasLoginAt).not.toBeNull();
    expect(response.status).toBe(200);
    done();
})

test('[USER] @Put changePassword(body)', async (done) => {
    const updatedUser = {
        email:user.email,
        oldPassword:user.password,
        newPassword:'novasenha'
    }
    const response = await executeRequest('put',`/users/change-password/${userId}`,updatedUser)
    expect(response.body.id).not.toBeNull();
    expect(response.body.firstName).toBe('alterado');
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.email).toBe(user.email);
    expect(response.body.username).toBe(user.username);
    expect(response.body.isEnabled).toBe(true);
    expect(response.body.lasLoginAt).not.toBeNull();
    expect(response.status).toBe(200);
    done();
})