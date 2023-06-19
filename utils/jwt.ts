import jwt from 'jsonwebtoken';
import { EnvironmentVariableNotDefinedError, TokenValidationError } from './errors';

export const signToken = (user: { _id: string; email: string }) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('JWT_SECRET_SEED is not defined');
  }

  return jwt.sign(
    // payload
    {
      ...user,
    },
    // secret
    process.env.JWT_SECRET_SEED,
    // options
    {
      expiresIn: '30d',
    }
  );
};

export const isTokenValid = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new EnvironmentVariableNotDefinedError('JWT_SECRET_SEED is not defined');
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) {
          return reject(new TokenValidationError("Token isn't valid"));
        }

        const { _id } = payload as { _id: string };

        return resolve(_id);
      });
    } catch (error) {
      reject(new TokenValidationError("Token isn't valid"));
    }
  });
};
