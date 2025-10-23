import { getRequest, setupTestimonialTest } from './testUtils.js';

let validToken = '';
let userId = '';
let testimonialId = '';

// Helper function to get valid token and create a test testimonial
beforeAll(async () => {
  const setup = await setupTestimonialTest();
  validToken = setup.validToken;
  userId = setup.userId;
  testimonialId = setup.testimonialId;
});

// Test Set 6 - Testimonials Endpoints

// Test 1 - GET /users/mytestimonials
describe('GET /api/users/mytestimonials', () => {
  it('should retrieve testimonials by authenticated user successfully', async () => {
    const res = await getRequest()
      .get('/api/users/mytestimonials')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('testimonials');
    expect(Array.isArray(res.body.testimonials)).toBe(true);
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .get('/api/users/mytestimonials');

    expect(res.statusCode).toBe(401);
  });
});

// Test 2 - POST /users/addtestimonial
describe('POST /api/users/addtestimonial', () => {
  it('should add a new testimonial successfully', async () => {
    const testimonialData = {
      title: 'New Test Testimonial',
      date: new Date().toISOString(),
      content: 'New test content',
      status: 'published'
    };
    const res = await getRequest()
      .post('/api/users/addtestimonial')
      .set('Authorization', `Bearer ${validToken}`)
      .send(testimonialData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('testimonialId');
  });

  it('should return 400 for missing required fields', async () => {
    const invalidData = { title: 'Test' };  // Missing date, content, status
    const res = await getRequest()
      .post('/api/users/addtestimonial')
      .set('Authorization', `Bearer ${validToken}`)
      .send(invalidData);

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('Missing required fields');
    }
  });

  it('should return 400 for invalid status', async () => {
    const invalidData = {
      title: 'Test',
      date: new Date().toISOString(),
      content: 'Test',
      status: 'invalid'
    };
    const res = await getRequest()
      .post('/api/users/addtestimonial')
      .set('Authorization', `Bearer ${validToken}`)
      .send(invalidData);

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('Status must be draft or published');
    }
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .post('/api/users/addtestimonial')
      .send({ title: 'Test', date: new Date().toISOString(), content: 'Test', status: 'draft' });

    expect(res.statusCode).toBe(401);
  });
});

// Test 3 - POST /users/publishtestimonial
describe('POST /api/users/publishtestimonial', () => {
  it('should publish a testimonial successfully', async () => {
    const res = await getRequest()
      .post('/api/users/publishtestimonial')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: testimonialId });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Successfully published testimonial');
  });

  it('should return 400 for missing required fields', async () => {
    const res = await getRequest()
      .post('/api/users/publishtestimonial')
      .set('Authorization', `Bearer ${validToken}`)
      .send({});

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('Missing required fields');
    }
  });

  it('should return 404 for testimonial not found or not owned by user', async () => {
    const res = await getRequest()
      .post('/api/users/publishtestimonial')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: 99999 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No testimonial with that id');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .post('/api/users/publishtestimonial')
      .send({ id: testimonialId });

    expect(res.statusCode).toBe(401);
  });
});

// Test 4 - DELETE /users/removetestimonial
describe('DELETE /api/users/removetestimonial', () => {
  it('should remove a testimonial successfully', async () => {
    const res = await getRequest()
      .delete('/api/users/removetestimonial')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: testimonialId });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Testimonial deleted');
  });

  it('should return 400 for missing required fields', async () => {
    const res = await getRequest()
      .delete('/api/users/removetestimonial')
      .set('Authorization', `Bearer ${validToken}`)
      .send({});

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('Missing required fields');
    }
  });

  it('should return 404 for testimonial not found or not owned by user', async () => {
    const res = await getRequest()
      .delete('/api/users/removetestimonial')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: 99999 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No testimonial with that id');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .delete('/api/users/removetestimonial')
      .send({ id: testimonialId });

    expect(res.statusCode).toBe(401);
  });
});

// Test 5 - GET /users/{id}/testimonials
describe('GET /api/users/:id/testimonials', () => {
  it('should retrieve testimonials by specific user successfully', async () => {
    const res = await getRequest()
      .get(`/api/users/${userId}/testimonials`)
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('testimonials');
    expect(Array.isArray(res.body.testimonials)).toBe(true);
  });

  it('should return 404 for user not found', async () => {
    const res = await getRequest()
      .get('/api/users/99999/testimonials')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .get(`/api/users/${userId}/testimonials`);

    expect(res.statusCode).toBe(401);
  });
});