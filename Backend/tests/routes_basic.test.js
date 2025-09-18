import { getRequest } from './testUtils.js';

// Test Set 1 - Public Endpoints:
// Test 1 - Basic
describe('GET /api', () => {
  it('API is working', async () => {
    // Test against the running server (like Chrome)
    const res = await getRequest().get('/api');

    console.log('Full route/URL:', res.request.url);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('API is working');
  });
});