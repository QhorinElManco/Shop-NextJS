import { EnvironmentVariableNotDefinedError } from '@/utils/errors';

export const getEnvVariable = (variableName: string) => {
  if (!process.env[variableName]) {
    throw new EnvironmentVariableNotDefinedError(`${variableName} is not defined`);
  }
  return process.env[variableName];
};

export const getNextAuthSecret = () => getEnvVariable('NEXTAUTH_SECRET');
export const getGithubId = () => getEnvVariable('GITHUB_ID');
export const getGithubSecret = () => getEnvVariable('GITHUB_SECRET');
export const getMongoUrl = () => getEnvVariable('NEXT_MONGO_URL');

export const getPaypalClientId = () => getEnvVariable('NEXT_PUBLIC_PAYPAL_CL');
