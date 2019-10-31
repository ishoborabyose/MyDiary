import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import uuid from "uuid";

dotenv.config();
export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    //bad request
    return res.status(400).json({
      status: 400,
      error: "Email and password are required"
    });
  }
  const emailTaken = User.find((newUser) => newUser.email === req.body.email);
  if (emailTaken){
    return res.status(409).send({
      status: 409,
      error: `${req.body.email} Already taken`
    })
  }
  const salt = await bcrypt.genSalt(10);
  const id = uuid.v1();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = {
    id: id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    hashedPassword
  };

  User.push(newUser);


  const token = jwt.sign({ email: newUser.email }, process.env.MY_SECRET, {
    expiresIn: "2d"
  });
  const { firstname, lastname, email } = newUser;
  return res.status(201).json({
    status: 201,
    message: "User created successfully",
    data: {
      token
    },
    userDetails: {
      id,
      firstname,
      lastname,
      email
    }
  });
};

export const signin = (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({
      status: 400,
      error: "please check your credentials"
    });

  const newUser = User.find(c => c.email == req.body.email);

  if (!newUser)
    return res.status(400).send({
      status: 400,
      error: "User with provided email or password do not exist!"
    });

  const token = jwt.sign({ email: newUser.email }, process.env.MY_SECRET, {
    expiresIn: "2d"
  });

  const id = uuid.v1();
  if (newUser.password == req.body.password) {
    const { firstname, lastname, email } = newUser;
    return res.status(201).send({
      status: 201,
      message: "successfully log in",
      data: {
        token
      },
      userDetails: {
        id,
        firstname,
        lastname,
        email
      }
    });
  }
};
