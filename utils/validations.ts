const EXP_REGULAR_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = (email: string): boolean => {
  const match = !!email.toLowerCase().match(EXP_REGULAR_EMAIL);
  return !!match;
};

export const isEmail = (email: string): string | undefined =>
  isValidEmail(email) ? undefined : 'Invalid email address';
