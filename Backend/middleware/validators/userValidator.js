import Joi from 'joi';


const id = Joi.number().integer().min(1);
const email = Joi.string().email({ tlds: { allow: false } }).max(254);



export const checkExistsParams = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).max(254).required()
  });

export const emailParams = checkExistsParams;


export const userIdParams = Joi.object({
  id: id.required()
});

// /users/addpost Body
export const addPostBody = Joi.object({
  title: Joi.string().trim().min(1).max(200).required(),
  date: Joi.date().iso().required(),
  content: Joi.string().trim().min(1).max(10000).required(),
  status: Joi.string().valid('published', 'draft').required()
}).unknown(false);

// /users/publishpost Body
export const publishPostBody = Joi.object({
  id: id.required()
}).unknown(false);

// /users/removepost Body
export const removePostBody = Joi.object({
  id: id.required()
}).unknown(false);

// /users/addtestimonial Body
export const addTestimonialBody = Joi.object({
  title: Joi.string().trim().min(1).max(200).required(),
  date: Joi.date().iso().required(),
  content: Joi.string().trim().min(1).max(10000).required(),
  status: Joi.string().valid('published', 'draft').required()
}).unknown(false);

// /users/publishtestimonial Body
export const publishTestimonialBody = Joi.object({
  id: id.required()
}).unknown(false);

// /users/removetestimonial Body
export const removeTestimonialBody = Joi.object({
  id: id.required()
}).unknown(false);

// /users/addcasestudy Body
export const addCaseStudyBody = Joi.object({
  title: Joi.string().trim().min(1).max(200).required(),
  date: Joi.date().iso().required(),
  content: Joi.string().trim().min(1).max(20000).required(),
  status: Joi.string().valid('published', 'draft').required()
}).unknown(false);

// /users/publishcasestudy Body
export const publishCaseStudyBody = Joi.object({
  id: id.required()
}).unknown(false);

// /users/removecasestudy Body
export const removeCaseStudyBody = Joi.object({
  id: id.required()
}).unknown(false);

// /users/config POST Body
export const dashboardConfigBody = Joi.object({
  config: Joi.object().unknown(true).required()
}).unknown(false);