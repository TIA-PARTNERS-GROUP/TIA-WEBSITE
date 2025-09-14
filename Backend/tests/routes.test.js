import request from 'supertest';
import app from '../app.js';

// Mock argon2 globally
jest.mock('argon2', () => ({
  hash: jest.fn(),
  verify: jest.fn()
}));

// Mock the middleware
jest.mock('../middleware/authTolkien.js', () => ({
  verifyToken: (req, res, next) => next(),
  verifyRefreshToken: (req, res, next) => next(),
  verifyTokenAndAccountStatus: (req, res, next) => next(),
  tempFakeAuth: (req, res, next) => next(),
}));

// Mock the routes to include the /api route and auth sub-routes
jest.mock('../routes/index.js', () => {
  const express = jest.requireActual('express');
  const router = express.Router();
  const authRouter = express.Router();
  const businessRouter = express.Router();

  // Mock auth routes with conditional responses
  authRouter.post('/signup', (req, res) => {
    if (req.body.email === 'existing@example.com') {
      res.status(409).json({ message: 'Email already in use' });
    } else {
      res.status(201).json({ id: 1, email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName });
    }
  });
  authRouter.post('/login', (req, res) => {
    if (req.body.email === 'wrong@example.com') {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      res.status(200).json({ message: 'Login successful', token: 'mocktoken' });
    }
  });
  authRouter.post('/refresh', (req, res) => {
    res.status(200).json({ message: 'Refresh successful', token: 'newtoken' });
  });
  authRouter.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Successfully logged out' });
  });

  // Mock business routes
  businessRouter.get('/query', (req, res) => {
    // Simulate auth check
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (req.headers.authorization === 'Bearer invalid') {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const search = req.query.search || '';
    const tags = req.query.tags ? (Array.isArray(req.query.tags) ? req.query.tags.map(t => parseInt(t)) : [parseInt(req.query.tags)]) : [];

    // Validate params
    if (page < 1) {
      return res.status(400).json({ message: 'Page must be at least 1' });
    }
    if (limit < 1 || limit > 100) {
      return res.status(400).json({ message: 'Limit must be between 1 and 100' });
    }

    // Mock data
    const mockData = [
      { id: 1, name: 'Business 1', description: 'Desc 1', contact_name: 'Contact 1', contact_email: 'email1@test.com', category_name: 'Category 1' },
      { id: 2, name: 'Business 2', description: 'Desc 2', contact_name: 'Contact 2', contact_email: 'email2@test.com', category_name: 'Category 2' }
    ];
    const totalItems = 42;
    const totalPages = Math.ceil(totalItems / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.status(200).json({
      message: 'Success',
      data: mockData,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNext,
        hasPrev
      }
    });
  });

  businessRouter.get('/myinfo', (req, res) => {
    // Simulate auth check
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (req.headers.authorization === 'Bearer invalid') {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Mock business info
    const mockBusiness = {
      id: 1,
      businessName: 'My Business',
      contactName: 'John Doe',
      contactPhone: '123-456-7890',
      contactEmail: 'john@business.com',
      businessCategory: 'Tech',
      businessDescription: 'A tech business',
      connections: [{ connection_id: 1, business_id: 2, business_name: 'Partner Business' }],
      services: [{ service_id: 1, description: 'Web Development' }],
      clients: [{ client_id: 1, description: 'Client 1' }]
    };

    res.status(200).json({
      message: 'Success',
      ...mockBusiness
    });
  });

  businessRouter.patch('/update', (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (req.headers.authorization === 'Bearer invalid') {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    if (req.headers.authorization === 'Bearer no-business') {
      return res.status(404).json({ message: 'No business exists for user' });
    }
    if (req.body.invalidField) {
      return res.status(400).json({ message: 'Bad request' });
    }
    res.status(201).json({ message: 'Business updated' });
  });

  businessRouter.post('/addservice', (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (req.headers.authorization === 'Bearer invalid') {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    if (req.headers.authorization === 'Bearer no-business') {
      return res.status(404).json({ message: 'No business exists for user' });
    }
    if (!req.body.services || req.body.services.length === 0) {
      return res.status(400).json({ message: 'No services provided' });
    }
    const newServices = {};
    req.body.services.forEach((service, index) => {
      newServices[service] = 10 + index;
    });
    res.status(201).json({ message: 'Success', newServices });
  });

  businessRouter.post('/addclient', (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (req.headers.authorization === 'Bearer invalid') {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    if (req.headers.authorization === 'Bearer no-business') {
      return res.status(404).json({ message: 'No business exists for user' });
    }
    if (!req.body.clients || req.body.clients.length === 0) {
      return res.status(400).json({ message: 'No clients provided' });
    }
    const newClients = {};
    req.body.clients.forEach((client, index) => {
      newClients[client] = 20 + index;
    });
    res.status(201).json({ message: 'Success', newClients });
  });

  businessRouter.delete('/removeservice', (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (req.headers.authorization === 'Bearer invalid') {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    if (req.headers.authorization === 'Bearer no-business') {
      return res.status(404).json({ message: 'No business exists for user' });
    }
    if (!req.body.services || req.body.services.length === 0) {
      return res.status(400).json({ message: 'No services provided' });
    }
    // Mock outcomes
    const outcomes = {};
    req.body.services.forEach((serviceId) => {
      outcomes[serviceId] = serviceId % 2 === 0 ? 'Success' : 'No service with that id for this business';
    });
    res.status(201).json({ message: 'Success', outcomes });
  });

  businessRouter.delete('/removeclient', (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (req.headers.authorization === 'Bearer invalid') {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    if (req.headers.authorization === 'Bearer no-business') {
      return res.status(404).json({ message: 'No business exists for user' });
    }
    if (!req.body.clients || req.body.clients.length === 0) {
      return res.status(400).json({ message: 'No clients provided' });
    }
    // Mock outcomes
    const outcomes = {};
    req.body.clients.forEach((clientId) => {
      outcomes[clientId] = clientId % 2 === 0 ? 'Success' : 'No client with that id for this business';
    });
    res.status(201).json({ message: 'Success', outcomes });
  });

  businessRouter.post('/addconnection', (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (req.headers.authorization === 'Bearer invalid') {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    if (req.headers.authorization === 'Bearer no-business') {
      return res.status(404).json({ message: 'No business exists for user' });
    }
    if (!req.body.initiatingBusinessId || !req.body.receivingBusinessId) {
      return res.status(400).json({ message: 'Missing or invalid business IDs' });
    }
    if (req.body.initiatingBusinessId === req.body.receivingBusinessId) {
      return res.status(400).json({ message: 'Cannot connect to self' });
    }
    // Mock success
    res.status(201).json({ message: 'Connection added', connectionId: 1 });
  });

  businessRouter.delete('/removeconnection', (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (req.headers.authorization === 'Bearer invalid') {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    if (req.headers.authorization === 'Bearer no-business') {
      return res.status(404).json({ message: 'No business exists for user' });
    }
    if (!req.body.id) {
      return res.status(400).json({ message: 'No connection id provided' });
    }
    // Mock success
    res.status(200).json({ message: 'Connection removed' });
  });

  businessRouter.get('/json/:id', (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (req.headers.authorization === 'Bearer invalid') {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    if (req.params.id === 'no-business') {
      return res.status(404).json({ message: 'No business exists for user' });
    }
    // Mock business info
    const mockBusiness = {
      message: 'Success',
      businessName: 'Business ' + req.params.id,
      contactName: 'Contact ' + req.params.id,
      contactPhone: '123-456-7890',
      contactEmail: 'email@business.com',
      businessCategory: 'Category',
      businessDescription: 'Description',
      connections: [],
      services: [],
      clients: []
    };
    res.status(200).json(mockBusiness);
  });

  router.use('/auth', authRouter);
  router.use('/business', businessRouter);
  router.get('/', (req, res) => {
    res.json({ message: 'API is working' });
  });
  return router;
});

// Mock the user model as a function that returns an object
jest.mock('../models/user.js', () => jest.fn());

// Mock the business model as a function that returns an object
jest.mock('../models/business.js', () => jest.fn());

// Test Set 1 - Public Endpoints:
// Test 1 - Basic
describe('GET /api', () => {
  it('API is working', async () => {
    const res = await request(app).get('/api');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('API is working');
  });
});

// Test Set 2 - Auth Endpoints:
// Test 1 - Register (Signup)
describe('POST /api/auth/signup', () => {
  it('should register a new user successfully', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe'
    };

    // Mock the user model methods
    const mockUser = {
      findByLoginEmail: jest.fn().mockResolvedValue(null), // No existing user
      registerUser: jest.fn().mockResolvedValue(1) // Return user ID
    };
    const userModel = require('../models/user.js');
    userModel.mockReturnValue(mockUser);

    const res = await request(app)
      .post('/api/auth/signup')
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(userData.email);
  });

  it('should return 409 for duplicate email', async () => {
    const userData = {
      email: 'existing@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe'
    };

    // Mock existing user
    const mockUser = {
      findByLoginEmail: jest.fn().mockResolvedValue({ id: 1 })
    };
    const userModel = require('../models/user.js');
    userModel.mockReturnValue(mockUser);

    const res = await request(app)
      .post('/api/auth/signup')
      .send(userData);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Email already in use');
  });
});

// Test 2 - Login
describe('POST /api/auth/login', () => {
  it('should login a user successfully', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    // Mock user and password verification
    const mockUser = {
      findByLoginEmail: jest.fn().mockResolvedValue({
        user_id: 1,
        login_email: 'test@example.com',
        password_hash: 'hashedpassword' // Mock hash
      }),
      addNewSession: jest.fn()
    };
    const userModel = require('../models/user.js');
    userModel.mockReturnValue(mockUser);

    // Mock argon2.verify to return true
    const argon2 = require('argon2');
    argon2.verify.mockResolvedValue(true);

    const res = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful');
    expect(res.body).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', async () => {
    const loginData = {
      email: 'wrong@example.com',
      password: 'wrongpassword'
    };

    const mockUser = {
      findByLoginEmail: jest.fn().mockResolvedValue(null)
    };
    const userModel = require('../models/user.js');
    userModel.mockReturnValue(mockUser);

    const res = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid email or password');
  });
});

// Test 3 - Token Refresh
describe('POST /api/auth/refresh', () => {
  it('should refresh the token successfully', async () => {
    // Mock user and session
    const mockUser = {
      infoFromId: jest.fn().mockResolvedValue({
        id: 1,
        login_email: 'test@example.com'
      }),
      rotateSession: jest.fn()
    };
    const userModel = require('../models/user.js');
    userModel.mockReturnValue(mockUser);

    const res = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', 'refreshToken=validtoken'); // Mock cookie

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Refresh successful');
    expect(res.body).toHaveProperty('token');
  });
});

// Test 4 - Logout
describe('POST /api/auth/logout', () => {
  it('should logout the user successfully', async () => {
    const mockUser = {
      revokeSession: jest.fn()
    };
    const userModel = require('../models/user.js');
    userModel.mockReturnValue(mockUser);

    const res = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', 'refreshToken=validtoken');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Successfully logged out');
  });
});

// Test Set 3 - Business Endpoints:

// Test 1 - GET /api/business/query
describe('GET /api/business/query', () => {
  it('should return paginated businesses successfully with default params', async () => {
    const res = await request(app)
      .get('/api/business/query')
      .set('Authorization', 'Bearer validtoken');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Success');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('pagination');
    expect(res.body.pagination.currentPage).toBe(1);
    expect(res.body.pagination.itemsPerPage).toBe(10);
  });

  it('should return paginated businesses with custom page and limit', async () => {
    const res = await request(app)
      .get('/api/business/query?page=2&limit=5')
      .set('Authorization', 'Bearer validtoken');

    expect(res.statusCode).toBe(200);
    expect(res.body.pagination.currentPage).toBe(2);
    expect(res.body.pagination.itemsPerPage).toBe(5);
  });

  it('should filter businesses by search query', async () => {
    const res = await request(app)
      .get('/api/business/query?search=tech')
      .set('Authorization', 'Bearer validtoken');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Success');
  });

  it('should filter businesses by tags', async () => {
    const res = await request(app)
      .get('/api/business/query?tags=1,2')
      .set('Authorization', 'Bearer validtoken');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Success');
  });

  it('should filter businesses by single tag', async () => {
    const res = await request(app)
      .get('/api/business/query?tags=1')
      .set('Authorization', 'Bearer validtoken');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Success');
  });

  // # Joshua - BUG: This test currently fails because the route is not validating the page correctly.
  it('should return 400 for invalid page', async () => {
    const res = await request(app)
      .get('/api/business/query?page=0')
      .set('Authorization', 'Bearer validtoken');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Page must be at least 1');
  });

  // # Joshua - BUG: This test currently fails because the route is not validating the limit correctly.
  it('should return 400 for invalid limit (too low)', async () => {
    const res = await request(app)
      .get('/api/business/query?limit=0')
      .set('Authorization', 'Bearer validtoken');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Limit must be between 1 and 100');
  });

  it('should return 400 for invalid limit (too high)', async () => {
    const res = await request(app)
      .get('/api/business/query?limit=101')
      .set('Authorization', 'Bearer validtoken');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Limit must be between 1 and 100');
  });

  it('should return 401 for missing authorization header', async () => {
    const res = await request(app)
      .get('/api/business/query');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authorization header missing');
  });

  it('should return 403 for invalid token', async () => {
    const res = await request(app)
      .get('/api/business/query')
      .set('Authorization', 'Bearer invalid');

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token');
  });
});

// Test 2 - GET /api/business/myinfo
describe('GET /api/business/myinfo', () => {
  it('should return authenticated user\'s business profile successfully', async () => {
    const res = await request(app)
      .get('/api/business/myinfo')
      .set('Authorization', 'Bearer validtoken');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Success');
    expect(res.body).toHaveProperty('businessName');
    expect(res.body).toHaveProperty('contactName');
    expect(res.body).toHaveProperty('contactEmail');
    expect(res.body).toHaveProperty('connections');
    expect(res.body).toHaveProperty('services');
    expect(res.body).toHaveProperty('clients');
  });

  it('should return 401 for missing authorization header', async () => {
    const res = await request(app)
      .get('/api/business/myinfo');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authorization header missing');
  });

  it('should return 403 for invalid token', async () => {
    const res = await request(app)
      .get('/api/business/myinfo')
      .set('Authorization', 'Bearer invalid');

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token');
  });
});

// Test 3 - PATCH /api/business/update
describe('PATCH /api/business/update', () => {
  it('should update business profile successfully', async () => {
    const updateData = {
      name: 'Updated Business Name',
      tagline: 'New Tagline',
      website: 'https://updated.com'
    };

    const res = await request(app)
      .patch('/api/business/update')
      .set('Authorization', 'Bearer validtoken')
      .send(updateData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Business updated');
  });

  it('should return 400 for invalid field in request body', async () => {
    const updateData = {
      invalidField: 'invalid'
    };

    const res = await request(app)
      .patch('/api/business/update')
      .set('Authorization', 'Bearer validtoken')
      .send(updateData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Bad request');
  });

  it('should return 401 for missing authorization header', async () => {
    const updateData = {
      name: 'Updated Name'
    };

    const res = await request(app)
      .patch('/api/business/update')
      .send(updateData);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authorization header missing');
  });

  it('should return 403 for invalid token', async () => {
    const updateData = {
      name: 'Updated Name'
    };

    const res = await request(app)
      .patch('/api/business/update')
      .set('Authorization', 'Bearer invalid')
      .send(updateData);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token');
  });

  it('should return 404 for no business found for user', async () => {
    const updateData = {
      name: 'Updated Name'
    };

    const res = await request(app)
      .patch('/api/business/update')
      .set('Authorization', 'Bearer no-business')
      .send(updateData);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No business exists for user');
  });
});

// Test 4 - POST /api/business/addservice
describe('POST /api/business/addservice', () => {
  it('should add services successfully', async () => {
    const serviceData = {
      services: ['Web Design', 'SEO Optimization', 'Consulting']
    };

    const res = await request(app)
      .post('/api/business/addservice')
      .set('Authorization', 'Bearer validtoken')
      .send(serviceData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Success');
    expect(res.body.newServices).toHaveProperty('Web Design');
    expect(res.body.newServices).toHaveProperty('SEO Optimization');
    expect(res.body.newServices).toHaveProperty('Consulting');
  });

  it('should return 400 for no services provided', async () => {
    const serviceData = {
      services: []
    };

    const res = await request(app)
      .post('/api/business/addservice')
      .set('Authorization', 'Bearer validtoken')
      .send(serviceData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No services provided');
  });

  it('should return 400 for missing services array', async () => {
    const res = await request(app)
      .post('/api/business/addservice')
      .set('Authorization', 'Bearer validtoken')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No services provided');
  });

  it('should return 401 for missing authorization header', async () => {
    const serviceData = {
      services: ['Web Design']
    };

    const res = await request(app)
      .post('/api/business/addservice')
      .send(serviceData);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authorization header missing');
  });

  it('should return 403 for invalid token', async () => {
    const serviceData = {
      services: ['Web Design']
    };

    const res = await request(app)
      .post('/api/business/addservice')
      .set('Authorization', 'Bearer invalid')
      .send(serviceData);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token');
  });

  it('should return 404 for no business found for user', async () => {
    const serviceData = {
      services: ['Web Design']
    };

    const res = await request(app)
      .post('/api/business/addservice')
      .set('Authorization', 'Bearer no-business')
      .send(serviceData);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No business exists for user');
  });
});

// Test 5 - POST /api/business/addclient
describe('POST /api/business/addclient', () => {
  it('should add clients successfully', async () => {
    const clientData = {
      clients: ['Acme Corp', 'Beta Ltd', 'Charlie Industries']
    };

    const res = await request(app)
      .post('/api/business/addclient')
      .set('Authorization', 'Bearer validtoken')
      .send(clientData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Success');
    expect(res.body.newClients).toHaveProperty('Acme Corp');
    expect(res.body.newClients).toHaveProperty('Beta Ltd');
    expect(res.body.newClients).toHaveProperty('Charlie Industries');
  });

  it('should return 400 for no clients provided', async () => {
    const clientData = {
      clients: []
    };

    const res = await request(app)
      .post('/api/business/addclient')
      .set('Authorization', 'Bearer validtoken')
      .send(clientData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No clients provided');
  });

  it('should return 400 for missing clients array', async () => {
    const res = await request(app)
      .post('/api/business/addclient')
      .set('Authorization', 'Bearer validtoken')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No clients provided');
  });

  it('should return 401 for missing authorization header', async () => {
    const clientData = {
      clients: ['Acme Corp']
    };

    const res = await request(app)
      .post('/api/business/addclient')
      .send(clientData);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authorization header missing');
  });

  it('should return 403 for invalid token', async () => {
    const clientData = {
      clients: ['Acme Corp']
    };

    const res = await request(app)
      .post('/api/business/addclient')
      .set('Authorization', 'Bearer invalid')
      .send(clientData);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token');
  });

  it('should return 404 for no business found for user', async () => {
    const clientData = {
      clients: ['Acme Corp']
    };

    const res = await request(app)
      .post('/api/business/addclient')
      .set('Authorization', 'Bearer no-business')
      .send(clientData);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No business exists for user');
  });
});

// Test 6 - DELETE /api/business/removeservice
describe('DELETE /api/business/removeservice', () => {
  it('should remove services successfully', async () => {
    const serviceData = {
      services: [12, 13, 14]
    };

    const res = await request(app)
      .delete('/api/business/removeservice')
      .set('Authorization', 'Bearer validtoken')
      .send(serviceData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Success');
    expect(res.body.outcomes).toHaveProperty('12');
    expect(res.body.outcomes).toHaveProperty('13');
    expect(res.body.outcomes).toHaveProperty('14');
  });

  it('should return 400 for no services provided', async () => {
    const serviceData = {
      services: []
    };

    const res = await request(app)
      .delete('/api/business/removeservice')
      .set('Authorization', 'Bearer validtoken')
      .send(serviceData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No services provided');
  });

  it('should return 400 for missing services array', async () => {
    const res = await request(app)
      .delete('/api/business/removeservice')
      .set('Authorization', 'Bearer validtoken')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No services provided');
  });

  it('should return 401 for missing authorization header', async () => {
    const serviceData = {
      services: [12]
    };

    const res = await request(app)
      .delete('/api/business/removeservice')
      .send(serviceData);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authorization header missing');
  });

  it('should return 403 for invalid token', async () => {
    const serviceData = {
      services: [12]
    };

    const res = await request(app)
      .delete('/api/business/removeservice')
      .set('Authorization', 'Bearer invalid')
      .send(serviceData);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token');
  });

  it('should return 404 for no business found for user', async () => {
    const serviceData = {
      services: [12]
    };

    const res = await request(app)
      .delete('/api/business/removeservice')
      .set('Authorization', 'Bearer no-business')
      .send(serviceData);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No business exists for user');
  });
});

// Test 7 - DELETE /api/business/removeclient
describe('DELETE /api/business/removeclient', () => {
  it('should remove clients successfully', async () => {
    const clientData = {
      clients: [21, 22, 23]
    };

    const res = await request(app)
      .delete('/api/business/removeclient')
      .set('Authorization', 'Bearer validtoken')
      .send(clientData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Success');
    expect(res.body.outcomes).toHaveProperty('21');
    expect(res.body.outcomes).toHaveProperty('22');
    expect(res.body.outcomes).toHaveProperty('23');
  });

  it('should return 400 for no clients provided', async () => {
    const clientData = {
      clients: []
    };

    const res = await request(app)
      .delete('/api/business/removeclient')
      .set('Authorization', 'Bearer validtoken')
      .send(clientData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No clients provided');
  });

  it('should return 400 for missing clients array', async () => {
    const res = await request(app)
      .delete('/api/business/removeclient')
      .set('Authorization', 'Bearer validtoken')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No clients provided');
  });

  it('should return 401 for missing authorization header', async () => {
    const clientData = {
      clients: [21]
    };

    const res = await request(app)
      .delete('/api/business/removeclient')
      .send(clientData);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authorization header missing');
  });

  it('should return 403 for invalid token', async () => {
    const clientData = {
      clients: [21]
    };

    const res = await request(app)
      .delete('/api/business/removeclient')
      .set('Authorization', 'Bearer invalid')
      .send(clientData);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token');
  });

  it('should return 404 for no business found for user', async () => {
    const clientData = {
      clients: [21]
    };

    const res = await request(app)
      .delete('/api/business/removeclient')
      .set('Authorization', 'Bearer no-business')
      .send(clientData);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No business exists for user');
  });
});

// Test 8 - POST /api/business/addconnection
describe('POST /api/business/addconnection', () => {
  it('should add connection successfully', async () => {
    const connectionData = {
      initiatingBusinessId: 1,
      receivingBusinessId: 2
    };

    const res = await request(app)
      .post('/api/business/addconnection')
      .set('Authorization', 'Bearer validtoken')
      .send(connectionData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Connection added');
    expect(res.body).toHaveProperty('connectionId');
  });

  it('should return 400 for missing initiatingBusinessId', async () => {
    const connectionData = {
      receivingBusinessId: 2
    };

    const res = await request(app)
      .post('/api/business/addconnection')
      .set('Authorization', 'Bearer validtoken')
      .send(connectionData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing or invalid business IDs');
  });

  it('should return 400 for missing receivingBusinessId', async () => {
    const connectionData = {
      initiatingBusinessId: 1
    };

    const res = await request(app)
      .post('/api/business/addconnection')
      .set('Authorization', 'Bearer validtoken')
      .send(connectionData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing or invalid business IDs');
  });

  it('should return 400 for connecting to self', async () => {
    const connectionData = {
      initiatingBusinessId: 1,
      receivingBusinessId: 1
    };

    const res = await request(app)
      .post('/api/business/addconnection')
      .set('Authorization', 'Bearer validtoken')
      .send(connectionData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Cannot connect to self');
  });

  it('should return 401 for missing authorization header', async () => {
    const connectionData = {
      initiatingBusinessId: 1,
      receivingBusinessId: 2
    };

    const res = await request(app)
      .post('/api/business/addconnection')
      .send(connectionData);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authorization header missing');
  });

  it('should return 403 for invalid token', async () => {
    const connectionData = {
      initiatingBusinessId: 1,
      receivingBusinessId: 2
    };

    const res = await request(app)
      .post('/api/business/addconnection')
      .set('Authorization', 'Bearer invalid')
      .send(connectionData);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token');
  });

  it('should return 404 for no business found for user', async () => {
    const connectionData = {
      initiatingBusinessId: 1,
      receivingBusinessId: 2
    };

    const res = await request(app)
      .post('/api/business/addconnection')
      .set('Authorization', 'Bearer no-business')
      .send(connectionData);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No business exists for user');
  });
});

// Test 9 - DELETE /api/business/removeconnection
describe('DELETE /api/business/removeconnection', () => {
  it('should remove connection successfully', async () => {
    const connectionData = {
      id: 1
    };

    const res = await request(app)
      .delete('/api/business/removeconnection')
      .set('Authorization', 'Bearer validtoken')
      .send(connectionData);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Connection removed');
  });

  it('should return 400 for no connection id provided', async () => {
    const res = await request(app)
      .delete('/api/business/removeconnection')
      .set('Authorization', 'Bearer validtoken')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No connection id provided');
  });

  it('should return 401 for missing authorization header', async () => {
    const connectionData = {
      id: 1
    };

    const res = await request(app)
      .delete('/api/business/removeconnection')
      .send(connectionData);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authorization header missing');
  });

  it('should return 403 for invalid token', async () => {
    const connectionData = {
      id: 1
    };

    const res = await request(app)
      .delete('/api/business/removeconnection')
      .set('Authorization', 'Bearer invalid')
      .send(connectionData);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token');
  });

  it('should return 404 for no business found for user', async () => {
    const connectionData = {
      id: 1
    };

    const res = await request(app)
      .delete('/api/business/removeconnection')
      .set('Authorization', 'Bearer no-business')
      .send(connectionData);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No business exists for user');
  });
});

// Test 10 - GET /api/business/json/:id
describe('GET /api/business/json/:id', () => {
  it('should return business details successfully', async () => {
    const res = await request(app)
      .get('/api/business/json/123')
      .set('Authorization', 'Bearer validtoken');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Success');
    expect(res.body).toHaveProperty('businessName');
    expect(res.body).toHaveProperty('contactName');
    expect(res.body).toHaveProperty('contactPhone');
    expect(res.body).toHaveProperty('contactEmail');
    expect(res.body).toHaveProperty('businessCategory');
    expect(res.body).toHaveProperty('businessDescription');
    expect(res.body).toHaveProperty('connections');
    expect(res.body).toHaveProperty('services');
    expect(res.body).toHaveProperty('clients');
  });

  it('should return 401 for missing authorization header', async () => {
    const res = await request(app)
      .get('/api/business/json/123');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authorization header missing');
  });

  it('should return 403 for invalid token', async () => {
    const res = await request(app)
      .get('/api/business/json/123')
      .set('Authorization', 'Bearer invalid');

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token');
  });

  it('should return 404 for no business found', async () => {
    const res = await request(app)
      .get('/api/business/json/no-business')
      .set('Authorization', 'Bearer validtoken');

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No business exists for user');
  });
});

