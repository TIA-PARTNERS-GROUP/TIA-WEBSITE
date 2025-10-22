import Joi from 'joi';

const intId = Joi.number().integer().min(1);

// GET /business/query  (req.query)
export const querySchema = Joi.object({
  page:  Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow('').max(100),

  tags: Joi.alternatives().try(
    Joi.array().items(intId),
    intId
  ).default([])
});

// PATCH /business/update  (req.body)
export const updateSchema = Joi.object({
  name: Joi.string().min(1).max(80),
  tagline: Joi.string().allow('').max(200),
  website: Joi.string().uri().allow(''),
  contactName: Joi.string().max(60),
  contactPhoneNo: Joi.string().pattern(/^[0-9+\-()\s]{6,20}$/),
  contactEmail: Joi.string().email(),
  description: Joi.string().allow('').max(2000),
  address: Joi.string().max(200),
  city: Joi.string().max(100),
  businessType: Joi.number().integer().min(1),    
  businessCategory: Joi.number().integer().min(1),
  businessPhase: Joi.string().max(100)
}).min(1);

const serviceObjectSchema = Joi.object({
  description: Joi.string().min(1).max(2000).required(),
  service_id: Joi.number().integer().min(1).optional(),
  input: Joi.boolean().optional()
});

// Client object schema  
const clientObjectSchema = Joi.object({
  description: Joi.string().min(1).max(2000).required(),
  client_id: Joi.number().integer().min(1).optional(),
  input: Joi.boolean().optional()
});

// POST /business/addservice  &  DELETE /business/removeservice  (req.body)
export const serviceOpSchema = Joi.object({
  services: Joi.array().items(
    Joi.alternatives().try(
      Joi.string().min(1).max(2000),        // For adding services (descriptions)
      Joi.number().integer().min(1),        // For removing services (IDs)
      Joi.object({                          // For object format
        description: Joi.string().min(1).max(2000).required()
      })
    )
  ).min(1).max(50).required()
});

// POST /business/addclient  &  DELETE /business/removeclient  (req.body)
export const clientsOpSchema = Joi.object({
  clients: Joi.array().items(
    Joi.alternatives().try(
      Joi.string().min(1).max(2000),        // For adding clients (descriptions)
      Joi.number().integer().min(1),        // For removing clients (IDs)
      Joi.object({                          // For object format
        description: Joi.string().min(1).max(2000).required()
      })
    )
  ).min(1).max(50).required()
});

// POST /business/addconnection  (req.body)
export const addConnectionSchema = Joi.object({
  initiatingBusinessId: intId.required(),
  receivingBusinessId: intId.required(),
  connectionTypeId: Joi.number().integer().positive().required()
}).custom((val, helpers) => {
  if (val.initiatingBusinessId === val.receivingBusinessId) {
    return helpers.error('any.invalid', 'Cannot connect to self');
  }
  return val;
}, 'self-connection check');

// DELETE /business/removeconnection  (req.body)
export const removeConnectionSchema = Joi.object({
  id: intId.required()
});

// POST /business/l2e  (req.body) 
export const l2eBodySchema = Joi.object().unknown(true).min(1);

// GET /business/:id  (req.params)
export const byIdParamsSchema = Joi.object({
  id: Joi.alternatives().try(intId, Joi.string().min(1)).required()
});

export const skillsOpSchema = Joi.object({
  skills: Joi.array().items(Joi.number().integer().positive()).min(1).required()
});

export const strengthsOpSchema = Joi.object({
  strengths: Joi.array().items(Joi.number().integer().positive()).min(1).required()
});
