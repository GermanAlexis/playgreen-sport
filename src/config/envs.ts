import 'dotenv/config';
import * as joi from 'joi';

interface Envs {
  PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation ${error.message}`);
}

const envVars: Envs = value;

export const envs = {
  ports: envVars.PORT,
};
