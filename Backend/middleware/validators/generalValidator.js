import Joi from 'joi';

/**
 * Generic Empty Request Checker — Used for routes without any request body or query parameters.
 * .unknown(false) indicates that no extra fields are permitted.
 * If specific frontend interfaces may occasionally include irrelevant parameters, they can be individually modified to unknown(true).
 */

export const emptyQuery = Joi.object({}).unknown(false);
export const emptyBody = Joi.object({}).unknown(false);