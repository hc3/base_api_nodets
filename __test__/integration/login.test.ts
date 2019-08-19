import { createConnection } from 'typeorm';
import executeRequest from './executeRequest';

const user = {
    email:'name@mail.com',
    password:'novasenha',
    username:'userTest'
};

const userNotExist = {
    email:'name_not_exist@mail.com',
    password:'102030',
    username:'userTestNotExist'
};

beforeAll(async (done) => {
    await createConnection();
    done();
})

test('[AUTH] @Post login(@Body)', async (done) => {
    const response = await executeRequest('post','/auth/login',user);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    done();
})

test('[AUTH] @Post login(@Body)', async (done) => {
    const response = await executeRequest('post','/auth/login',userNotExist);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('ERROR AO REALIZAR LOGIN');
    expect(response.body.name).toBe('BadRequestError');
    done();
})