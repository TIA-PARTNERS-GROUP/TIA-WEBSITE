import 'dotenv/config';
import process from 'process';

const required = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
};

const valEnv = {
  NODE_ENV: required('NODE_ENV') || 'development', // Default to development (for testing purposes)
  PORT: parseInt(required('PORT'), 10),
  FRONTEND_BASE_URL: required('FRONTEND_BASE_URL'),
  DB_HOST: required('DB_HOST'),
  DB_USER: required('DB_USER'),
  DB_PASS: required('DB_PASS'),
  DB_PORT: parseInt(required('DB_PORT'), 10),
  DB_NAME: required('DB_NAME'),
  MIDDLEWARE: process.env.MIDDLEWARE === 'True',
};

const env = {
  FRONTEND_BASE_URL: valEnv.FRONTEND_BASE_URL,
  PORT: valEnv.PORT,
  MIDDLEWARE: valEnv.MIDDLEWARE,
  db: {
    development: {
      host: valEnv.DB_HOST,
      username: valEnv.DB_USER,
      password: valEnv.DB_PASS,
      database: valEnv.DB_NAME,
      database_port: valEnv.DB_PORT,
      multipleStatements: false,
    },
    test: {
      frontendBaseUrl: valEnv.FRONTEND_BASE_URL,
      host: valEnv.DB_HOST,
      username: valEnv.DB_USER,
      password: valEnv.DB_PASS,
      database: valEnv.DB_NAME,
      database_port: valEnv.DB_PORT,
      multipleStatements: true,
    },
    production: {
      frontendBaseUrl: valEnv.FRONTEND_BASE_URL,
      host: valEnv.DB_HOST,
      username: valEnv.DB_USER,
      password: valEnv.DB_PASS,
      database: valEnv.DB_NAME,
      database_port: valEnv.DB_PORT,
      multipleStatements: false,
    }
  }
};

export default env;
