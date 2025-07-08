import 'dotenv/config';

const env = process.env;

const base = {
  host: env.DB_HOST,
  user: env.DB_USER, 
  password: env.DB_PASS,
  port: Number(env.DB_PORT),
};

const config = {
    development: {
        ...base,
        database: env.DB_NAME,
        multipleStatements: false,
    },
    test: {
        ...base,
        database: env.DB_NAME,
        multipleStatements: true,
    },
    production: {
        ...base,
        database: env.DB_NAME,
        multipleStatements: false,
    }
};

export default config;