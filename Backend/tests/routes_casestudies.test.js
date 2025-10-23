import { getRequest, setupCaseStudyTest } from './testUtils.js';

let validToken = '';
let userId = '';
let caseStudyId = '';

// Helper function to get valid token and create a test case study
beforeAll(async () => {
  const setup = await setupCaseStudyTest();
  validToken = setup.validToken;
  userId = setup.userId;
  caseStudyId = setup.caseStudyId;
});

// Test Set 7 - Case Studies Endpoints

// Test 1 - GET /users/mycasestudies
describe('GET /api/users/mycasestudies', () => {
  it('should retrieve case studies by authenticated user successfully', async () => {
    const res = await getRequest()
      .get('/api/users/mycasestudies')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('caseStudies');
    expect(Array.isArray(res.body.caseStudies)).toBe(true);
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .get('/api/users/mycasestudies');

    expect(res.statusCode).toBe(401);
  });
});

// Test 2 - POST /users/addcasestudy
describe('POST /api/users/addcasestudy', () => {
  it('should add a new case study successfully', async () => {
    const caseStudyData = {
      title: 'New Test Case Study',
      date: new Date().toISOString(),
      content: 'New test content',
      status: 'published'
    };
    const res = await getRequest()
      .post('/api/users/addcasestudy')
      .set('Authorization', `Bearer ${validToken}`)
      .send(caseStudyData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('caseStudyId');
  });

  it('should return 400 for missing required fields', async () => {
    const invalidData = { title: 'Test' };  // Missing date, content, status
    const res = await getRequest()
      .post('/api/users/addcasestudy')
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
      .post('/api/users/addcasestudy')
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
      .post('/api/users/addcasestudy')
      .send({ title: 'Test', date: new Date().toISOString(), content: 'Test', status: 'draft' });

    expect(res.statusCode).toBe(401);
  });
});

// Test 3 - POST /users/publishcasestudy
describe('POST /api/users/publishcasestudy', () => {
  it('should publish a case study successfully', async () => {
    const res = await getRequest()
      .post('/api/users/publishcasestudy')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: caseStudyId });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Successfully published case study');
  });

  it('should return 400 for missing required fields', async () => {
    const res = await getRequest()
      .post('/api/users/publishcasestudy')
      .set('Authorization', `Bearer ${validToken}`)
      .send({});

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('Missing required fields');
    }
  });

  it('should return 404 for case study not found or not owned by user', async () => {
    const res = await getRequest()
      .post('/api/users/publishcasestudy')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: 99999 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No case study with that id');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .post('/api/users/publishcasestudy')
      .send({ id: caseStudyId });

    expect(res.statusCode).toBe(401);
  });
});

// Test 4 - DELETE /users/removecasestudy
describe('DELETE /api/users/removecasestudy', () => {
  it('should remove a case study successfully', async () => {
    const res = await getRequest()
      .delete('/api/users/removecasestudy')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: caseStudyId });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Case study deleted');
  });

  it('should return 400 for missing required fields', async () => {
    const res = await getRequest()
      .delete('/api/users/removecasestudy')
      .set('Authorization', `Bearer ${validToken}`)
      .send({});

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('Missing required fields');
    }
  });

  it('should return 404 for case study not found or not owned by user', async () => {
    const res = await getRequest()
      .delete('/api/users/removecasestudy')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ id: 99999 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No case study with that id');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .delete('/api/users/removecasestudy')
      .send({ id: caseStudyId });

    expect(res.statusCode).toBe(401);
  });
});

// Test 5 - GET /users/{id}/casestudies
describe('GET /api/users/:id/casestudies', () => {
  it('should retrieve case studies by specific user successfully', async () => {
    const res = await getRequest()
      .get(`/api/users/${userId}/casestudies`)
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('caseStudies');
    expect(Array.isArray(res.body.caseStudies)).toBe(true);
  });

  it('should return 404 for user not found', async () => {
    const res = await getRequest()
      .get('/api/users/99999/casestudies')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .get(`/api/users/${userId}/casestudies`);

    expect(res.statusCode).toBe(401);
  });
});