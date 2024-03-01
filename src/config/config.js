const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MYSQL_USER_NAME: Joi.string().required().description('MySQL Username is required!'),
    MYSQL_HOST: Joi.string().required().description('MySQL Host name is required!'),
    MYSQL_PORT: Joi.number().required().description('MySQL Port is required!'),
    MYSQL_DATABASE: Joi.string().required().description('MySQL Database name is required!'),
    MYSQL_MAX_CONN_POOL: Joi.number().required().description('MySQL Maximum connection pool number is required!'),
    MYSQL_IDLE_TIMEOUT: Joi.number().required().description('MySQL Idle timeout is required!'),
    MYSQL_CONN_TIMEOUT: Joi.number().required().description('MySQL Connection timeout is required!'),
    JWT_SECRET: Joi.string().required().description('JWT secret is required')
    // Add more MySQL specific configuration if needed
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  secret: envVars.JWT_SECRET,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysql: {
    userName: process.env.MYSQL_USER_NAME,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    idleTimeOut: process.env.MYSQL_IDLE_TIMEOUT,
    connTimeOut: process.env.MYSQL_CONN_TIMEOUT,
    maxConn: process.env.MYSQL_MAX_CONN,
  },
  // Comment out or remove PostgreSQL specific configuration if no longer needed
  // jwt: { ... },
  // email: { ... },
};
