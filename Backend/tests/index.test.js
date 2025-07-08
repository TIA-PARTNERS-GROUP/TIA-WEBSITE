const request = require('supertest');
const app = require('../routes/index');

describe('GET /api', () => {
  it('should return hello message', async () => {
    const res = await request(app).get('/api');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello from the backend!');
  });
});
