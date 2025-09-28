import { getRequest, setupPostTest } from './testUtils.js';

let validToken = '';
let userId = '';
let postId = '';

// Helper function to get valid token and create a test post
beforeAll(async () => {
  const setup = await setupPostTest();
  validToken = setup.validToken;
  userId = setup.userId;
  postId = setup.postId;
});

// Test Set 5 - Posts Endpoints

// Test 1 - GET /users/myposts
describe('GET /api/users/myposts', () => {
  it('should retrieve posts by authenticated user successfully', async () => {
    const res = await getRequest()
      .get('/api/users/myposts')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('posts');
    expect(Array.isArray(res.body.posts)).toBe(true);
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .get('/api/users/myposts');

    expect(res.statusCode).toBe(401);
  });
});

// Test 2 - POST /users/addpost
describe('POST /api/users/addpost', () => {
  it('should add a new post successfully', async () => {
    const postData = {
      title: 'New Test Post',
      date: new Date().toISOString(),
      content: 'New test content',
      status: 'published'
    };
    const res = await getRequest()
      .post('/api/users/addpost')
      .set('Authorization', `Bearer ${validToken}`)
      .send(postData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('postId');
  });

  it('should return 400 for missing required fields', async () => {
    const invalidData = { title: 'Test' };  // Missing date, content, status
    const res = await getRequest()
      .post('/api/users/addpost')
      .set('Authorization', `Bearer ${validToken}`)
      .send(invalidData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing required fields');
  });

  it('should return 400 for invalid status', async () => {
    const invalidData = {
      title: 'Test',
      date: new Date().toISOString(),
      content: 'Test',
      status: 'invalid'
    };
    const res = await getRequest()
      .post('/api/users/addpost')
      .set('Authorization', `Bearer ${validToken}`)
      .send(invalidData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Status must be draft or published');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .post('/api/users/addpost')
      .send({ title: 'Test', date: new Date().toISOString(), content: 'Test', status: 'draft' });

    expect(res.statusCode).toBe(401);
  });
});

// Test 3 - POST /users/publishpost
describe('POST /api/users/publishpost', () => {
  it('should publish a post successfully', async () => {
    const res = await getRequest()
      .post('/api/users/publishpost')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: postId });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Successfully published post');
  });

  it('should return 400 for missing required fields', async () => {
    const res = await getRequest()
      .post('/api/users/publishpost')
      .set('Authorization', `Bearer ${validToken}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing required fields');
  });

  it('should return 404 for post not found or not owned by user', async () => {
    const res = await getRequest()
      .post('/api/users/publishpost')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: 99999 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No post with that id');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .post('/api/users/publishpost')
      .send({ id: postId });

    expect(res.statusCode).toBe(401);
  });
});

// Test 4 - DELETE /users/removepost
describe('DELETE /api/users/removepost', () => {
  it('should remove a post successfully', async () => {
    const res = await getRequest()
      .delete('/api/users/removepost')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: postId });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Post deleted');
  });

  it('should return 400 for missing required fields', async () => {
    const res = await getRequest()
      .delete('/api/users/removepost')
      .set('Authorization', `Bearer ${validToken}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing required fields');
  });

  it('should return 404 for post not found or not owned by user', async () => {
    const res = await getRequest()
      .delete('/api/users/removepost')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: 99999 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No post with that id');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .delete('/api/users/removepost')
      .send({ id: postId });

    expect(res.statusCode).toBe(401);
  });
});

// Test 5 - GET /users/{id}/posts
describe('GET /api/users/:id/posts', () => {
  it('should retrieve posts by specific user successfully', async () => {
    const res = await getRequest()
      .get(`/api/users/${userId}/posts`)
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('posts');
    expect(Array.isArray(res.body.posts)).toBe(true);
  });

  it('should return 404 for user not found', async () => {
    const res = await getRequest()
      .get('/api/users/99999/posts')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .get(`/api/users/${userId}/posts`);

    expect(res.statusCode).toBe(401);
  });
});