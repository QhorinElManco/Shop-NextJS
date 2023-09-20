import bcrypt from 'bcryptjs';
import { db } from 'database';
import { MUser } from '../models';

export const getUserByEmail = async (email: string) => {
  await db.connect();
  const user = await MUser.findOne({ email });
  await db.disconnect();
  return user;
};
export const checkUserEmailAndPassword = async (email: string, password: string) => {
  await db.connect();
  const user = await MUser.findOne({ email });
  await db.disconnect();

  if (!user || !bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { _id, name, role } = user;

  return { id: _id, name, email, role };
};

export const oAuthToDatabase = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await MUser.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, email, role } = user;
    return { _id, name, email, role };
  }

  const newUser = new MUser({
    name: oAuthName,
    email: oAuthEmail,
    password: process.env.JWT_SECRET,
    role: 'user',
  });
  await newUser.save();
  await db.disconnect();

  const { _id, name, email, role } = newUser;
  return { _id, name, email, role };
};
