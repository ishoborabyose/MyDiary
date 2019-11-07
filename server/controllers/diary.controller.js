
import uuid from "uuid";
import moment from "moment";
import { getId } from "../helpers/userdata";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
} );
const id = uuid.v1();
const createdon = moment().format( "llll" );
      
export const createEntry = async ( req, res ) =>
{
  const userId = getId( req.header( 'token' ) );
  const { title, description, } = req.body;
  const createQuery = `INSERT INTO entries (id, title, description, userid, createdon)
  VALUES($1, $2, $3, $4, $5) returning * `;

  const values = [
    id,
    title,
    description,
    userId,
    createdon
  ];

  try {
    
    const { rows } = await pool.query( createQuery, values );
    return res.status(201).json({
      status: 201,
      message: "Entry created successfully",
      data: {
        id: rows[0].id,
        title: rows[0].title,
        description: rows[0].description,
        userId: rows[0].userid,
        createdon: rows[0].createdon
      },
    
    });
    
  } catch (error) {
   
    return res.status(400).send({status: 400 , error: error.message})
  }
};

export const getAllDiaries = async (req, res) =>
{
  const userId = getId( req.header( 'token' ) );
  const getAllQuery = 'SELECT * FROM entries WHERE userid = $1';
    try {
      const { rows } = await pool.query(getAllQuery, [userId]);
      return res.status( 200 ).json( {
        status: 200,
        message:"successful retrieved",
        data: rows
      } );
    } catch(error) {
      return res.status(400).send(error);
    }
}








