import supertest from 'supertest';
import app from '../app';

const user = {
    firstName:'nameTest',
    lastName:'lastTest',
    email:'name@mail.com',
    username:'userTest',
    password:'102030'
}

let userId:string;

beforeAll(async () => {
    console.log('before all');
})

test('[USER] @Get List()', async (done) => {
    const res = await supertest(app).get('/users');
    expect(res.charset).toBe("utf-8");
    done();
})

test('[USER] @Post insert(body)', async (done) => {
    const response = await supertest(app).post('/users').send(user);
    expect(response.body.id).not.toBeNull();
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.email).toBe(user.email);
    expect(response.body.username).toBe(user.username);
    expect(response.body.isEnabled).toBe(true);
    expect(response.body.lasLoginAt).not.toBeNull();
    userId = response.body.id;
    done();
})

test('[USER] @Get findOne(id)', async (done) => {
    const response = await supertest(app).get(`/users/${userId}`);
    expect(response.body.id).not.toBeNull();
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.email).toBe(user.email);
    expect(response.body.username).toBe(user.username);
    expect(response.body.isEnabled).toBe(true);
    expect(response.body.lasLoginAt).not.toBeNull();
    done();
})

test('[USER] @Put update(id)', async (done) => {
    const response = await supertest(app).put(`/users/${userId}`).send({firstName:'alterado'})
    expect(response.body.id).not.toBeNull();
    expect(response.body.firstName).toBe('alterado');
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.email).toBe(user.email);
    expect(response.body.username).toBe(user.username);
    expect(response.body.isEnabled).toBe(true);
    expect(response.body.lasLoginAt).not.toBeNull();
    done();
})