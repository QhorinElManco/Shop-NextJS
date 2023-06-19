/* eslint-disable max-classes-per-file */
export class TokenValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenValidationError';
  }
}

export class EnvironmentVariableNotDefinedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvironmentVariableNotDefinedError';
  }
}

export class RequestNotControllerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RequestNotControllerError';
  }
}
