export interface IUser {
  readonly _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}
