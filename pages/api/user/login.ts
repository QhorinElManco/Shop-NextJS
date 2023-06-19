import bcrypt from 'bcryptjs';
import { db } from 'database';
import { MUser } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { jwt } from 'utils';

export type ResponseLogin =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
    };

const loginUsers = async (req: NextApiRequest, res: NextApiResponse<ResponseLogin>) => {
  const { email = '', password = '' } = req.body as { email: string; password: string };

  await db.connect();
  const user = await MUser.findOne({ email });
  await db.disconnect();

  if (!user) {
    return res.status(401).json({
      message: 'Login failed. Check your credentials.',
    });
  }

  if (bcrypt.compareSync(password, user.password!) === false) {
    return res.status(401).json({
      message: 'Login failed. Check your credentials.',
    });
  }

  const { _id, name, role } = user;

  return res.status(200).json({
    token: jwt.signToken({ _id, email }),
    user: {
      name,
      email,
      role,
    },
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseLogin>) {
  switch (req.method) {
    case 'POST':
      return loginUsers(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
