import { Config } from './config';

require('dotenv').config();

export function prepareConfig(): Config {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set');
  }

  return { jwtSecret };
}
