const EXP_REGULAR_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = (email: string): boolean =>
  !!email.toLowerCase().match(EXP_REGULAR_EMAIL);

export const isEmail = (email: string): string | undefined =>
  isValidEmail(email) ? undefined : 'Invalid email address';
