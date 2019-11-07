import Joi from 'joi';

export const signupSchema = (req, res, next) => {
  const schema = {
    firstname: Joi.string()
      .strict()
      .trim()
      .min(3)
      .required(),
    lastname: Joi.string()
      .strict()
      .trim()
      .min(3)
      .required(),
    email: Joi.string()
      .strict()
      .trim()
      .min(3)
      .required()
      .email(),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
  };
  const response = Joi.validate(req.body, schema);
  if (response.error) {
    return res.status(400).send({
      status: 400,
      error: `${response.error.details[0].message}`,
    });
  }
  next();
};

export const signinSchema = (req, res, next) => {
  const schema = {
    email: Joi.string()
      .strict()
      .trim()
      .min(3)
      .required()
      .email(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
  };

  const response = Joi.validate(req.body, schema);
  if (response.error) {
    return res.status(400).send({
      status: 400,
      error: `${response.error.details[0].message}`,
    });
  }
  next();
};

export const diaryparamsschema = (req, res, next) => {
  const schema = {
    id: Joi.string().guid()
      .required(),
  };

  const response = Joi.validate(req.params, schema);
  if (response.error) {
    return res.status(400).send({
      status: 400,
      error: `${response.error.details[0].message}`,
    });
  }
  next();
};

export const diarySchema = (req, res, next) => {
  const schema = {
    title: Joi.string()
      .strict()
      .trim()
      .required(),
    description: Joi.string()
      .min(20)
      .strict()
      .trim()
      .required(),
  };

  const response = Joi.validate(req.body, schema);
  if (response.error) {
    return res.status(400).send({
      status: 400,
      error: `${response.error.details[0].message}`,
    });
  }
  next();
};

export const addDiarySchema = (req, res, next) => {
  const schema = {
    title: Joi.string()
      .strict()
      .trim()
      .required(),
    description: Joi.string()
      .min(20)
      .strict()
      .trim()
      .required(),
  };

  const response = Joi.validate(req.body, schema);
  if (response.error) {
    return res.status(400).send({
      status: 400,
      error: `${response.error.details[0].message}`,
    });
  }
  next();
};