import Joi from '@hapi/joi';

const signupSchema = Joi.object({
    firstName: Joi.string().strict().trim().min(3).required(),
    lastName: Joi.string().strict().trim().min(3).required(),
    email:  Joi.string().strict().trim().min(3).required().email(),
    password:  Joi.string().strict().trim().min(6).required(),
});

const signinSchema = Joi.object({
    email: Joi.string().strict().trim().min(3).required().email(),
    password:  Joi.string().strict().trim().min(6).required()
});

const diarySchema = Joi.object({
    id: Joi.number().min(1).required(),
    title: Joi.string().strict().trim().required(),
    description: Joi.string().strict().trim().required()
});

const editDiarySchema = Joi.object({
    title: Joi.string().strict().trim().required(),
    description: Joi.string().strict().trim().required()
});

const Schemas = {
    '/auth/signup': signupSchema,
    '/auth/signin': signinSchema,
    '/entries': diarySchema,
    '/entries/:id': editDiarySchema,
};

export const validate = (req, res, next) => {
    // enabled HTTP methods for request data validation
    const _supportedMethods = ['post', 'put', 'patch'];
    // eg: /signup
    const route = req.route.path;
    // eg: put
    const method = req.method.toLowerCase();
    // check into an array if there is router user used eg: put 
    if (_supportedMethods.includes(method) && Schemas[route] != undefined) {
        // get schema for the current route
        const schema = Schemas[route];
        // Validate req.body using the schema and validation options

        try {
            schema.validate(req.body);
            next();
        } catch (error) {
            return res.status(400).send({ 'status': 404, 'error': error });
        }
    }
};