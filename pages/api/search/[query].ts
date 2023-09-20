import { db } from 'database';
import { IProduct } from 'interfaces';
import { MProduct } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      message: string;
    }
  | IProduct[];

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let { query = '' } = req.query;

  if (query.length === 0) {
    return res.status(400).json({ message: 'No query provided' });
  }

  query = query.toString().toLowerCase();

  await db.connect();
  const products = await MProduct.find({ $text: { $search: query } })
    .select('title images price inStock slug -_id')
    .lean();

  if (!products) {
    return res.status(404).json({ message: 'No products found' });
  }

  return res.status(200).json(products);
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
