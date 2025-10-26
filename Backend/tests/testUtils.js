import request from 'supertest';
import app from '../app.js';

let userData;
const USE_APP = true;
const PORT = process.env.PORT || 5000;

// Function to get the request agent
export const getRequest = () => {
  return USE_APP ? request(app) : request(`http://localhost:${PORT}`);
};

const generateUserData = () => {
  if (!userData) {
    userData = {
      email: `test${Date.now()}@example.com`,
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Test Company',
      category: 1,
      phone: '+1234567890',
      description: 'A test business description with at least 10 characters.'
    };
  }
  return userData;
};

export const getUserData = () => generateUserData();

export const registerUser = async () => {
  const data = getUserData();
  const res = await getRequest()
    .post('/api/auth/signup')
    .send(data);
  return res;
};

export const setupAuthTest = async () => {
  await registerUser();

  // Login with the shared userData
  const loginRes = await getRequest()
    .post('/api/auth/login')
    .send({
      email: getUserData().email,
      password: getUserData().password
    });
  if (loginRes.status !== 200) {
    throw new Error('Login failed');
  }

  const validToken = loginRes.body.token;

  return { validToken };
};

export const setupPostTest = async () => {
  await registerUser();

  // Login with the shared userData
  const loginRes = await getRequest()
    .post('/api/auth/login')
    .send({
      email: getUserData().email,
      password: getUserData().password
    });
  if (loginRes.status !== 200) {
    throw new Error('Login failed');
  }

  const validToken = loginRes.body.token;

  // Get userId
  const userRes = await getRequest()
    .get('/api/users/me')
    .set('Authorization', `Bearer ${validToken}`);
  const userId = userRes.body.data.id;

  // Create a test post for publish/remove tests
  const addPostRes = await getRequest()
    .post('/api/users/addpost')
    .set('Authorization', `Bearer ${validToken}`)
    .send({
      title: 'Test Post',
      date: new Date().toISOString(),
      content: 'Test content',
      status: 'draft'
    });
  const postId = addPostRes.status === 201 ? addPostRes.body.postId : null;

  return { validToken, userId, postId };
};

export const setupTestimonialTest = async () => {
  await registerUser();

  // Login with the shared userData
  const loginRes = await getRequest()
    .post('/api/auth/login')
    .send({
      email: getUserData().email,
      password: getUserData().password
    });
  if (loginRes.status !== 200) {
    throw new Error('Login failed');
  }

  const validToken = loginRes.body.token;

  // Get userId
  const userRes = await getRequest()
    .get('/api/users/me')
    .set('Authorization', `Bearer ${validToken}`);
  const userId = userRes.body.data.id;

  // Create a test testimonial for publish/remove tests
  const addTestimonialRes = await getRequest()
    .post('/api/users/addtestimonial')
    .set('Authorization', `Bearer ${validToken}`)
    .send({
      title: 'Test Testimonial',
      date: new Date().toISOString(),
      content: 'Test content',
      status: 'draft'
    });
  const testimonialId = addTestimonialRes.status === 201 ? addTestimonialRes.body.testimonialId : null;

  return { validToken, userId, testimonialId };
};

export const setupCaseStudyTest = async () => {
  await registerUser();

  // Login with the shared userData
  const loginRes = await getRequest()
    .post('/api/auth/login')
    .send({
      email: getUserData().email,
      password: getUserData().password
    });
  if (loginRes.status !== 200) {
    throw new Error('Login failed');
  }

  const validToken = loginRes.body.token;

  // Get userId
  const userRes = await getRequest()
    .get('/api/users/me')
    .set('Authorization', `Bearer ${validToken}`);
  const userId = userRes.body.data.id;

  // Create a test case study for publish/remove tests
  const addCaseStudyRes = await getRequest()
    .post('/api/users/addcasestudy')
    .set('Authorization', `Bearer ${validToken}`)
    .send({
      title: 'Test Case Study',
      date: new Date().toISOString(),
      content: 'Test content',
      status: 'draft'
    });
  const caseStudyId = addCaseStudyRes.status === 201 ? addCaseStudyRes.body.caseStudyId : null;

  return { validToken, userId, caseStudyId };
};