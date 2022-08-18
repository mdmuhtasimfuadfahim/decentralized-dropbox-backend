const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MORALIS_DATABASE: Joi.string().description('moralis database'),
    MORALIS_SERVER_URL: Joi.string().description('moralis server url'),
    MORALIS_APP_ID: Joi.string().description('moralis application id'),
    MORALIS_MASTER_KEY: Joi.string().description('moralis master key'),
    MORALIS_SECRET: Joi.string().description('moralis secret'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  moralisDatabase: envVars.MORALIS_DATABASE,
  serverUrl: envVars.MORALIS_SERVER_URL,
  appId: envVars.MORALIS_APP_ID,
  masterKey: envVars.MORALIS_MASTER_KEY,
  moralisSecret: envVars.MORALIS_SECRET,
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};