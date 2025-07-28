import env from './config.js'

const validEnvs = ['development', 'test', 'production'];
const currentEnv = process.env.NODE_ENV || 'development';

if (!validEnvs.includes(currentEnv)) {
  throw new Error(`Invalid NODE_ENV '${currentEnv}' — must be one of: ${validEnvs.join(', ')}`);
}
let config = env;
config.db = env.db[currentEnv];
config.env = currentEnv;

console.log(`ENV:\n${JSON.stringify(config, null, 2)}`);

export default config;