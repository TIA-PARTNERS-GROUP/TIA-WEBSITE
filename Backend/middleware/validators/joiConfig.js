import Joi from 'joi';

export const JoiSchema = Joi;

// Create validators with consistent settings
export const createValidator = (schema) => {
    return async (payload) => {
        try {
            const value = await schema.validateAsync(payload, {
                abortEarly: false,  // collect all errors, not just the first one
                stripUnknown: true, // remove unknown keys
                convert: true       // allow type conversion
            });
            return { value };
        } catch (error) {
            return { error };
        }
    };
};