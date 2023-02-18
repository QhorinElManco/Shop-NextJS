import { db } from 'database';
import { IProduct } from 'interfaces';
import { MProduct } from 'models';

export const getProductsBySlug = async (slug: string): Promise<IProduct | null> => {
  await db.connect();

  const product = await MProduct.findOne({ slug }).lean();

  await db.disconnect();

  if (!product) {
    return null;
  }

  return JSON.parse(JSON.stringify(product));
};

interface IProductSlug {
  slug: string;
}

export const getAllProductSlugs = async (): Promise<IProductSlug[]> => {
  await db.connect();
  const slugs = await MProduct.find().select('slug -_id').lean();
  await db.disconnect();
  return slugs;
};
