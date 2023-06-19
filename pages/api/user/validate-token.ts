import { db } from 'database';
import { MUser } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { jwt } from 'utils';
import { TokenValidationError } from 'utils/errors';

type Response =
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

const validateToken = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { token = '' } = req.cookies;

  try {
    const userId = await jwt.isTokenValid(token);

    await db.connect();
    const user = await MUser.findById(userId);
    await db.disconnect();

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const { _id, name, email, role } = user;

    return res.status(200).json({
      token: jwt.signToken({ _id, email }),
      user: {
        name,
        email,
        role,
      },
    });
  } catch (error) {
    if (error instanceof TokenValidationError) {
      return res.status(401).json({
        message: error.message || 'Token is not valid',
      });
    }

    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  switch (req.method) {
    case 'GET':
      return validateToken(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
