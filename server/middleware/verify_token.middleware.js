import dotenv from 'dotenv';
import { getId } from "../helpers/userdata";
import { Pool } from "pg";


dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  } );
 export const verifiedToken = async (req, res, next) => {
    // verify if token is in 
    const token = req.header('token');
  if (!token) {
    return res.status(401).send({
      status: 401,
      message: 'Please sign in first.',
    });
  }
     try
     {
         const userId = getId( req.header( 'token' ) );
         
         const text = 'SELECT * FROM users WHERE id = $1';
         
         const { rows } = await pool.query( text, [ userId ] );
         if ( !rows )
         {
        return res.status(400).send({ 'message': 'user not found' });
         }

         next(); // Let continue
         
    } catch (error) {
        res.status(400).send({
            'status': 400,
            'message': 'Invalid token!'
        });
    }
}

