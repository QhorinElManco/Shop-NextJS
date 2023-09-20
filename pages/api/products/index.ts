import { db, SHOP_CONSTANTS } from 'database';
import { IProduct } from 'interfaces';
import { MProduct } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      message: string;
    }
  | IProduct[];

/** Función para obtener todos los productos */
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = 'all' } = req.query;

  let condition = {};

  if (gender !== 'all' && SHOP_CONSTANTS.VALID_GENDERS.includes(`${gender}`)) {
    condition = { gender };
  }

  await db.connect();
  const products = await MProduct.find(condition)
    .select('title images price inStock slug -_id')
    .lean();
  await db.disconnect();

  return res.status(200).json(products);
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
