import supertest from 'supertest';
import app from '../app';

test('[GET - USERS] /users', async () => {
    const res = await supertest(app).get('/users');
    expect(res.text).toBe("Hello ts-node");
})