import request from 'supertest';

let validToken = '';
let refreshToken = '';
const userData = {
  email: `test${Date.now()}@example.com`,  // Use unique email to avoid duplicates
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe'
};

// Test Set 2 - Auth Endpoints:
// Test 1 - Register (Signup)
describe('POST /api/auth/signup', () => {
  it('should register a new user successfully', async () => {
    const res = await request('http://localhost:5000')
      .post('/api/auth/signup')
      .send(userData);

    console.log('Full route/URL:', res.request.url);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(userData.email);
  });

  // BUG: Expects duplicate users
  it('should return 409 for duplicate email', async () => {
    const duplicateUserData = {
      email: userData.email,  // Use the outer userData
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe'
    };

    const res = await request('http://localhost:5000')
      .post('/api/auth/signup')
      .send(duplicateUserData);

    console.log('Full route/URL:', res.request.url);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Email already in use');
    // Remove email check for 409, as it's not typically returned
  });
});

// Test 2 - Login
describe('POST /api/auth/login', () => {
  it('should login a user successfully', async () => {
    const loginData = {
      email: userData.email,
      password: userData.password,
    };

    const res = await request('http://localhost:5000')
      .post('/api/auth/login')
      .send(loginData);

    console.log('Full route/URL:', res.request.url);

    if (res.statusCode === 200) {
      validToken = res.body.token;

      const cookies = res.headers['set-cookie'];
      if (cookies) {
        const refreshCookie = cookies.find(cookie => cookie.startsWith('refreshToken='));
        if (refreshCookie) {
          refreshToken = refreshCookie.split('=')[1].split(';')[0];
        }
      }
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
      .set('Cookie', `refreshToken=${refreshToken}`);

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
      .set('Cookie', `refreshToken=${refreshToken}`);

    console.log('Full route/URL:', res.request.url);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Successfully logged out');
  });
});