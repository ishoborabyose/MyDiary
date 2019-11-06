import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const getEmail = (token) => {
  const userEmail = jwt.verify(token, process.env.MY_SECRET);
  return userEmail.email;
};
