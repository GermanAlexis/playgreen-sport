import 'dotenv/config';
import * as joi from 'joi';

interface Envs {
  PORT: number;
  JWT_SECRET: string;
  HOST_DATABASE: string;
  PORT_DATABASE: number;
  USER_DATABASE: string;
  PASS_DATABASE: string;
  NAME_DATABASE: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    HOST_DATABASE: joi.string().required(),
    PORT_DATABASE: joi.number().required(),
    USER_DATABASE: joi.string().required(),
    PASS_DATABASE: joi.string().required(),
    NAME_DATABASE: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation ${error.message}`);
}

const envVars: Envs = value;

export const envs = {
  ports: envVars.PORT,
  host: envVars.HOST_DATABASE,
  portDatabase: envVars.PORT_DATABASE,
  userDataBase: envVars.USER_DATABASE,
  passDataBase: envVars.PASS_DATABASE,
  nameDatabase: envVars.NAME_DATABASE,
  jwtSecret: envVars.JWT_SECRET,
};
