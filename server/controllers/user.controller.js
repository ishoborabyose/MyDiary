import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import uuid from "uuid";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
export const signup = async (req, res) => {
  let { firstname, lastname, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const id = uuid.v1();
  const hashedPassword = await bcrypt.hash(password, salt);
  const text = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await pool.query(text, [email]);
      if (rows.length!==0) {
        return res.status(401).send({'message': `${email} Already taken `});
      }

  const createQuery = `INSERT INTO users (id, firstname, lastname, email, password)
  VALUES($1, $2, $3, $4, $5) returning * `;

  const values = [
    id,
    firstname,
    lastname,
    email,
    hashedPassword
  ];

  try {
    
    const { rows } = await pool.query(createQuery, values);
    const token = jwt.sign({ id: uuid.v1(), }, process.env.MY_SECRET, {
      expiresIn: "2d"
    });
    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: {
        token
      },
      userDetails: {
        id: rows[0].id,
        firstname: rows[0].firstname,
        lastname: rows[0].lastname,
        email: rows[0].email
      }
    });
    
  } catch (error) {
   
    return res.status(500).send({status: 500 , error: error.message})
  }
 
};


export const signin = (req, res) => {
//   if (!req.body.email || !req.body.password)
//     return res.status(400).send({
//       status: 400,
//       error: "please check your credentials"
//     });

//   const newUser = User.find(c => c.email == req.body.email);

//   if (!newUser)
//     return res.status(400).send({
//       status: 400,
//       error: "User with provided email or password do not exist!"
//     });

//   const token = jwt.sign({ email: newUser.email }, process.env.MY_SECRET, {
//     expiresIn: "2d"
//   });

//   const id = uuid.v1();
//   if (newUser.password == req.body.password) {
//     const { firstname, lastname, email } = newUser;
//     return res.status(201).send({
//       status: 201,
//       message: "successfully log in",
//       data: {
//         token
//       },
//       userDetails: {
//         id,
//         firstname,
//         lastname,
//         email
//       }
//     });
//   }
 };
