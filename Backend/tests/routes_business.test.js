import { getRequest, setupAuthTest } from './testUtils.js';

let validToken = '';
let businessId = '';
let serviceId = '';
let clientId = '';
let connectionId = '';

// Helper function to get valid token (run auth login first)
beforeAll(async () => {
  const setup = await setupAuthTest();
  validToken = setup.validToken;
});

// Test Set 3 - Business Endpoints

// Test 1 - GET /business/query
// NOTES: FIXED BUGS IN CONTROLLER FOR QUERY PAGE
describe('GET /api/business/query', () => {
  it('should retrieve paginated businesses successfully', async () => {
    const res = await getRequest()
      .get('/api/business/query?page=1&limit=10')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('pagination');
  });

  // BUG
  it('should return 400 for invalid page parameter', async () => {
    const res = await getRequest()
      .get('/api/business/query?page=0')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('Page must be a positive integer');
    }
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .get('/api/business/query');

    expect(res.statusCode).toBe(401);
  });
});

// Test 2 - GET /business/myinfo
describe('GET /api/business/myinfo', () => {
  it('should retrieve user business profile successfully', async () => {
    const res = await getRequest()
      .get('/api/business/myinfo')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('businessName');
    businessId = res.body.id; // Store businessId for later tests
    // Add more assertions based on expected fields
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .get('/api/business/myinfo');

    expect(res.statusCode).toBe(401);
  });
});

// Test 3 - PATCH /business/update
describe('PATCH /api/business/update', () => {
  it('should update business profile successfully', async () => {
    const updateData = { name: 'Updated Business Name' };
    const res = await getRequest()
      .patch('/api/business/update')
      .set('Authorization', `Bearer ${validToken}`)
      .send(updateData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Business updated');
  });

  it('should return 400 for bad request', async () => {
    const invalidData = { invalidField: 'value' };
    const res = await getRequest()
      .patch('/api/business/update')
      .set('Authorization', `Bearer ${validToken}`)
      .send(invalidData);

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('Bad request');
    }
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .patch('/api/business/update')
      .send({ name: 'Test' });

    expect(res.statusCode).toBe(401);
  });
});

// Test 4 - POST /business/addservice
describe('POST /api/business/addservice', () => {
  it('should add services successfully', async () => {
    const serviceData = { services: ['Web Design', 'SEO'] };
    const res = await getRequest()
      .post('/api/business/addservice')
      .set('Authorization', `Bearer ${validToken}`)
      .send(serviceData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('newServices');
    // Store serviceId for removal test
    serviceId = Object.values(res.body.newServices)[0];
  });

  it('should return 400 for no services provided', async () => {
    const res = await getRequest()
      .post('/api/business/addservice')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ services: [] });

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('No services provided');
    }
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .post('/api/business/addservice')
      .send({ services: ['Test'] });

    expect(res.statusCode).toBe(401);
  });
});

// Test 5 - POST /business/addclient
describe('POST /api/business/addclient', () => {
  it('should add clients successfully', async () => {
    const clientData = { clients: ['Client A', 'Client B'] };
    const res = await getRequest()
      .post('/api/business/addclient')
      .set('Authorization', `Bearer ${validToken}`)
      .send(clientData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('newClients');
    // Store clientId for removal test
    clientId = Object.values(res.body.newClients)[0];
  });

  it('should return 400 for no clients provided', async () => {
    const res = await getRequest()
      .post('/api/business/addclient')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ clients: [] });

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('No clients provided');
    }
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .post('/api/business/addclient')
      .send({ clients: ['Test'] });

    expect(res.statusCode).toBe(401);
  });
});

// Test 6 - DELETE /business/removeservice
describe('DELETE /api/business/removeservice', () => {
  it('should remove services successfully', async () => {
    const removeData = { services: [serviceId] };
    const res = await getRequest()
      .delete('/api/business/removeservice')
      .set('Authorization', `Bearer ${validToken}`)
      .send(removeData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('outcomes');
  });

  it('should return 400 for no services provided', async () => {
    const res = await getRequest()
      .delete('/api/business/removeservice')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ services: [] });

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('No services provided');
    }
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .delete('/api/business/removeservice')
      .send({ services: [1] });

    expect(res.statusCode).toBe(401);
  });
});

// Test 7 - DELETE /business/removeclient
describe('DELETE /api/business/removeclient', () => {
  it('should remove clients successfully', async () => {
    const removeData = { clients: [clientId] };
    const res = await getRequest()
      .delete('/api/business/removeclient')
      .set('Authorization', `Bearer ${validToken}`)
      .send(removeData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('outcomes');
  });

  it('should return 400 for no clients provided', async () => {
    const res = await getRequest()
      .delete('/api/business/removeclient')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ clients: [] });

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('No clients provided');
    }
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .delete('/api/business/removeclient')
      .send({ clients: [1] });

    expect(res.statusCode).toBe(401);
  });
});

// Test 8 - POST /business/addconnection
describe('POST /api/business/addconnection', () => {
  it('should add connection successfully', async () => {
    const connectionData = { initiatingBusinessId: businessId, receivingBusinessId: 1, connectionTypeId: 1 };
    // console.log('Connection Data:', connectionData);
    const res = await getRequest()
      .post('/api/business/addconnection')
      .set('Authorization', `Bearer ${validToken}`)
      .send(connectionData);

    console.log('Add Connection Response Body:', res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Connection added');
    expect(res.body).toHaveProperty('connectionId');
    connectionId = res.body.connectionId;
  });

  it('should return 400 for cannot connect to self', async () => {
    const connectionData = { initiatingBusinessId: businessId, receivingBusinessId: businessId, connectionTypeId: 1 };
    const res = await getRequest()
      .post('/api/business/addconnection')
      .set('Authorization', `Bearer ${validToken}`)
      .send(connectionData);

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('Cannot connect to self');
    }
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .post('/api/business/addconnection')
      .send({ initiatingBusinessId: 1, receivingBusinessId: 2 });

    expect(res.statusCode).toBe(401);
  });
});

// Test 9 - DELETE /business/removeconnection
describe('DELETE /api/business/removeconnection', () => {
  it('should remove connection successfully', async () => {
    const removeData = { id: connectionId };
    const res = await getRequest()
      .delete('/api/business/removeconnection')
      .set('Authorization', `Bearer ${validToken}`)
      .send(removeData);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Connection removed');
  });

  it('should return 400 for no connection id provided', async () => {
    const res = await getRequest()
      .delete('/api/business/removeconnection')
      .set('Authorization', `Bearer ${validToken}`)
      .send({});

    expect(res.statusCode).toBe(400);
    if (res.body.error) {
      expect(res.body.error).toBe('VALIDATION_FAILED');
    } else {
      expect(res.body.message).toBe('No connection id provided');
    }
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .delete('/api/business/removeconnection')
      .send({ id: 1 });

    expect(res.statusCode).toBe(401);
  });
});

// Test 10 - GET /business/{id}
describe('GET /api/business/:id', () => {
  it('should retrieve business details by ID successfully', async () => {
    const res = await getRequest()
      .get(`/api/business/${businessId}`)
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('businessName');
  });

  it('should return 404 if no business found', async () => {
    const res = await getRequest()
      .get('/api/business/99999') // Non-existent ID
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No business exists for user');
  });

  it('should return 401 for missing authorization', async () => {
    const res = await getRequest()
      .get(`/api/business/${businessId}`);

    expect(res.statusCode).toBe(401);
  });
}); 