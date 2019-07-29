import supertest from 'supertest';
import app from '../app';

test('[GET] /', async () => {
    const res = await supertest(app).get("/");
    expect(res.text).toBe("Hello ts-node");
})