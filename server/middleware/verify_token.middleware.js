import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const verifiedToken = (req, res, next) => {
  // verify if token is in
  const token = req.header('token');

  if (!token) {
    return res.status(401).send({
      status: 401,
      message: 'Please sign in first.',
    });
  }

  try {
    const verifieToken = jwt.verify(token, process.env.MY_SECRET, { expiresIn: '2d' }); // Verify provided user token if is still loged in
    req.user = {
      token: verifieToken,
    }; // Store user verifiedToken for later uses

    next(); // Let continue
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: 'Invalid token!',
    });
  }
};
