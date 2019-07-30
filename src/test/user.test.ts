import supertest from 'supertest';
import app from '../app';

test('[GET - USERS] /users', async () => {
    const rest = await supertest(app).get('/users');
    
})