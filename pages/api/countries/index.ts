import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { MCountry } from '@/models';
import { ICountry } from '@/interfaces';

type Data =
  | {
      message: string;
    }
  | ICountry[];

const getCountries = async (_: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const countries = await MCountry.find().lean();
  await db.disconnect();

  return res.status(200).json(countries);
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getCountries(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
