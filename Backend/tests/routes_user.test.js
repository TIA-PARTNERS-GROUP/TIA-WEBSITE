import { getRequest, setupAuthTest, getUserData } from './testUtils.js';

let validToken = '';
let userId = '';
let userData = {};

// Helper function to get valid token (run auth login first)
beforeAll(async () => {
  validToken = (await setupAuthTest()).validToken;
  userData = await getUserData();
});

// Test Set 4 - User Endpoints

// Test 1 - GET /users/exists/{email}
describe('GET /api/users/exists/:email', () => {
  it('should return true if user exists', async () => {
    const res = await getRequest()
      .get(`/api/users/exists/${userData.email}`)
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'User exists');
    expect(res.body).toHaveProperty('exists', true);
  });

  it('should return false if user does not exist', async () => {
    const res = await getRequest()
      .get('/api/users/exists/nonexistent@example.com')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'User does not exist');
    expect(res.body).toHaveProperty('exists', false);
  });
});

// Test 2 - GET /users/me
describe('GET /api/users/me', () => {
  it('should retrieve authenticated user profile successfully', async () => {
    const res = await getRequest()
      .get('/api/users/me')
      .set('Authorization', `Bearer ${validToken}`);

    userId = res.body.data.id;  // Store for later tests
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('firstName', userData.firstName);
    expect(res.body.data).toHaveProperty('lastName', userData.lastName);
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .get('/api/users/me');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authorization header missing');
  });

  it('should return 403 for invalid token', async () => {
    const res = await getRequest()
      .get('/api/users/me')
      .set('Authorization', 'Bearer invalidtoken');

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token');
  });
});

// Test 3 - GET /users/{id}
// NOTES: FIXED BUGS IN CONTROLLER FOR :id
describe('GET /api/users/:id', () => {
  it('should retrieve user details by ID successfully', async () => {
    console.log('Using userId:', userId);
    const res = await getRequest()
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id', userId);
    expect(res.body.data).toHaveProperty('firstName');
    expect(res.body.data).toHaveProperty('lastName');
  });

  it('should return 404 if user not found', async () => {
    const res = await getRequest()
      .get('/api/users/99999')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .get(`/api/users/${userId}`);

    expect(res.statusCode).toBe(401);
  });
});