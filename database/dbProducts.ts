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

export const getProductsBySearch = async (query: string): Promise<IProduct[]> => {
  const term = query.toString().toLowerCase().trim();

  await db.connect();
  const products = await MProduct.find({ $text: { $search: term } })
    .select('title images price inStock slug -_id')
    .lean();
  await db.disconnect();

  return products;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();
  const products = await MProduct.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(products));
};
