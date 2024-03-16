import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { MProduct } from '@/models';

type Data =
  | {
      message: string;
    }
  | IProduct;

/**
 * Obtiene un producto por el SLUG
 */
const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const { slug } = req.query;
  const product = await MProduct.findOne({ slug: String(slug) }).lean();
  await db.disconnect();

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
