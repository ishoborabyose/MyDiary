import Joi from "joi";

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
    password: Joi.string()
      .strict()
      .trim()
      .min(6)
      .required()
  };
  const response = Joi.validate(req.body, schema);
  if (response.error) {
    return res.status(400).send({
      status: 400,
      error: `${(response.error.details[0].message)}`
    });
  }
  next();
};

export const signinSchema = (req, res, next) =>{
  const schema= {
    email: Joi.string()
    .strict()
    .trim()
    .min(3)
    .required()
    .email(),
  password: Joi.string()
    .strict()
    .trim()
    .min(6)
    .required()
  } 

  const response = Joi.validate(req.body, schema);
  if (response.error) {
    return res.status(400).send({
      status: 400,
      error: `${(response.error.details[0].message)}`
    });
  }
  next();
};


export const diarySchema = (req, res, next) =>{
  const schema ={
    id: Joi.number()
    .min(1)
    .required(),
  title: Joi.string()
    .strict()
    .trim()
    .required(),
  description: Joi.string()
    .strict()
    .trim()
    .required()
  } 

  const response = Joi.validate(req.body, schema);
  if (response.error) {
    return res.status(400).send({
      status: 400,
      error: `${(response.error.details[0].message)}`
    });
  }
  next();
};



export const addDiarySchema = (req, res, next) =>{
  const schema = {
    title: Joi.string()
    .strict()
    .trim()
    .required(),
  description: Joi.string()
    .strict()
    .trim()
    .required()
  } 

  const response = Joi.validate(req.body, schema);
  if (response.error) {
    return res.status(400).send({
      status: 400,
      error: `${(response.error.details[0].message)}`
    });
  }
  next();
};

