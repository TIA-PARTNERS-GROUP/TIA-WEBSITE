import request from 'supertest';
import app from '../app.js';

// Test Set 1 - Public Endpoints:
// Test 1 - Basic
describe('GET /api', () => {
  it('API is working', async () => {
    // Test against the running server (like Chrome)
    const res = await request('http://localhost:5000').get('/api');

    console.log('Full route/URL:', res.request.url);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('API is working');
  });
});