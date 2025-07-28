import request from 'supertest';
import app from '../app.js';

describe('GET /api', () => {
  it('API is working', async () => {
    const res = await request(app).get('/api');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('API is working');
  });
});