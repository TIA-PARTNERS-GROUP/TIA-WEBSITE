import request from 'supertest';

// Test Set 2 - Auth Endpoints:
// Test 1 - Register (Signup)
describe('POST /api/auth/signup', () => {
  it('should register a new user successfully', async () => {
    const userData = {
      email: `test${Date.now()}@example.com`,  // Use unique email to avoid duplicates
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe'
    };

    const res = await request('http://localhost:5000')
      .post('/api/auth/signup')
      .send(userData);

    console.log('Full route/URL:', res.request.url);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(userData.email);
  });

  // BUG: Excepts duplicate users
  it('should return 409 for duplicate email', async () => {
    const userData = {
      email: 'existing@example.com',  // Use an email that exists in your DB
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe'
    };

    const res = await request('http://localhost:5000')
      .post('/api/auth/signup')
      .send(userData);

    console.log('Full route/URL:', res.request.url);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Email already in use');
  });
});