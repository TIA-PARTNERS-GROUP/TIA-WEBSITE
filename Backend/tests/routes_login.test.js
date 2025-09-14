import request from 'supertest';

let validToken = ''; // Store the real token from login

// Test 2 - Login
describe('POST /api/auth/login', () => {
  it('should login a user successfully', async () => {
    const loginData = {
      email: 'test@example.com',  // Use real credentials from your DB
      password: 'password123'
    };

    const res = await request('http://localhost:5000')
      .post('/api/auth/login')
      .send(loginData);

    console.log('Full route/URL:', res.request.url);

    if (res.statusCode === 200) {
      validToken = res.body.token;  // Store the real token
    }

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful');
    expect(res.body).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', async () => {
    const loginData = {
      email: 'wrong@example.com',
      password: 'wrongpassword'
    };

    const res = await request('http://localhost:5000')
      .post('/api/auth/login')
      .send(loginData);

    console.log('Full route/URL:', res.request.url);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid email or password');
  });
});

// Test 3 - Token Refresh
describe('POST /api/auth/refresh', () => {
  it('should refresh the token successfully', async () => {
    const res = await request('http://localhost:5000')
      .post('/api/auth/refresh')
      .set('Cookie', 'refreshToken=validtoken');  // Use a real refresh token if available

    console.log('Full route/URL:', res.request.url);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Refresh successful');
    expect(res.body).toHaveProperty('token');
  });
});

// Test 4 - Logout
describe('POST /api/auth/logout', () => {
  it('should logout the user successfully', async () => {
    const res = await request('http://localhost:5000')
      .post('/api/auth/logout')
      .set('Cookie', 'refreshToken=validtoken');  // Use a real refresh token

    console.log('Full route/URL:', res.request.url);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Successfully logged out');
  });
});

