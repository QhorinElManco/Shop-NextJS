function createCustomError(name: string) {
  return class extends Error {
    constructor(message?: string) {
      super(message);
      this.name = name;
    }
  };
}

export const TokenValidationError = createCustomError('TokenValidationError');
export const EnvironmentVariableNotDefinedError = createCustomError(
  'EnvironmentVariableNotDefinedError'
);
export const RequestNotControllerError = createCustomError('RequestNotControllerError');
export const InvalidShippingAddress = createCustomError('InvalidShippingAddress');
export const ProductDoesNotExist = createCustomError('ProductDoesNotExist');
export const TotalDoesNotMatch = createCustomError('TotalDoesNotMatch');
