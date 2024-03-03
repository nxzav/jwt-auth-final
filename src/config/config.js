import dotenv from 'dotenv';

dotenv.config();

export default {
  jwtSecret: process.env.JWT_SECRET,
  dbName: process.env.DB_NAME,
  dbURI: process.env.DB_URI,
};
