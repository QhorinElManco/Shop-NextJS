import { db } from 'database';
import { MProduct } from 'models';

export const getProductsBySlug = async (slug: string) => {
  await db.connect();

  const product = await MProduct.findOne({ slug }).lean();

  await db.disconnect();

  if (!product) {
    return null;
  }

  return JSON.parse(JSON.stringify(product));
};
