import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool.on('connect', () => {
  process.stdout.write('connected to the db');
});

export const createTables = pool.query(` 
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

DROP TABLE IF EXISTS entries CASCADE;
CREATE TABLE IF NOT EXISTS  entries(
    id UUID PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    userId VARCHAR NOT NULL,
    createdOn VARCHAR NOT NULL
);
 `);
