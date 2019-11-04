import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on("connect", () => {
  console.log("connected to the db");
});

const createTables = pool.query(` 
CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS  entries(
    id UUID PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    userId INTEGER ,
    createdOn VARCHAR NOT NULL
);
 `);
