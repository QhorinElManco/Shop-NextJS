import bcrypt from 'bcryptjs';
import { db } from 'database';
import { MUser } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { validations } from 'utils';
// import { signToken } from 'utils/jwt';

type Response =
  | {
      message: string;
    }
  | {
      // token: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
    };

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { name = '', email = '', password = '' } = req.body;

  await db.connect();
  const user = await MUser.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({
      message: 'The email address is already in use. Please proceed with another email address.',
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long.',
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: 'Name must be at least 2 characters long.',
    });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: 'Email address is not valid.',
    });
  }

  const newUser = new MUser({
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'user',
  });

  try {
    await newUser.save({
      validateBeforeSave: true,
    });

    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({
      message: "Couldn't create user. Please try again later.",
    });
  }

  return res.status(200).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
