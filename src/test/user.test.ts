import supertest from 'supertest';
import app from '../app';

const user = {
    firstName:'nameTest',
    lastName:'lastTest',
    email:'name@mail.com',
    username:'userTest',
    password:'102030'
}

test('[USER] @Get List()', async () => {
    const res = await supertest(app).get('/users');
    expect(res.charset).toBe("utf-8");
})

test('[USER] @Post insert(body)', async () => {
    const response = await supertest(app).post('/users').send(user);
    expect(response.body.id).toBe(String);
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.email).toBe(user.email);
    expect(response.body.username).toBe(user.username);
    expect(response.body.isEnabled).toBe(true);
    expect(response.body.lasLoginAt).toBe(Date);
})