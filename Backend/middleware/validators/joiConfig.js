import Joi from 'joi';

export const JoiSchema = Joi;

// Create validators with consistent settings
export const createValidator = (schema) => {
    return async (payload) => {
        try {
            const value = await schema.validateAsync(payload, {
                abortEarly: false,  // collect all errors
                stripUnknown: true, // remove unknown keys
                convert: true       // allow type conversion
            });
            return { value };
        } catch (error) { return { error }; }
    };
};

// Express middleware wrapper
export const validator = (schema, where = 'body') => {
    return async (req, res, next) => {
      const target =
        where === 'query' ? req.query :  //The where parameter determines the validation object.
        where === 'params' ? req.params :
        req.body;
  
      try {
        const value = await schema.validateAsync(target, {
          abortEarly: false,
          stripUnknown: true,
          convert: true
        });
        if (where === 'body') req.body = value;  // Write the validated value back to req
        if (where === 'query') Object.assign(req.query, value);
        if (where === 'params') req.params = value;
        next(); // Verification passed; proceed with execution.
      } catch (error) {
        // Verification failed; return a standardised error response
        return res.status(400).json({
          error: 'VALIDATION_FAILED',
          details: Array.isArray(error.details)
            ? error.details.map(e => ({
                path: e.path.join('.'),
                message: e.message
              }))
            : [{ message: error.message }]
        });
      }
    };
  };