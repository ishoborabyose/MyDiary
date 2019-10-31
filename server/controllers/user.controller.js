import { User } from "../models/user.model";
import { users } from "../db/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    //bad request
    return res.status(400).json({
      status: 400,
      error: "Email and password are required"
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User(
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.password,
    hashedPassword
  );

  users.push(user);

  const token = jwt.sign({ email: user.email }, process.env.MY_SECRET, {
    expiresIn: "2d"
  });

  return res.status(201).json({
    status: 201,
    message: "User created successfully",
    data: {
      token
    }
  });
};

export const signin = (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({
      status: res.statusCode,
      error: "please check your credentials"
    });

  const user = users.find(c => c.email == req.body.email);

  if (!user)
    return res
      .status(400)
      .send("User with provided email or password do not exist!");

  const token = jwt.sign({ email: user.email }, process.env.MY_SECRET, {
    expiresIn: "2d"
  });

  if (user.password == req.body.password) {
    return res.status(201).send({
      status: 201,
      message: "successfully log in",
      data: {
        token
      }
    });
  } else {
    return res.status(400).send("Password not match!");
  }
};
