import { config } from 'dotenv';
config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 3000,

  // PostgreSQL
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_POOL_MAX: Number(process.env.DB_POOL_MAX) || 10,
  DB_POOL_MIN: Number(process.env.DB_POOL_MIN) || 2,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  // Encryption
  BCRYPT_ROUNDS: Number(process.env.BCRYPT_ROUNDS) || 10,
};

export default env;